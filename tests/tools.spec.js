'use strict'

const tools = require('../app/common/tools');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe('tools', () => {
  
  describe('About the tools functions', () => {
    
    it('should return false if is a valid integer', () => {
      expect(tools.isInvalidInteger(2)).to.be.equal(false);
    })

    it('should return true if not a valid integer', () => {
      expect(tools.isInvalidInteger('d')).to.be.equal(true);
    })

    it('should return an array of user inputs in every space', () => {
      expect(tools.splitUserInput('user input arrays ')).to.deep.equal(['user','input', 'arrays']);
    })

    it('should round a number if it is valid', () => {
      expect(tools.round(2.5)).to.be.equal(3);
    })

    it('should reutrn 0 from round if a number is invalid', () => {
      expect(tools.round('NEWS')).to.be.equal(0);
    })

    it('should parse the comand line input and return as array', () => {
      expect(tools.parseCommandLineInput({
        userInput :'My command line input'
      })).to.deep.equal(['My','command','line','input']);
    })

    it('should parse the comand line input and return an empty array', () => {
      expect(tools.parseCommandLineInput('My command line input')).to.deep.equal([]);
    })

    it('should identify a valid direction', () => {
      expect(tools.isValidDirection('S')).to.be.not.null;
    })

    it('should return null if a invalid direction is given', () => {
      expect(tools.isValidDirection('D')).to.be.null;
    })

    it('should return true if a invalid direction is given', () => {
      expect(tools.isInvalidDirection('D')).to.be.true;
    })

  })

})