const path = require("path");
const { position } = require("promise-path");
const readline = require("readline");
const fs = require("fs");
const fromHere = position(__dirname);
const report = (...messages) => console.log(`[${require(fromHere("../../package.json")).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages);

async function run () {
    await solveForFirstStar();
    await solveForSecondStar();
}

async function solveForFirstStar () {
  const filePath = path.join(__dirname, "input.txt");
  const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath)
  });
  
  let result=0;

  readInterface.on("line", function (line) {

  });
  
  readInterface.on("close", function () {
    report("Solution 1:", result);
  });
}

async function solveForSecondStar () {
  const filePath = path.join(__dirname, "input.txt");
  const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath)
  });

  let result=0;

  readInterface.on("line", function (line) {

  });
  
  readInterface.on("close", function () {
    report("Solution 2:", result)
  });
}

run();