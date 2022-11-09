const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

const validUnitInputs = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
const correctUnitSpellings = ['gallons', 'liters', 'pounds', 'kilograms', 'miles', 'kilometers'];

suite('Unit Tests', () => {
  test('`convertHandler` should correctly read a whole number input.', (done) => {
    assert.strictEqual(convertHandler.getNum('1'), 1, 'incorrectly read a whole number input (1)');
    assert.strictEqual(convertHandler.getNum('34'), 34, 'incorrectly read a whole number input (34)');
    assert.strictEqual(convertHandler.getNum('12km'), 12, 'incorrectly read a whole number input (12km)');
    assert.strictEqual(convertHandler.getNum('671gal'), 671, 'incorrectly read a whole number input (1)');
    done();
  });

  test('`convertHandler` should correctly read a decimal number input.', (done) => {
    assert.strictEqual(convertHandler.getNum('1.0'), 1, 'incorrectly read a decimal number input (1)');
    assert.strictEqual(convertHandler.getNum('34.29'), 34.29, 'incorrectly read a decimal number input (34.29)');
    assert.strictEqual(convertHandler.getNum('16.0L'), 16, 'incorrectly read a decimal number input (16.0L)');
    assert.strictEqual(convertHandler.getNum('618.480lbs'), 618.48, 'incorrectly read a decimal number input (618.480lbs)');
    done();
  });

  test('`convertHandler` should correctly read a fractional input.', (done) => {
    assert.strictEqual(convertHandler.getNum('1/2'), 1 / 2, 'incorrectly read a fractional input (1/2)');
    assert.strictEqual(convertHandler.getNum('3/4mi'), 3 / 4, 'incorrectly read a fractional input (3/4mi)');
    done();
  });

  test('`convertHandler` should correctly read a fractional input with a decimal.', (done) => {
    assert.strictEqual(convertHandler.getNum('1.0/2.0'), 1.0 / 2.0, 'incorrectly read a fractional input (1.0/2.0)');
    assert.strictEqual(convertHandler.getNum('1.0/2.0km'), 1.0 / 2.0, 'incorrectly read a fractional input (1.0/2.0km)');
    assert.strictEqual(convertHandler.getNum('12.58/6.231'), 12.58 / 6.231, 'incorrectly read a fractional input (12.58/6.231)');
    assert.strictEqual(convertHandler.getNum('123.456/78.90L'), 123.456 / 78.90, 'incorrectly read a fractional input (123.456/78.90L)');
    done();
  });

  test('`convertHandler` should correctly return an error on a double-fraction (i.e. 3/2/3).', (done) => {
    assert.strictEqual(convertHandler.getNum('3/2/3'), 'invalid number', 'did not give error on double-fraction (3/2/3)');
    assert.strictEqual(convertHandler.getNum('3.45/2.0/3.1522'), 'invalid number', 'did not give error on double-fraction (3/2/3)');
    done();
  });

  test('`convertHandler` should correctly default to a numerical input of 1 when no numerical input is provided.', (done) => {
    validUnitInputs.forEach((unit) => {
      assert.strictEqual(
        convertHandler.getNum(unit),
        1,
        `did not default to a numerical input of 1 when no numerical input was provided (${unit})`
      );
    });
    done();
  });

  test('`convertHandler` should correctly read each valid input unit.', (done) => {
    validUnitInputs.forEach((unit, i) => {
      // lowercase
      assert.strictEqual(
        convertHandler.getUnit(`${Math.random() * 10}${unit}`),
        validUnitInputs[i],
        `${unit} is valid and was not read correctly`,
      );
      // capital
      assert.strictEqual(
        convertHandler.getUnit(`${Math.random() * 10}${unit.toUpperCase()}`),
        validUnitInputs[i],
        `${unit.toUpperCase()} is valid and was not read correctly`,
      );
    });
    done();
  });

  test('`convertHandler` should correctly return an error for an invalid input unit.', (done) => {
    assert.strictEqual(convertHandler.getUnit("invalid input'"), 'invalid unit', 'invalid input was handled incorrectly');
    assert.strictEqual(convertHandler.getUnit("!(\)\/4#![)!(\)[]D(_)']'"), 'invalid unit', 'invalid input was handled incorrectly');
    assert.strictEqual(convertHandler.getUnit("gal5"), 'invalid unit', 'invalid input was handled incorrectly');
    assert.strictEqual(convertHandler.getUnit("1/2miles"), 'invalid unit', 'invalid input was handled incorrectly');
    assert.strictEqual(convertHandler.getUnit("5kg5"), 'invalid unit', 'invalid input was handled incorrectly');
    assert.strictEqual(convertHandler.getUnit(" "), 'invalid unit', 'invalid input was handled incorrectly');
    done();
  });

  test('`convertHandler` should return the correct return unit for each valid input unit.', (done) => {
    validUnitInputs.forEach((unit, i) => {
      assert.strictEqual(
        convertHandler.getReturnUnit(unit),
        !(i % 2) ? validUnitInputs[i + 1] : validUnitInputs[i - 1],
        `${unit} did not return ${!(i % 2) ? validUnitInputs[i + 1] : validUnitInputs[i - 1]}`,
      );
    });
    done();
  });

  test('`convertHandler` should correctly return the spelled-out string unit for each valid input unit.', (done) => {
    validUnitInputs.forEach((unit, i) => {
      assert.strictEqual(
        convertHandler.spellOutUnit(unit),
        correctUnitSpellings[i],
        `'${unit}' was not correctly spelled as '${correctUnitSpellings[i]}'`,
      );
    });
    done();
  });

  test('`convertHandler` should correctly convert gal to L.', (done) => {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541, 'incorrectly converted gal to L.');
    done();
  });

  test('`convertHandler` should correctly convert L to gal.', (done) => {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417, 'incorrectly converted L to gal.');
    done();
  });

  test('`convertHandler` should correctly convert mi to km.', (done) => {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934, 'incorrectly converted mi to km');
    done();
  });

  test('`convertHandler` should correctly convert km to mi.', (done) => {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137, 'incorrectly converted km to mi.');
    done();
  });

  test('`convertHandler` should correctly convert lbs to kg.', (done) => {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359, 'incorrectly converted lbs to kg.');
    done();
  });

  test('`convertHandler` should correctly convert kg to lbs.', (done) => {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462, 'incorrectly converted kg to lbs.');
    done();
  });
});