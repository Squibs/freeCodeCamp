'use strict';
const mongoose = require('mongoose');

// mongo configuration
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(`mongoose readyState: ${mongoose.connection.readyState}`);

const issueSchema = new mongoose.Schema({
  assigned_to: { default: '', type: String },
  status_text: { default: '', type: String },
  open: { default: true, type: Boolean },
  issue_title: { required: true, type: String },
  issue_text: { required: true, type: String },
  created_by: { required: true, type: String },
  created_on: { default: new Date(), type: Date },
  updated_on: { default: new Date(), type: Date },
  project_name: String,
});

const Issue = mongoose.model('Issue', issueSchema);

// handle routes
module.exports = function (app) {

  // req.query  -> from url ?query=value
  // req.params -> from url mysite/:param/place
  // req.body   -> from form submission

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let searchFilter = {};

      // for each query key value pair store it in searchFilter as key value pairs
      Object.keys(req.query).forEach((key) => {
        if (req.query[key]) searchFilter[key] = req.query[key];
      });

      // set the project name as a key value pair in searchFilter
      searchFilter.project_name = req.params.project;

      // get issues by project name and any additional parameters
      Issue.find(searchFilter, (err, foundIssues) => {
        if (err) return res.json({ error: err });
        if (!foundIssues) return res.json([]);
        return res.json(foundIssues);
      });
    })

    
    .post(function (req, res){
      // { // req.body example
      //   issue_title: 'Test Title',
      //   issue_text: 'Test Text',
      //   created_by: 'TestCreator',
      //   assigned_to: 'TestAssignedTo',
      //   status_text: 'TestStatusText'
      // }

      // check for required fields
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by)
          return res.json({ error: 'required field(s) missing' });

      // create an issue for the project in the url
      Issue.create({
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        project_name: req.params.project,
      }, (err, createdIssue) => {
        if (err) return res.json({ error: err });
        return res.json(createdIssue);
      });
    })

    
    .put(function (req, res){
      // { // req.body example
      //   _id: 'testid',
      //   issue_title: '',
      //   issue_text: '',
      //   created_by: '',
      //   assigned_to: '',
      //   status_text: '',
      //   open: 'false',
      // }

      // if no id was provided
      if (!req.body._id)
        return res.json({ error: 'missing _id' });

      let updateObject = {};

      // set updateObject key value pairs for existing req.body key value pairs
      Object.keys(req.body).forEach((key) => {
        if (req.body[key]) updateObject[key] = req.body[key];
      });

      // if no fields were set
      if (Object.keys(updateObject).length === 1)
        return res.json({ error: 'no update field(s) sent', _id: req.body._id });

      // set update date
      updateObject.updated_on = new Date();

      // fix open key value
      if (req.body.open) updateObject.open = false;

      // update the issue by id / catch empty updated issue along with err
      Issue.findByIdAndUpdate(req.body._id, updateObject, (err, updatedIssue) => {
        if (err || !updatedIssue) return res.json({ error: 'could not update', _id: req.body._id });
        return res.json({ result: 'successfully updated', _id: req.body._id });
      });
    })

    
    .delete(function (req, res){
      // if no id was provided
      if (!req.body._id)
        return res.json({ error: 'missing _id' });

      // delete issue by id / catch empty deleted issue along with err
      Issue.findByIdAndDelete(req.body._id, (err, deletedIssue) => {
        if (err || !deletedIssue) return res.json({ error: 'could not delete', _id: req.body._id });
        return res.json({ result: 'successfully deleted', _id: req.body._id });
      });
    });
    
};
