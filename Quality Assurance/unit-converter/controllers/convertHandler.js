function ConvertHandler() {
  
  this.getNum = function(input) {
    const inputNoUnit = input.split(/[a-zA-z]+$/).join('');
    const validNumberFormat = /((\.\d+)|(\d+(\.\d+)?))/.toString().slice(1, -1);
    const validInputFormat = new RegExp(`^${validNumberFormat}(\/${validNumberFormat})?$`);

    // if no numbers or invalid format
    if (!validInputFormat.test(inputNoUnit)) {
      if (inputNoUnit === '') return 1;
      return 'invalid number';
    }

    const returnUnit = inputNoUnit.split('/');

    // if fraction or dividing by zero
    if (returnUnit[1]) {
      if (returnUnit[1] === '0') return 'invalid number';
      return Number(returnUnit[0] / returnUnit[1]);
    }
    
    return Number(returnUnit);
  };

  
  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'km', 'mi'];
    const validInput = input.split(/^[^a-zA-z]+/).join('').toLowerCase();

    if (!validUnits.includes(validInput)) return 'invalid unit';
    if (validInput === 'l') return 'L'; // must return L as capitalized

    return validInput;
  };

  
  this.getReturnUnit = function(initUnit) {
    // gal -> L (must be capitalized)
    const unitToReturn = {
      gal: 'L', l: 'gal',
      lbs: 'kg', kg: 'lbs',
      mi: 'km', km: 'mi',
    };

    return unitToReturn[initUnit.toLowerCase()];
  };

  
  this.spellOutUnit = function(unit) {
    const spelledOut = {
      gal: 'gallons',
      l: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers',
    };

    return spelledOut[unit.toLowerCase()];
  };

  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const imperial = { gal: galToL, lbs: lbsToKg, mi: miToKm };
    const metric = { l: galToL, kg: lbsToKg, km: miToKm };

    let result;

    if (Object.hasOwn(metric, initUnit.toLowerCase())) 
      result = (initNum / metric[initUnit.toLowerCase()]).toFixed(5);
    else
      result = (initNum * imperial[initUnit.toLowerCase()]).toFixed(5);

    return Number(result);
  };

  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let singularOrPlural = initUnit;
    if (initNum === 1) initUnit = initUnit.slice(0, -1);
    return `${initNum} ${singularOrPlural} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
