'use strict';

/* npm modules */
const program = require('commander');
const inquirer = require('inquirer');

/* app modules */
const tools = require('./app/common/tools');
const Plateau = require('./app/models/Plateau');
const Rover = require('./app/models/Rover');

/* local variables */
let plateauMars = new Plateau();
let programFlow = {

  plateauConfiguration: {

    question: function() {
      return  "Plateau upper-right limits: ";
    },

    answer: function(commandLineInput) {
      let
      inputs = tools.parseCommandLineInput(commandLineInput),
      validInput = inputs && inputs.length === 2;

      if(validInput) {
        let
        coordinateX = inputs[0],
        coordinateY = inputs[1],
        bordersValidation = plateauMars.setBorderLimits(coordinateX, coordinateY);
        
        if(bordersValidation.message)
          makeCommandLineQuestion('plateauConfiguration', bordersValidation.message);
        else
          makeCommandLineQuestion('roverLandingConfiguration');

      } else {
        makeCommandLineQuestion('plateauConfiguration', 'Hey, supply 2 integer numbers please.');
      }
    }
  },

  roverLandingConfiguration: {

    question: function() {
      return "Rover" + ( plateauMars.getRoverPoolSize() + 1 ) + " Landing: ";
    },

    answer: function(commandLineInput) {
      let
      inputs = tools.parseCommandLineInput(commandLineInput),
      validInput = inputs && inputs.length === 3;

      if(validInput) {
        let
        coordinateX = inputs[0],
        coordinateY = inputs[1],
        direction = inputs[2],
        rover = new Rover(),
        inValidRoverLanding = rover.setLandingInstructions(coordinateX, coordinateY, direction);

        rover.plateau = plateauMars;

        if(inValidRoverLanding.message) {
          makeCommandLineQuestion('roverLandingConfiguration', inValidRoverLanding.message);
        } else {
          let invalidRoverArea = plateauMars.addRover(rover);

          if(invalidRoverArea.message)
            return makeCommandLineQuestion("roverLandingConfiguration", invalidRoverArea.message);

          rover.name = plateauMars.getRoverPoolSize();

          makeCommandLineQuestion('instructionsForCurrentRover');
        }
      }else {
        makeCommandLineQuestion('roverLandingConfiguration', 'Please, supply the landing coordinates and a valid direction in the format: 0 0 D');
      }
    }
  },

  instructionsForCurrentRover: {

    question: function() {
      return "Rover" + ( plateauMars.getRoverPoolSize() ) + " Instructions: ";
    },

    answer: function(commandLineInput) {
      let
      inputs = tools.parseCommandLineInput(commandLineInput),
      instructions = inputs.join("").replace(" ", "");

      if(instructions) {
        let
        currentRover = plateauMars.getCurrentRover(),
        invalidInstructions = currentRover.setInstructions(instructions);

        if(invalidInstructions.message) {
          makeCommandLineQuestion('instructionsForCurrentRover', invalidInstructions.message);
        } else {
          tools.print("\n");
          tools.print(currentRover.displayCurrentState());
          tools.print("\n");
          makeCommandLineQuestion('roverLandingConfiguration'); 
        }
      }else{
        makeCommandLineQuestion('instructionsForCurrentRover', 'Please inform correct instructions for the current Rover. Only allowed: L R M');
      }
    }
  }
};

/* Command line inteface question */
function makeCommandLineQuestion(step, warnMessage) {
  let
  stepData = programFlow[step],
  question = stepData.question(),
  answerMethod = stepData.answer;

  tools.printWarnMessageIfExists(warnMessage);

  commandLineApi([{
    type: 'input',
    name: 'userInput',
    message: question,
  }], answerMethod);
};

/* Command line api */
function commandLineApi(questions, responseMethod) {
  inquirer.prompt(questions).then(responseMethod);
};

/* app start */
tools.print("\n");
tools.print("-------- Mars Rover Simulator --------");
tools.print("Before start, let's configurate the plateau borders.");
tools.print("Please, inform the plateau upper-right points with format 0 0 ");
tools.print("\n");
tools.print("******* press ctrl + c to stop *******");
tools.print("\n");

program
  .version('1.0.0')
  .description('Mars Rover Simulator');

program
  .command('start')
  .alias('s')
  .description('Start the simulator')
  .action(() => makeCommandLineQuestion('plateauConfiguration'));

program
  .parse(process.argv);