const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('./convertHandler.js');
const { describe } = require('mocha');

// transform the function to be an object!!!
let convertHandler = new ConvertHandler();

describe('Unit Tests', function() {

  it('convertHandler should correctly read a whole number input', function() {
    const input = '5kg';
    assert.equal(convertHandler.getNum(input), 5);
  });

  it('convertHandler should correctly read a decimal number input', function() {
    const input = '3.5mi';
    assert.equal(convertHandler.getNum(input), 3.5);
  });

  it('convertHandler should correctly read a fractional input', function() {
    const input = '1/2gal';
    assert.equal(convertHandler.getNum(input), 0.5);
  });

  it('convertHandler should correctly read a fractional input with a decimal', function() {
    const input = '2.5/3km';
    assert.equal(convertHandler.getNum(input), 2.5 / 3);
  });

  it('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    const input = '3/2/3lbs';
    assert.equal(convertHandler.getNum(input), 'invalid number');
  });

  it('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    const input = 'lbs';
    assert.equal(convertHandler.getNum(input), 1);
  });

  it('convertHandler should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('5gal'), 'gal');
    assert.equal(convertHandler.getUnit('3.5l'), 'L');
    assert.equal(convertHandler.getUnit('1/2mi'), 'mi');
    assert.equal(convertHandler.getUnit('2.5/3km'), 'km');
    assert.equal(convertHandler.getUnit('10lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('0.5kg'), 'kg');
  });

  it('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('5invalid'), 'invalid unit');
  });

  it('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  it('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  it('convertHandler should correctly convert gal to L', function() {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  it('convertHandler should correctly convert L to gal', function() {
    let result = 1 / 3.78541
    assert.equal(convertHandler.convert(1, 'L'), result.toFixed(5));
  });

  it('convertHandler should correctly convert mi to km', function() {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  it('convertHandler should correctly convert km to mi', function() {
    let result = 1 / 1.60934
    assert.equal(convertHandler.convert(1, 'km'), result.toFixed(5));
  });

  it('convertHandler should correctly convert lbs to kg', function() {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  it('convertHandler should correctly convert kg to lbs', function() {
    let result = 1 / 0.45359
    assert.equal(convertHandler.convert(1, 'kg'), result.toFixed(5));
  });

});






