const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200, 'response should be 200');
        assert.deepEqual(
          res.body,
          {
            initNum: 10,
            initUnit: 'L',
            returnNum: 2.64172,
            returnUnit: 'gal',
            string: '10 liters converts to 2.64172 gallons',
          },
          'expected values in object are incorrect',
        );
        return done();
      });
  });

  // test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/convert')
  //     .query({ input: '32g' })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.strictEqual(res.status, 200, 'response should be 200');
  //       assert.strictEqual(res.text, 'invalid unit');
  //       return done();
  //     });
  // });

  // test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/convert')
  //     .query({ input: '3/7.2/4kg' })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.strictEqual(res.status, 200, 'response should be 200');
  //       assert.strictEqual(res.text, 'invalid number');
  //       return done();
  //     });
  // });

  // test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/convert')
  //     .query({ input: '3/7.2/4kilomegagram' })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.strictEqual(res.status, 200, 'response should be 200');
  //       assert.strictEqual(res.text, 'invalid number and unit');
  //       return done();
  //     });
  // });

  // test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
  //   chai
  //     .request(server)
  //     .get('/api/convert')
  //     .query({ input: 'l' })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.strictEqual(res.status, 200, 'response should be 200');
  //       assert.deepEqual(
  //         res.body,
  //         {
  //           initNum: 1,
  //           initUnit: 'L',
  //           returnNum: 0.26417,
  //           returnUnit: 'gal',
  //           string: '1 liter converts to 0.26417 gallons',
  //         },
  //         'expected values in object are incorrect',
  //       );
  //       return done();
  //     });
  // });
});
