const lib002 = require("../lib/002");
const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
	input: fs.createReadStream("002.txt")
});

let result=0;

readInterface.on("line", function (line) {
    let res = lib002.isAllowed(line);
    if (res.allowed) result += parseInt(res.id, 10);
});

readInterface.on("close", function () {
	console.log(`${result}`);
});

//2006