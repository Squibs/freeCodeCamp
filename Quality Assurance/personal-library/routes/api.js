/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose');

// mongo configuration
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(`mongoose readyState: ${mongoose.connection.readyState}`);

const bookSchema = new mongoose.Schema({
  title: { type: String, requried: true },
});

const commentSchema = new mongoose.Schema({
  comment: { type: String, requried: true },
  book_id: { type: String, requried: true },
});

const Book = mongoose.model('Book', bookSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = function (app) {

  app.route('/api/books')
    
    //response will be array of book objects
    //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    .get(function (req, res){
      Comment.find({}, (err, foundComments) => {
        if (err) return res.json({ error: err });

        Book.find({}, (err, foundBooks) => {
          if (err) return res.json({ error: err });

          // convert array of mongoose objects to array of normal js objects
          // .toObject() or .toJSON() doesn't work here because it is an array, instead of a single object
          const booksWithComments = JSON.parse(JSON.stringify(foundBooks));
          const comments = JSON.parse(JSON.stringify(foundComments));

          booksWithComments.forEach((book) => {
            book.comments = []; // add array of comments to each book
            comments.forEach((comment) => {
              if (comment.book_id === book._id) {
                book.comments.push(comment.comment);
              }
            });
            book.commentcount = book.comments.length;
          });

          return res.json(booksWithComments);
        });
      });
    })

    
    //response will contain new book object including atleast _id and title
    .post(function (req, res){
      if (!req.body.title) return res.send('missing required field title');

      Book.create({ title: req.body.title }, (err, createdBook) => {
        if (err) return res.json({ error: err });
        return res.json(createdBook);
      });
    })

    
    //if successful response will be 'complete delete successful'
    .delete(function(req, res){
      Book.deleteMany({}, (err) => {
        if (err) return res.json({ error: err });

        Comment.deleteMany({}, (err) => {
          if (err) return res.json({ error: err });
          return res.send('complete delete successful');
        });
      });
    });



  
  app.route('/api/books/:id')
    //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    .get(function (req, res){
      Comment.find({ book_id: req.params.id }, (err, foundComments) => {
        if (err) return res.json({ error: err });
        
        Book.findById(req.params.id, (err, foundBook) => {
          if (err || !foundBook) return res.send('no book exists');

          // convert array of mongoose objects to array of normal js objects
          // .toObject() or .toJSON() doesn't work here because it is an array, instead of a single object
          const bookWithComments = JSON.parse(JSON.stringify(foundBook));
          const comments = JSON.parse(JSON.stringify(foundComments));
          bookWithComments.comments = [];
          
          comments.forEach((comment) => {
            bookWithComments.comments.push(comment.comment);
          });

          bookWithComments.commentcount = comments.length;

          return res.json(bookWithComments);
        })
      });
    })

    
    //json res format same as .get
    .post(function(req, res){
      if (!req.body.comment) return res.send('missing required field comment');
      if (!req.params.id) return res.send('missing required field BookId');

      Book.findById(req.params.id, (err, foundBook) => {
        if (err || !foundBook) return res.send('no book exists');

        Comment.create({ comment: req.body.comment, book_id: req.params.id }, (err, createdComment) => {
          if (err) return res.json({ error: err });

          Comment.find({ book_id: req.params.id }, (err, foundComments) => {
            if (err) return res.json({ error: err });

            // convert array of mongoose objects to array of normal js objects
            // .toObject() or .toJSON() doesn't work here because it is an array, instead of a single object
            const bookWithComments = JSON.parse(JSON.stringify(foundBook));
            const comments = JSON.parse(JSON.stringify(foundComments));
            bookWithComments.comments = [];

            comments.forEach((comment) => {
              bookWithComments.comments.push(comment.comment);
            });

            bookWithComments.commentcount = comments.length;

            return res.json(bookWithComments);
          });
        });
      });
    })

    
    //if successful response will be 'delete successful'
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
        if (err || !deletedBook) return res.send('no book exists');
        Comment.deleteMany({ book_id: req.params.id }, (err, deletedComments) => {
          if (err) return res.json({ error: err });
          return res.send('delete successful');
        });
      });
    });
  
};
