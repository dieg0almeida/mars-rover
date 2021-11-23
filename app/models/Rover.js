'use strict';

const tools = require('../common/tools');
const { positionsMapping } = require('../common/positionsMapping');

class Rover{

  constructor(Plateau) {
    this.currentState = {
      x: 0,
      y: 0,
      direction: 'N'
    };

    this.roverName = "Rover";
  }

  get state() {
    return this.currentState;  
  }

  set name(name) {
    this.roverName += name;
  }

  get name() {
    return this.roverName;
  }

  set plateau(plateau) {
    this.plateauReference = plateau;
  }

  get plateau() {
    return this.plateauReference;
  }

  setLandingInstructions(x, y, direction) {
    if(this.isInvalidInteger(x))
      return new Error('Woops, X coordinate must be an integer.');
    
    if(x < 0)
      return new Error('Woops, X coordinate must be bigger or equal than 0.');

    if(this.isInvalidInteger(y))
      return new Error('Woops, Y coordinate must be an integer.');
    
    if(y < 0)
      return new Error('Woops, Y coordinate must be bigger or equal than 0.');

    if(this.isInvalidDirection(direction))    
      return new Error('Provide a valid direction N S E W.');

    return this.currentState = {
      x: tools.round(x) || 0,
      y: tools.round(y) || 0,
      direction: String(direction).toLocaleUpperCase() || 'N',
    };
  }

  setInstructions(data) {
    var
    parseInstructions = this.parseInstructions(data);

    if(!this.plateau)
      return new Error('A plateau must be given for the rover move over.');

    if(!parseInstructions || !parseInstructions.length)
      return new Error('Provide valid directions please. Onyl allowes L R M');

    parseInstructions.forEach(instruction => {
      this.dealWithInstruction(instruction);
    });

    return true;
  }

  dealWithInstruction(instruction) {
    switch(instruction) {
      case 'L':
        this.turnLeft(); break;
      case 'R':
        this.turnRight(); break;
      case 'M':
        this.move(); break;
    }
  }

  getCurrentDirection() {
    return this.currentState.direction;
  }

  turnLeft() {
    this.setCurrentDirection(this.getPositionWhenTurnLeft());
  }

  turnRight() {
    this.setCurrentDirection(this.getPositionWhenTurnRight());
  }

  move() {
    let
    currentDirection = this.getCurrentDirection();

    switch(currentDirection) {
      case 'N':
        this.moveY(1); break;
      case 'S':
        this.moveY(-1); break;
      case 'E':
        this.moveX(1); break;
      case 'W':
        this.moveX(-1); break;
    }
  }

  moveX(amount) {
    this.currentState.x += (parseInt(amount) || 0);

    if(this.currentState.x < 0)
      this.currentState.x = 0;

    if(this.currentState.x > this.plateau.limits.x)
      this.currentState.x = this.plateau.limits.x;
  }

  moveY(amount) {
    this.currentState.y += (parseInt(amount) || 0);

    if(this.currentState.y < 0)
      this.currentState.y = 0;

    if(this.currentState.y > this.plateau.limits.y)
      this.currentState.y = this.plateau.limits.y;
  }

  setCurrentDirection(direction) {
    this.currentState.direction = direction;
  }

  getPositionWhenTurnLeft() {
    return positionsMapping[this.getCurrentDirection()].left;
  }

  getPositionWhenTurnRight() {
    return positionsMapping[this.getCurrentDirection()].right;
  }

  parseInstructions(data) {
    return (String(data || "").toLocaleUpperCase().match(/[a-zA-Z]+/gi) || []).join("").match(/L|R|M/gi) || [];
  }

  isInvalidInteger(data) {
    return tools.isInvalidInteger(data);
  }

  isInvalidDirection(data) {
    return tools.isInvalidDirection(data);
  }

  displayCurrentState() {
    let
    text = " >>> " + this.name + " final position: ";

    for(let index in this.currentState)
      text += " " + this.currentState[index];

    return text;
  }

};

module.exports = Rover;