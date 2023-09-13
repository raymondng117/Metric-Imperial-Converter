'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      console.log(input)

      // Extract the numerical value and unit from the input
      const initNum = convertHandler.getNum(input);
      console.log(initNum)

      const initUnit = convertHandler.getUnit(input);
      console.log(initUnit)


      // Check if the numerical value or unit is invalid
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json({ error: 'invalid number and unit' });
      } else if (initNum === 'invalid number') {
        return res.json({ error: 'invalid number' });
      } else if (initUnit === 'invalid unit') {
        return res.json({ error: 'invalid unit' });
      }

      // Calculate the returnNum and returnUnit
      const returnNum = convertHandler.convert(initNum, initUnit);
      console.log(returnNum)

      const returnUnit = convertHandler.getReturnUnit(initUnit);
      console.log(returnUnit)


      // Generate the response string
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      console.log(string)


      // Return the result in the desired JSON format
      res.json({ initNum, initUnit, returnNum, returnUnit, string });
    });
};






