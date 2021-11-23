'use strict'

const print = console.log;

function isInvalidInteger(data) {
  return isNaN(parseFloat(data));
};

function splitUserInput(inputString) {
  return String(inputString || "").trim().split(" ");
};

function printWarnMessageIfExists(warnMessage) {
  if(warnMessage) {
    print('\n');
    print('::::::::::::::');
    print("Warning: ", String(warnMessage));
    print('::::::::::::::');
    print('\n');
  }
};

function round(number) {
  if(!isInvalidInteger(number))
    return Math.round(number);

  return 0;
};

function parseCommandLineInput(commandLineInput) {
  var
  userInput = commandLineInput && commandLineInput.userInput,
  splitedInput = userInput ? splitUserInput(userInput.trim()) : [],
  filtered = splitedInput.filter(command => String(String(command).trim()).toLocaleUpperCase()) || [];

  return filtered;
};

function isValidDirection(data) {
  let
  direction = String(data).toLocaleUpperCase() || "",
  regex = new RegExp(direction.slice(0,1), "gi");

  return "NSEW".match(regex);
};

function isInvalidDirection(data) {
  return !isValidDirection(data);
};

module.exports = {
  print: print,
  isInvalidInteger: isInvalidInteger,
  splitUserInput: splitUserInput,
  printWarnMessageIfExists: printWarnMessageIfExists,
  round: round,
  parseCommandLineInput: parseCommandLineInput,
  isValidDirection: isValidDirection,
  isInvalidDirection: isInvalidDirection,
}