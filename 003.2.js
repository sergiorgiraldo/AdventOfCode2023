const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
	input: fs.createReadStream("002.txt")
});
let result=0;
readInterface.on("line", function (line) {
    let maxRed = 1;
    let maxGreen = 1;
    let maxBlue = 1;
    let power = 1;
    const parts = line.split(":");
    const id = parts[0].split(" ")[1];
    const picks = parts[1].trim().split(";");
    for (let i = 0; i < picks.length; i++) {
        const outcomes = picks[i].trim().split(",");
        for (let j = 0; j < outcomes.length; j++) {
            const number = outcomes[j].trim().split(" ")[0];
            const color = outcomes[j].trim().split(" ")[1];
            if (color == "red" && number > maxRed) {
                maxRed = parseInt(number, 10);
            }
            if (color == "green" && number > maxGreen) {
                maxGreen = parseInt(number, 10);
            }
            if (color == "blue" && number > maxBlue) {
                maxBlue = parseInt(number, 10);
            }
        }
    }
    power = maxRed * maxGreen * maxBlue;
    result += power;
});
readInterface.on("close", function () {
	console.log(`${result}`);
});
//84911