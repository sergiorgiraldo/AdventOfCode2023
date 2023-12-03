const path = require("path");
const { position } = require("promise-path");
const readline = require("readline");
const fs = require("fs");
const fromHere = position(__dirname);
const report = (...messages) => console.log(`[${require(fromHere("../../package.json")).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages);
const lib003 = require("../lib/003");

async function run () {
    await solveForFirstStar();
    await solveForSecondStar();
}

async function solveForFirstStar () {
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

async function solveForSecondStar () {
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