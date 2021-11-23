'use strict';

const tools = require('../common/tools');

class Plateau{

  constructor() {
    this.limitsCoordenates = {
      x: 0,
      y: 0
    };

    this.roverPool = [];
  }

  set limits(array) {
    this.limitsCoordenates = {
      x: array[0] || 0,
      y: array[1] || 0
    };
  }

  get limits() {
    return this.limitsCoordenates;
  }

  setBorderLimits(x,y) {
    if(this.isInvalidInteger(x))
      return new Error('Woops, X coordinate must be an integer.');

    if(this.isInvalidInteger(y))
      return new Error('Woops, Y coordinate must be an integer.');

    return this.limits = [tools.round(x), tools.round(y)];
  }

  addRover(roverInstance) {
    let
    roverState = roverInstance.state;

    if(roverState.x > this.limits.x) {
      return new Error("The rover X position must be inside the plateau borders.");
    }

    if(roverState.y > this.limits.y)
      return new Error("The rover Y position must be inside the plateau borders.");

    return this.roverPool.push(roverInstance);
  }

  getCurrentRover() {
    return this.roverPool[this.roverPool.length-1];
  }

  getRoverPoolSize() {
    return this.roverPool.length;
  }

  isInvalidInteger(data) {
    return tools.isInvalidInteger(data);
  }

};

module.exports = Plateau;