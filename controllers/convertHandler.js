function ConvertHandler() {

  // handle inputNum
  this.getNum = function(input) {
    const num = input.split(/[a-zA-Z]/)[0];

    // Handle cases like "5.4/3lbs" by evaluating the fractional part
    if (!num) return 1; // Default to 1 if no numerical value provided

    const fractionalParts = num.split('/');
    let result;

    if (fractionalParts.length === 1) {
      result = parseFloat(num);
    } else if (fractionalParts.length === 2) {
      result = parseFloat(fractionalParts[0]) / parseFloat(fractionalParts[1]);
    } else {
      result = 'invalid number';
    }

    return result;
  };

  // handle inputUnit
  this.getUnit = function(input) {
    const unit = input.split(/[0-9/.]/).pop().toLowerCase();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (validUnits.includes(unit)) {
      if (unit === 'l') return 'L'; // Convert 'l' to 'L'
      return unit;
    } else {
      return 'invalid unit';
    }
  };

  //convert inputUnit
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return unitNames[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const conversionFactors = {
      'gal': 3.78541, // Gallons to Liters
      'l': 1 / 3.78541, // Liters to Gallons
      'mi': 1.60934, // Miles to Kilometers
      'km': 1 / 1.60934, // Kilometers to Miles
      'lbs': 0.453592, // Pounds to Kilograms
      'kg': 1 / 0.453592 // Kilograms to Pounds
    };
    let result
    result = initNum * conversionFactors[initUnit.toLowerCase()];
    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };

}

module.exports = ConvertHandler;
