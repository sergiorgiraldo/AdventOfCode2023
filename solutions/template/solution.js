const path = require("path");
const { position } = require("promise-path");
const fs = require("fs");
const fromHere = position(__dirname);

fs.unlinkSync(path.join(__dirname, "answer.txt"));
let streamAnswer = fs.createWriteStream(path.join(__dirname, "answer.txt"), {
	flags: "a"
});
const report = (...messages) => {
	streamAnswer.write(JSON.stringify(messages) + "\n");
	console.log(
		`[${require(fromHere("../../package.json")).logName} / ${__dirname
			.split(path.sep)
			.pop()}]`,
		...messages
	);
};
const lib = require("../lib/dayTODO");

 function run() {
	const filePath = path.join(__dirname, "input.txt");
	const lines = fs.readFileSync(filePath).toString().split("\n").slice(0, -1);

	 solveForFirstStar(lines);
	 solveForSecondStar(lines);
}

 function solveForFirstStar(lines) {
	const start = Date.now();

	let result =  lib.solveForFirstStar(lines);

	const end = Date.now();

	report("Solution 1:", result, ` Execution time: ${end - start} ms`);
}

 function solveForSecondStar(lines) {
	const start = Date.now();

	let result =  lib.solveForSecondStar(lines);

	const end = Date.now();

	report("Solution 2:", result, ` Execution time: ${end - start} ms`);
}

run();
