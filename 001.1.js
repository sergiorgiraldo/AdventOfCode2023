const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
	input: fs.createReadStream("001.txt")
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
readInterface.on('close', function() {
    console.log(`${sum}`);
});

// 54644