const lib002 = require("../lib/002");
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
	input: fs.createReadStream("002.txt")
});
let result=0;
readInterface.on("line", function (line) {
    const power = lib002.getPower(line);
    result += power;
});
readInterface.on("close", function () {
	console.log(`${result}`);
});
//84911