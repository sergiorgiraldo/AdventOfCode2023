const path = require("path");
const { position } = require("promise-path");
const readline = require("readline");
const fs = require("fs");
const fromHere = position(__dirname);
fs.unlinkSync(path.join(__dirname, "answer.txt"));
var streamAnswer = fs.createWriteStream(path.join(__dirname, "answer.txt"), {flags:"a"});
const report = (...messages) => {
    streamAnswer.write(JSON.stringify(messages) + "\n");
    console.log(`[${require(fromHere("../../package.json")).logName} / ${__dirname.split(path.sep).pop()}]`, ...messages);
  };
const lib002 = require("../lib/day2");

function run () {
    solveForFirstStar();
    solveForSecondStar();
}

function solveForFirstStar () {
  const start = Date.now();
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
    const end = Date.now();
    report("Solution 1:", result, ` Execution time: ${end - start} ms`);
  });
}

function solveForSecondStar () {
  const start = Date.now();
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
    const end = Date.now();
    report("Solution 2:", result, ` Execution time: ${end - start} ms`)
  });
}

run();