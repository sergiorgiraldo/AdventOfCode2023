const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
	input: fs.createReadStream("TODO")
});
let result=0;
readInterface.on("line", function (line) {
    //TODO
});
readInterface.on("close", function () {
	console.log(`${result}`);
});