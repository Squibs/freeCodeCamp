const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const testURL = `/api/issues/suitetest-${new Date().getTime()}`;

const data = {
  issue_title: 'Test POST',
  issue_text: 'This POST has every field',
  created_by: 'chai',
  assigned_to: 'mocha',
  status_text: 'testing',
};

let updateID1;
let updateID2;
let updateID3;

suite('Functional Tests', function() {
  
  test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
    
    chai
      .request(server)
      .post(testURL)
      .send(data)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.issue_title, data.issue_title);
        assert.strictEqual(res.body.issue_text, data.issue_text);
        assert.strictEqual(res.body.created_by, data.created_by);
        assert.strictEqual(res.body.assigned_to, data.assigned_to);
        assert.strictEqual(res.body.status_text, data.status_text);
        assert.strictEqual(res.body.project_name, testURL.slice(12));
        assert.strictEqual(res.body.open, true);
        assert.exists(res.body._id);
        assert.exists(res.body.created_on);
        assert.exists(res.body.updated_on);
        updateID1 = res.body._id;
        done();
      });
  });

  test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {

    const modifiedData = { ...data };
    delete modifiedData.assigned_to;
    delete modifiedData.status_text;
    
    chai
      .request(server)
      .post(testURL)
      .send(modifiedData)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.issue_title, modifiedData.issue_title);
        assert.strictEqual(res.body.issue_text, modifiedData.issue_text);
        assert.strictEqual(res.body.created_by, modifiedData.created_by);
        assert.strictEqual(res.body.assigned_to, '');
        assert.strictEqual(res.body.status_text, '');
        assert.strictEqual(res.body.project_name, testURL.slice(12));
        assert.strictEqual(res.body.open, true);
        assert.exists(res.body._id);
        assert.exists(res.body.created_on);
        assert.exists(res.body.updated_on);
        updateID2 = res.body._id;
        done();
      });
  });

  test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {

    const modifiedData = { ...data };
    delete modifiedData.assigned_to;
    delete modifiedData.status_text;
    delete modifiedData.issue_title;
    delete modifiedData.created_by;
    
    chai
      .request(server)
      .post(testURL)
      .send(modifiedData)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.error, 'required field(s) missing');
        done();
      });
  });

  test('View issues on a project: GET request to /api/issues/{project}', (done) => {
 
    chai
      .request(server)
      .get(testURL)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.length, 2);
        assert.strictEqual(res.body[0].project_name, testURL.slice(12));
        assert.strictEqual(res.body[1].project_name, testURL.slice(12));
        done();
      });
  });


  test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
    // create an additional issue for queries/filters
    const additionalIssue = { ...data };
    additionalIssue.assigned_to = 'fCC';
    additionalIssue.status_text = 'urgent';
    chai
      .request(server)
      .post(testURL)
      .send(additionalIssue)
      .end((err, res) => {
        if (err) return console.log(err);
      });
    
    chai
      .request(server)
      .get(testURL) 
      .query({ assigned_to: 'mocha' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.length, 1);
        assert.strictEqual(res.body[0].issue_title, data.issue_title);
        assert.strictEqual(res.body[0].issue_text, data.issue_text);
        assert.strictEqual(res.body[0].created_by, data.created_by);
        assert.strictEqual(res.body[0].assigned_to, data.assigned_to);
        assert.strictEqual(res.body[0].status_text, data.status_text);
        assert.strictEqual(res.body[0].project_name, testURL.slice(12));
        assert.strictEqual(res.body[0].open, true);
        assert.exists(res.body[0]._id);
        assert.exists(res.body[0].created_on);
        assert.exists(res.body[0].updated_on);
        done();
      });
  });

  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .get(testURL)
      .query({ assigned_to: 'mocha', status_text: 'urgent' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.length, 0);
        done();
      });
  });

  test('Update one field on an issue: PUT request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put(testURL)
      .send({ _id: updateID1, status_text: 'updated' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body._id, updateID1);
        assert.strictEqual(res.body.result, 'successfully updated');
        done();
      });
  });

  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put(testURL)
      .send({ _id: updateID2, status_text: 'big update', issue_title: 'Brand New World' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body._id, updateID2);
        assert.strictEqual(res.body.result, 'successfully updated');
        done();
      });
  });

  test('Update an issue with missing _id: PUT request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put(testURL)
      .send({ status_text: 'big update', issue_title: 'Brand New World' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.error, 'missing _id');
        done();
      });
  });

  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put(testURL)
      .send({ _id: updateID1 })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.error, 'no update field(s) sent');
        assert.strictEqual(res.body._id, updateID1);
        done();
      });
  });

  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .put(testURL)
      .send({ _id: 'FRANK', issue_title: 'WHERE ARE YOU?' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.error, 'could not update');
        assert.strictEqual(res.body._id, 'FRANK');
        done();
      });
  });

  test('Delete an issue: DELETE request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .delete(testURL)
      .send({ _id: updateID1 })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.result, 'successfully deleted');
        done();
      });
  });

  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .delete(testURL)
      .send({ _id: "FRANK" })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.error, 'could not delete');
        assert.strictEqual(res.body._id, 'FRANK');
        done();
      });
  });

  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', (done) => {
    chai
      .request(server)
      .delete(testURL)
      .send({ _id: undefined })
      .end((err, res) => {
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.strictEqual(res.body.error, 'missing _id');
        done();
      });
  });

});
