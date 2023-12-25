const path = require("path");
const { position } = require("promise-path");
const readline = require("readline");
const fs = require("fs");
const fromHere = position(__dirname);
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

function run() {
	solveForFirstStar();
	solveForSecondStar();
}

function solveForFirstStar() {
	const start = Date.now();
	const filePath = path.join(__dirname, "input.txt");
	const readInterface = readline.createInterface({
		input: fs.createReadStream(filePath)
	});

	let lines = [];

	readInterface.on("line", function (line) {
		lines.push(line);
	});

	readInterface.on("close", function () {
		const result = lib.getIntersections(
			lines,
			200_000_000_000_000,
			400_000_000_000_000
		);
		const end = Date.now();
		report("Solution 1:", result, ` Execution time: ${end - start} ms`);
	});
}

function solveForSecondStar() {
	const start = Date.now();
	const filePath = path.join(__dirname, "input.txt");
	const readInterface = readline.createInterface({
		input: fs.createReadStream(filePath)
	});

	let lines = [];

	readInterface.on("line", function (line) {
		lines.push(line);
	});

	readInterface.on("close", async function () {
		let result;
		await lib.obliterateHailstonesWithRock(lines).then((v)=>result = v);
		const end = Date.now();
		report("Solution 2:", result, ` Execution time: ${end - start} ms`);
	});
}

run();
