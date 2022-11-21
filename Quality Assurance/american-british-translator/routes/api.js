'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    
    .post((req, res) => {
      // validate inputs
      const validateResponse = translator.validateInput(req.body.text, req.body.locale);
      if (validateResponse) return res.json(validateResponse);

      // if american to british
      if (req.body.locale === 'american-to-british') {
        const americanToBritishResponse = translator.americanToBritish(req.body.text);
        if (americanToBritishResponse.text === americanToBritishResponse.translation[0])
          return res.json({ text: americanToBritishResponse.text, translation: 'Everything looks good to me!' })
        
        return res.json({
          text: americanToBritishResponse.text,
          translation: americanToBritishResponse.translation[1],
        });
      }

      // if british to american
      const britishToAmericanResponse = translator.britishToAmerican(req.body.text);
      if (britishToAmericanResponse.text === britishToAmericanResponse.translation[0])
          return res.json({ text: britishToAmericanResponse.text, translation: 'Everything looks good to me!' })

      return res.json({
        text: britishToAmericanResponse.text,
        translation: britishToAmericanResponse.translation[1],
      });
    });
  
};
