const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  
  test(`Translation with text and locale fields: POST request to /api/translate`, (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I ate yogurt for breakfast.', locale: 'american-to-british' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          text: 'I ate yogurt for breakfast.',
          translation: 'I ate <span class="highlight">yoghurt</span> for breakfast.',
        });
        done();
      });
  });
  
  test(`Translation with text and invalid locale field: POST request to /api/translate`, (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I ate yogurt for breakfast.', locale: 'not-valid-locale' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Invalid value for locale field',
        });
        done();
      });
  });
  
  test(`Translation with missing text field: POST request to /api/translate`, (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: undefined, locale: 'american-to-british' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Required field(s) missing',
        });
        done();
      });
  });
  
  test(`Translation with missing locale field: POST request to /api/translate`, (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I ate yogurt for breakfast.', locale: undefined })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Required field(s) missing',
        });
        done();
      });
  });
  
  test(`Translation with empty text: POST request to /api/translate`, (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: '', locale: 'american-to-british' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'No text to translate',
        });
        done();
      });
  });
  
  test(`Translation with text that needs no translation: POST request to /api/translate`, (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: `I do not need translation.`, locale: 'american-to-british' })
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          text: `I do not need translation.`,
          translation: `Everything looks good to me!`,
        });
        done();
      });
  });

});
