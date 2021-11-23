'use strict'

const Rover = require('../app/models/Rover');
const Plateau = require('../app/models/Plateau');
const expect = require('chai').expect;

describe('Rover model', () => {
  
  describe('About the constructor', () => {
    
    it('should build an instance', () => {
      let rover = new Rover();
      expect(rover).to.not.be.null;
      expect(rover).to.not.be.undefined;
      expect(rover).to.be.instanceOf(Rover);
    })

    it('should initialize X at 0', () => {
      let rover = new Rover();
      expect(rover.state.x).to.be.equal(0);
    })

    it('should initialize Y at 0', () => {
      let rover = new Rover();
      expect(rover.state.y).to.be.equal(0);
    })

    it('should initialize direction at N', () => {
      let rover = new Rover();
      expect(rover.state.direction).to.be.equal('N');
    })

    it('should initialize name equal "Rover"', () => {
      let rover = new Rover();
      expect(rover.name).to.be.equal("Rover");
    })
  })

  describe('About the getters and setters', () => {

    it('should get current state', () => {
      let rover = new Rover();
      expect(rover.state).to.be.equal(rover.currentState);
    })

    it('should get initial state', () => {
      let rover = new Rover();
      expect(rover.state).to.deep.equal({
        x: 0,
        y: 0,
        direction: 'N'
      });
    })

    it('should set the Rover\'s name', () => {
      let rover = new Rover();

      rover.name = 1;

      expect(rover.name).to.be.equal('Rover1');
    })

    it('should get the Rover\'s name', () => {
      let rover = new Rover();

      rover.name = 1;

      expect(rover.name).to.be.equal('Rover1');
    })

    it('should get the current direction', () => {
      let rover = new Rover();

      rover.setLandingInstructions(0,0,'S');

      expect(rover.getCurrentDirection()).to.be.equal('S');
    })
  })
  
  describe('About the directions logic', () => {
    
    it('should land at 0 0 S', () => {
      let rover = new Rover();

      rover.setLandingInstructions(0,0,'S');

      expect(rover.state.x).to.be.equal(0);
      expect(rover.state.y).to.be.equal(0);
      expect(rover.state.direction).to.be.equal('S');
    })

    it('should land at 1 3 E', () => {
      let rover = new Rover();

      rover.setLandingInstructions(1,3,'E');

      expect(rover.state.x).to.be.equal(1);
      expect(rover.state.y).to.be.equal(3);
      expect(rover.state.direction).to.be.equal('E');
    })

    it('should return error message to wrong X coordinate', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(null, 3, 'E');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should return error message to X coordinate out of limits', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(-1, 0, 'E');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should return error message to Y coordinate out of limits', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(-1, 0, 'E');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should return error message to wrong Y coordinate', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(3, 'F', 'E');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should return error message to wrong direction', () => {
      let rover = new Rover();
      let roverValidation = rover.setLandingInstructions(0, 0, ' ');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should accept instructions to move', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;

      expect(rover.setInstructions('LRM')).to.be.equal(true);
    })

    it('should identify instructions among characters and spaces', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();
      let roverValidation; 

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      roverValidation = rover.setInstructions('102oda R$@!#!@# ´ ldsa0 1 ds a  dsdll l l mn asd r');

      expect(roverValidation).to.be.equal(true);
    })

    it('should not accept instructions if numbers are passed', () => {
      let rover = new Rover();
      let roverValidation = rover.setInstructions(112);

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })

    it('should not accept instructions if not find any instructions', () => {
      let rover = new Rover();
      let roverValidation = rover.setInstructions('dsajidubashdjsakdasdjashdiaoi');

      expect(roverValidation).to.have.property('message');
      expect(roverValidation.message).to.not.be.null;
    })
  })

  describe('About the movements', () => {

    it('should start and go to W', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      rover.plateau = plateauMars;
      rover.setInstructions('L');

      expect(rover.getCurrentDirection()).to.be.equal('W');
    })

    it('should start and go to S', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      rover.plateau = plateauMars;
      rover.setInstructions('LL');

      expect(rover.getCurrentDirection()).to.be.equal('S');
    })

    it('should start and go to E', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      rover.plateau = plateauMars;
      rover.setInstructions('LLL');

      expect(rover.getCurrentDirection()).to.be.equal('E');
    })

    it('should start at 3 2 W and finish at 1 1 E', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(3, 2, 'W');
      rover.setInstructions('MMLML');

      expect(rover.state.x).to.be.equal(1);
      expect(rover.state.y).to.be.equal(1);
      expect(rover.getCurrentDirection()).to.be.equal('E');
    })

    it('should start at 6 5 S and finish at 2 4 E', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(6, 5, 'S');
      rover.setInstructions('MRMLRMMMRR');

      expect(rover.state.x).to.be.equal(2);
      expect(rover.state.y).to.be.equal(4);
      expect(rover.getCurrentDirection()).to.be.equal('E');
    })

    it('should deal with instruction and turn left', () => {
      let rover = new Rover();

      rover.setLandingInstructions(1, 1, 'S');
      
      rover.dealWithInstruction('L');
      
      expect(rover.getCurrentDirection()).to.be.equal('E');
    })

    it('should deal with instruction and turn right', () => {
      let rover = new Rover();

      rover.setLandingInstructions(1, 1, 'S');
      
      rover.dealWithInstruction('R');

      expect(rover.getCurrentDirection()).to.be.equal('W');
    })

    it('should deal with instruction and move to South', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'S');
      rover.dealWithInstruction('M');

      expect(rover.state.y).to.be.equal(0);
    })

    it('should deal with instruction and move to North', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'N');
      rover.dealWithInstruction('M');

      expect(rover.state.y).to.be.equal(2);
    })

    it('should turn left', () => {
      let rover = new Rover();

      rover.setLandingInstructions(1, 1, 'N');
      
      rover.turnLeft();

      expect(rover.getCurrentDirection()).to.be.equal('W');
    })

    it('should turn right', () => {
      let rover = new Rover();

      rover.setLandingInstructions(1, 1, 'N');
      
      rover.turnRight();

      expect(rover.getCurrentDirection()).to.be.equal('E');
    })

    it('should move 1 point to North', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'N');
      
      rover.move();

      expect(rover.state.y).to.be.equal(2);
    })

    it('should move 1 point to South', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'S');
      
      rover.move();

      expect(rover.state.y).to.be.equal(0);
    })

    it('should move 1 point to East', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'E');
      
      rover.move();

      expect(rover.state.x).to.be.equal(2);
    })

    it('should move 1 point to Weast', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'W');
      
      rover.move();

      expect(rover.state.x).to.be.equal(0);
    })

    it('should decrease 1 point to X state', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'W');
      
      rover.moveX(-1);
      rover.moveX(null);

      expect(rover.state.x).to.be.equal(0);
    })

    it('should increase 1 point to X state', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'W');
      
      rover.moveX(1);
      rover.moveX(null);

      expect(rover.state.x).to.be.equal(2);
    })

    it('should decrease 1 point to Y state', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'N');
      
      rover.moveY(-1);
      rover.moveY(null);

      expect(rover.state.y).to.be.equal(0);
    })

    it('should increase 1 point to Y state', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();

      plateauMars.setBorderLimits(5,5);
      rover.plateau = plateauMars;
      rover.setLandingInstructions(1, 1, 'S');
      
      rover.moveY(1);
      rover.moveY(null);
      rover.moveY('d');

      expect(rover.state.y).to.be.equal(2);
    })

    it('should set the direction to W', () => {
      let rover = new Rover();

      rover.setCurrentDirection('W');

      expect(rover.state.direction).to.be.equal('W');
    })

    it('should start poiting North and get Weast as left sibling', () => {
      let rover = new Rover();
      let sibling = rover.getPositionWhenTurnLeft();

      expect(sibling).to.be.equal('W');
    })

    it('should start poiting North and get East as right sibling', () => {
      let rover = new Rover();
      let sibling = rover.getPositionWhenTurnRight();

      expect(sibling).to.be.equal('E');
    })

    it('should start poiting South and get East as left sibling', () => {
      let rover = new Rover();
      let sibling;

      rover.setLandingInstructions(0, 0, 'S');

      sibling = rover.getPositionWhenTurnLeft();

      expect(sibling).to.be.equal('E');
    })

    it('should start poiting South and get Weast as right sibling', () => {
      let rover = new Rover();
      let sibling;

      rover.setLandingInstructions(0, 0, 'S');

      sibling = rover.getPositionWhenTurnRight();

      expect(sibling).to.be.equal('W');
    })

    it('should not cross X right border', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();
      let sibling;

      rover.plateau = plateauMars;
      plateauMars.setBorderLimits(5,5);
      rover.setLandingInstructions(3, 3, 'E');

      rover.setInstructions("MMMMMM");

      expect(rover.state.x).to.be.equal(5);
    })

    it('should not cross X left border', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();
      let sibling;

      rover.plateau = plateauMars;
      plateauMars.setBorderLimits(5,5);
      rover.setLandingInstructions(3, 3, 'W');

      rover.setInstructions("MMMMMM");

      expect(rover.state.x).to.be.equal(0);
    })

    it('should not cross Y up border', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();
      let sibling;

      rover.plateau = plateauMars;
      plateauMars.setBorderLimits(5,5);
      rover.setLandingInstructions(3, 3, 'N');

      rover.setInstructions("MMMMMM");

      expect(rover.state.y).to.be.equal(5);
    })

    it('should not cross Y left border', () => {
      let plateauMars = new Plateau();
      let rover = new Rover();
      let sibling;

      rover.plateau = plateauMars;
      plateauMars.setBorderLimits(5,5);
      rover.setLandingInstructions(3, 3, 'S');

      rover.setInstructions("MMMMMM");

      expect(rover.state.y).to.be.equal(0);
    })
  })

  describe('About the other internal methods', () => {

    it('should detect instructions and return as array', () => {
      let rover = new Rover();
      let instructions = rover.parseInstructions("m");

      expect(instructions).to.deep.equal(['M']);
    })

    it('should clear input string and detect instructions and return as array', () => {
      let rover = new Rover();
      let instructions = rover.parseInstructions("moapwqçacnbfrieplaslnfa");

      expect(instructions).to.deep.equal(['M', 'R', 'L', 'L']);
    })

    it('should return an invalid integer validation', () => {
      let rover = new Rover();
      let invalid = rover.isInvalidInteger("mm");

      expect(invalid).to.be.equal(true);
    })

    it('should return a valid integer validation', () => {
      let rover = new Rover();
      let invalid = rover.isInvalidInteger(0);

      expect(invalid).to.be.equal(false);
    })

    it('should return an invalid direction validation', () => {
      let rover = new Rover();
      let invalid = rover.isInvalidDirection(0);

      expect(invalid).to.be.equal(true);
    })

    it('should return a valid direction validation', () => {
      let rover = new Rover();
      let invalid = rover.isInvalidDirection("n");

      expect(invalid).to.be.equal(false);
    })

    it('should display the current state string', () => {
      let rover = new Rover();
      let display;

      rover.setLandingInstructions(3, 2, "S");
      rover.name = 1;
      display = rover.displayCurrentState();
      
      expect(display).to.be.equal(" >>> Rover1 final position:  3 2 S");
    })
  })
})