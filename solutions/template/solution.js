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
const lib = require("../lib/dayTODO");

 function run () {
    solveForFirstStar();
    solveForSecondStar();
}

 function solveForFirstStar () {
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

 function solveForSecondStar () {
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