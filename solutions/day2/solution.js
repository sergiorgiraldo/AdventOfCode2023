const path = require("path");
const { position } = require("promise-path");
const readline = require("readline");
const fs = require("fs");
const fromHere = position(__dirname);
const report = (...messages) => console.log(`[${require(fromHere("../../package.json")).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages);
const lib002 = require("../lib/002");

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
      let res = lib002.isAllowed(line);
      if (res.allowed) result += parseInt(res.id, 10);
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
      const power = lib002.getPower(line);
      result += power;
  });
  readInterface.on("close", function () {
    report("Solution 2:", result)
  });
}

run();