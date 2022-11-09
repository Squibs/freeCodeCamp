'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const userInput = req.query.input;

    const numberToConvert = convertHandler.getNum(userInput);
    const unitToConvert = convertHandler.getUnit(userInput);

    console.log(userInput);
    console.log(numberToConvert);
    console.log(unitToConvert);

    // check if invalid
    if (numberToConvert === 'invalid number' && unitToConvert === 'invalid unit')
      return res.send('invalid number and unit');
    if (numberToConvert === 'invalid number') return res.send(numberToConvert);
    if (unitToConvert === 'invalid unit') return res.send(unitToConvert);

    const unitToConvertSpell = convertHandler.spellOutUnit(unitToConvert);
    const returnUnit = convertHandler.getReturnUnit(unitToConvert);
    const returnUnitSpell = convertHandler.spellOutUnit(returnUnit);
    const returnNumber = convertHandler.convert(numberToConvert, unitToConvert);
    const returnString = convertHandler.getString(
      numberToConvert,
      unitToConvertSpell,
      returnNumber,
      returnUnitSpell,
    );

    const responseObject = {
      initNum: numberToConvert,
      initUnit: unitToConvert,
      returnNum: returnNumber,
      returnUnit: returnUnit,
      string: returnString,
    };

    // example shape of response
    // const responseObject = {
    //   initNum: 3.1,
    //   initUnit: 'mi',
    //   returnNum: 4.98895,
    //   returnUnit: 'km',
    //   string: '3.1 miles converts to 4.98895 kilometers',
    // };
    
    res.json(responseObject);
  });

};
