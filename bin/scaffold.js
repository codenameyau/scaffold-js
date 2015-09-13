#!/usr/bin/env node
'use strict';

var inquirer = require('inquirer');
var writer = require('../lib/writer');

/********************************************************************
* HELPER FUNCTIONS
*********************************************************************/
var completedCallback = function(error, data) {
  if (error) {
    console.log(error);
  } else {
    data.forEach(function(element) {
      console.log('Created file: %s', element);
    });
  }
};

/********************************************************************
* MAIN PROGRAM
*********************************************************************/
var fileChoices = [
  new inquirer.Separator(' Select with <space> and confirm with <enter>\n'),
  { name: '.editorconfig', checked: true },
  { name: '.gitignore', checked: true },
  { name: '.eslintrc', checked: true },
  { name: '.jshintrc', checked: false },
  { name: '.npmignore', checked: false }
];

inquirer.prompt([{
  type: 'checkbox',
  message: 'Select files to create:',
  name: 'scaffold',
  choices: fileChoices
}], function(answers) {
  writer.createFiles(answers.scaffold, completedCallback);
});
