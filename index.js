'use strict';

var fsHelper = require('./fsHelper'),
    fileManager = require('./fileManager'),
    inputFile = 'input.txt',
    fileLineCount = 100000,
    topLinesCount = 5,
    startDate = new Date();

function splitFile() {
  console.log('Splitting files...');
  fileManager.splitFile(inputFile, fileLineCount, mergeFiles);
}

function mergeFiles(err, files) {
  console.log('Counting words using merge sort...');
  var result = fileManager.getTopLines(files, topLinesCount);

  console.log('Elapsed Time: ' + (new Date() - startDate) + ' ms');
  for(var i = 0; i < result.length; i++) {
    console.log('[' + (i + 1) + '] ' + result[i].count + ' :: ' + result[i].line.substring(0, 40));
  }
}

splitFile();