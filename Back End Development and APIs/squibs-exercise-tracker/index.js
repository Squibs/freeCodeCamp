require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// mongo configuration
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(`mongoose readyState: ${mongoose.connection.readyState}`);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

const exerciseSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  date: Date,
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

// express config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// express routes
app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/views/index.html')
});

// req.query -> from url ?query=value
// req.params -> from url mysite/:param/place
// req.body -> from form submission

// get list of all users
app.get('/api/users', (req, res) => {
  // could add limit here, maybe limit newest n amount of users
  User.find((err, data) => {
    if (err) return res.json({ error: err });
    return res.json(data);
  });
});

// create new users
app.post('/api/users', (req, res) => {
  User.findOne({ username: req.body.username}, (err, foundUserData) => {
    if (err) return res.json({ error: err });
    // if username exists
    if (foundUserData && foundUserData.username === req.body.username) {
      return res.json({ msg: 'Username already exists, displaying user information', username: foundUserData.username, _id: foundUserData._id });
    } else {
      User.create({ username: req.body.username }, (err, createdUserData) => {
        if (err) return res.json({ error: err });
        return res.json({ username: createdUserData.username, _id: createdUserData._id });
      });
    }
  });
});

// post new exercise for user
app.post('/api/users/:_id/exercises', (req, res) => {
  // required fields
  if (!req.params._id) return res.json({ error: 'please enter an id' });
  if (!req.body.description) return res.json({ error: 'description field required' });
  if (!req.body.duration) return res.json({ error: 'duration is required' });

  // test if duration is just numbers & convert from string to number
  if (!/^[0-9]+$/.test(req.body.duration)) return res.json({ error: 'duration must be a number' });
  const convertedDuration = Number(req.body.duration);

  // test if date is in YYYY-MM-DD format
  if (req.body.date && !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(req.body.date)) {
    return res.json({ error: 'date not in correct format' });
  }

  // test if id field is a valid id
  let submitedIdAsObject;
  try {
    submitedIdAsObject = mongoose.Types.ObjectId(req.params._id);
  } catch (e) {
    return res.json({ error: 'entered id is not valid' })
  }

  // submit exercise for existing user
  User.findOne({_id: submitedIdAsObject}, (err, foundUser) => {
    if (err) return res.json({ error: err });
    // user exists, create an exercise
    if (foundUser && foundUser._id.toString() === submitedIdAsObject.toString()) {
      Exercise.create({
        user_id: foundUser._id,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        duration: req.body.duration,
        description: req.body.description,
      }, (err, submittedExercise) => {
        // display created exercise
        return res.json({
          _id: foundUser._id.toString(),
          username: foundUser.username,
          date: (new Date(submittedExercise.date)).toDateString(),
          duration: submittedExercise.duration,
          description: submittedExercise.description,
        });
      });
    } else {
      // valid id has no match for a user
      return res.json({ error: 'no user found with this id' });
    }
  });
});

// get user log
app.get('/api/users/:id/logs', (req, res) => {
  let queryLimit = 0;
  let dateQuery = {};

  // test for valid limit query (only numbers)
  if (req.query.limit) {
    if (!/^[0-9]+$/.test(req.query.limit)) {
      return res.json({ error: 'invalid limit query, please enter a number' });
    } else {
      queryLimit = req.query.limit;
    }
  }

  // test if 'from' and 'to' queries in format YYYY-MM-DD
  const dateFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
  if (req.query.from) {
    if (dateFormat.test(req.query.from)) {
      dateQuery['$gte'] = new Date(req.query.from);
    } else { return res.json({ error: 'invalid date format on FROM query' }); }
  }
  if (req.query.to) {
    if (dateFormat.test(req.query.to)) {
      dateQuery['$lte'] = new Date(req.query.to);
    } else { return res.json({ error: 'invalid date format on TO query' }); }
  }
  
  // test if id param is a valid id
  let objectIdParam;
  try {
    objectIdParam = mongoose.Types.ObjectId(req.params.id);
  } catch (e) {
    return res.json({ error: 'entered id is not valid' })
  }

  // finder user
  User.findById(objectIdParam, (err, foundUser) => {
    if (err) return res.json({ error: err });
    // if user exists retrieve log of exercises for user
    if (foundUser && foundUser._id.toString() === objectIdParam.toString()) {
      // default search filter, just the user id
      const searchFilter = { user_id: foundUser.id };

      // if there was a 'from' or 'to' query add to search filter
      if (req.query.from || req.query.to) searchFilter.date = dateQuery;
      // { date: { $lte: dateObj, $gte: dateObj } }
      
      Exercise.find(searchFilter)
        .limit(req.query.limit)
        .select('description duration date')
        .exec((err, foundExercises) => {
          if (err) return res.json({ error: err });
          res.json({
            _id: foundUser.id,
            username: foundUser.username,
            count: foundExercises.length,
            log: foundExercises.map((exercise) => ({
              description: exercise.description,
              duration: exercise.duration,
              date: exercise.date.toDateString()
            })),
          });
        });
    } else {
      // valid id but no match for a user
      return res.json({ error: 'no user found with this id' });
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

// ---------------------------------------------------------------------- //

// Exercise Example:
// {
//   username: "fcc_test",
//   description: "test",
//   duration: 60,
//   date: "Mon Jan 01 1990",
//   _id: "5fb5853f734231456ccb3b05"
// }

// User Example:
// {
//   username: "fcc_test",
//   _id: "5fb5853f734231456ccb3b05"
// }

// Log Example:
// {
//   username: "fcc_test",
//   count: 1,
//   _id: "5fb5853f734231456ccb3b05",
//   log: [{
//     description: "test",
//     duration: 60,
//     date: "Mon Jan 01 1990",
//   }]
// }
