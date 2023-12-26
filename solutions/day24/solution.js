const path = require("path");
const fs = require("fs");
const { position } = require('promise-path')
const fromHere = position(__dirname)

fs.unlinkSync(path.join(__dirname, "answer.txt"));
var streamAnswer = fs.createWriteStream(path.join(__dirname, "answer.txt"), {
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
const lib = require("../lib/day24");
const { exit } = require("yargs");

async function run() {
	const filePath = path.join(__dirname, "input.txt");
	const lines = fs.readFileSync(filePath).toString().split("\n").slice(0, -1);
	
	await solveForFirstStar(lines);
	await solveForSecondStar(lines);

	exit(0); 
	//i cant for the name of god figure it out what is pending in my code,
	//everything runs to the end but the script never terminates,
	//it seems something in the z3 package, tried a simple script, see misc/z3.js
	//also hangs
}

function solveForFirstStar(lines) {
	const start = Date.now();

	const result = lib.getIntersections(lines, 200_000_000_000_000, 400_000_000_000_000);

	const end = Date.now();

	report("Solution 1:", result, ` Execution time: ${end - start} ms`);
}

async function solveForSecondStar(lines) {
	const start = Date.now();

	let result = await lib.obliterateHailstonesWithRock(lines);

	const end = Date.now();

	report("Solution 2:", result, ` Execution time: ${end - start} ms`);
}

run();
