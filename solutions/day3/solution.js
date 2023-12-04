const path = require("path");
const { position } = require("promise-path");
const readline = require("readline");
const fs = require("fs");
const fromHere = position(__dirname);
var streamAnswer = fs.createWriteStream(path.join(__dirname, "answer.txt"), {flags:"a"});
const report = (...messages) => {
    streamAnswer.write(JSON.stringify(messages) + "\n");
    console.log(`[${require(fromHere("../../package.json")).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages);
  };
const lib003 = require("../lib/day3");

 function run () {
    solveForFirstStar();
    solveForSecondStar();
}

 function solveForFirstStar () {
  const filePath = path.join(__dirname, "input.txt");
  const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath)
  });
  
  let lines = [];
  readInterface.on("line", function (line) {
    lines.push(line);
  });
  
  readInterface.on("close", function () {
    let result = lib003.getSumOfParts(lines);
    report("Solution 1:", result);
  });
}

 function solveForSecondStar () {
  const filePath = path.join(__dirname, "input.txt");
  const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath)
  });

  let lines = [];
  readInterface.on("line", function (line) {
    lines.push(line);
  });
  
  readInterface.on("close", function () {
    let result = lib003.getGearsRatio(lines);
    report("Solution 2:", result)
  });
}

run();