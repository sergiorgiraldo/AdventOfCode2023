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
    let sum=0;
    readInterface.on("line", function (line) {
        const numbers = line.match(/\d+?/g);
        if (numbers) {
            const firstNumber = parseInt(numbers[0]).toString();
            const lastNumber = parseInt(numbers[numbers.length - 1]).toString();
            const lineNumber = firstNumber + lastNumber;
            sum += parseInt(lineNumber, 10);
        }
    });
    readInterface.on("close", function() {
        report("Solution 1:", sum)
    });
}

async function solveForSecondStar () {
    const filePath = path.join(__dirname, "input.txt");
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath)
    });
    let sum = 0;
    readInterface.on("line", function (line) {
        let numbers = [];
        const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
        while ((m = regex.exec(line)) !== null) {
            numbers.push(m[0]);
            regex.lastIndex = m.index + 1; // This is necessary to allow overlaps in matches
        }
    
        if (numbers) {
            const firstNumber = getNumber(numbers[0]);
            const lastNumber = getNumber(numbers[numbers.length - 1]);
            const lineNumber = firstNumber + lastNumber;
            sum += parseInt(lineNumber, 10);
        }
    });
    readInterface.on("close", function () {
        report("Solution 2:", sum);
    });
}

function getNumber(result) {
    if (result.match(/\d+/g)) {
        return result.toString();
    } else {
        const mapping = {
            "one": "1",
            "two": "2",
            "three": "3",
            "four": "4",
            "five": "5",
            "six": "6",
            "seven": "7",
            "eight": "8",
            "nine": "9"
        };
        return mapping[result];
    }
}

run();