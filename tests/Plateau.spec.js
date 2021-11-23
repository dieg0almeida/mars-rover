'use strict'

const Plateau = require('../app/models/Plateau');
const Rover = require('../app/models/Rover');
const expect = require('chai').expect;

describe('Plateau model', () => {
  
  describe('About the constructor', () => {
    
    it('should build an instance', () => {
      let plateau = new Plateau();
      
      expect(plateau).to.not.be.null;
      expect(plateau).to.not.be.undefined;
      expect(plateau).to.be.instanceOf(Plateau);
    })
    
    it('should initialize variables correctly', () => {
      let plateau = new Plateau();
      
      expect(plateau.limitsCoordenates).to.deep.equal({
        x: 0,
        y: 0        
      });

      expect(plateau.roverPool).to.deep.equal([]);
    })
  })
  
  describe('About the getters and setters', () => {
    
    it('should set limits', () => {
      let plateau = new Plateau();

      plateau.limits = [5, 3]
      
      expect(plateau.limitsCoordenates).to.deep.equal({
        x: 5,
        y: 3
      });
    })
    
    it('should get limits', () => {
      let plateau = new Plateau();

      plateau.limits = [5, 3]
      
      expect(plateau.limits).to.deep.equal({
        x: 5,
        y: 3
      });
    })
    
    it('should set the border limits', () => {
      let plateau = new Plateau();

      let invalid =  plateau.setBorderLimits(5, 3)
      
      expect(plateau.limits).to.deep.equal({
        x: 5,
        y: 3
      });
    })
    
    it('should not accept an invalid X value', () => {
      let plateau = new Plateau();

      let invalid = plateau.setBorderLimits('X', 3)
      
      expect(invalid.message).to.be.equal('Woops, X coordinate must be an integer.');
    })
    
    it('should not accept an invalid Y value', () => {
      let plateau = new Plateau();

      let invalid = plateau.setBorderLimits(3, 'Y')
      
      expect(invalid.message).to.be.equal('Woops, Y coordinate must be an integer.');
    })
    
    it('should add a Rover to pool', () => {
      let plateau = new Plateau();
      let rover = new Rover();

      plateau.setBorderLimits(5, 5);
      rover.setLandingInstructions(0, 0);
      plateau.addRover(rover);
      
      expect(plateau.roverPool.length).to.be.equal(1);
    })
    
    it('should not permit a Rover out of X border', () => {
      let plateau = new Plateau();
      let rover = new Rover();

      plateau.setBorderLimits(5, 5);
      rover.setLandingInstructions(6, 5, 'N');
      plateau.addRover(rover);
      
      expect(plateau.roverPool.length).to.be.equal(0);
    })
    
    it('should not permit a Rover out of Y border', () => {
      let plateau = new Plateau();
      let rover = new Rover();

      plateau.setBorderLimits(5, 5);
      rover.setLandingInstructions(5, 6, 'N');
      plateau.addRover(rover);
      
      expect(plateau.roverPool.length).to.be.equal(0);
    })
    
    it('should get the current Rover', () => {
      let plateau = new Plateau();
      let rover = new Rover();

      plateau.addRover(rover);
      
      expect(plateau.getCurrentRover()).to.be.equal(rover);
    })
    
    it('should get the rover pool size', () => {
      let plateau = new Plateau();
      let rover = new Rover();

      plateau.addRover(rover);
      
      expect(plateau.getRoverPoolSize()).to.be.equal(1);
    })
  })
  
  describe('About the other methods', () => {

    it('should get an invalid integer', () => {
      let plateau = new Plateau();
      let invalid = plateau.isInvalidInteger('d');
      
      expect(invalid).to.be.equal(true);
    })

    it('should get a valid integer', () => {
      let plateau = new Plateau();
      let invalid = plateau.isInvalidInteger(2.5);
      
      expect(invalid).to.be.equal(false);
    })
  })

})