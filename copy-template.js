const path = require("path");
const open = require("open");
const { make, position, find, read, write, run } = require("promise-path");
const fromHere = position(__dirname);
const report = (...messages) =>
	console.log(
		`[${require(fromHere("./package.json")).logName} / ${__filename
			.split(path.sep)
			.pop()
			.split(".js")
			.shift()}]`,
		...messages
	);
const fs = require("fs");

async function fetchAOCDInput(currentYear, currentDay) {
	report(
		"Using AOCD to attempt to download your puzzle input, see: https://github.com/wimglenn/advent-of-code-data"
	);
	try {
		const { stdout, stderr } = await run(
			`aocd ${currentDay} ${currentYear}`
		);
		if (stderr) {
			report(`Could not fetch input for ${currentYear} / ${currentDay}`);
		}
		if (stdout) {
			report(`Downloaded using AOCD.`);
		}
		return stdout;
	} catch (ex) {
		report(`Could not fetch input for ${currentYear} / ${currentDay}`);
	}
	return "PASTE YOUR INPUT HERE";
}

async function copyTemplate() {
	const newFolderName = process.argv[2];
	const templateFolderPath = "solutions/template";
	const targetFolderPath = fromHere(`solutions/${newFolderName}`);

	if (!newFolderName) {
		return report(
			"No path specified to copy to.",
			"Please specify a folder name as an argument to this script.",
			"e.g. node copy-template day5"
		);
	}

	const existingFiles = await find(`${targetFolderPath}/*`);
	if (existingFiles.length > 0) {
		report("Existing files found:");
		console.log(existingFiles.map((n) => "  " + n).join("\n"));
		return report("Path", newFolderName, "already exists, doing nothing.");
	}

	report(
		"Creating:",
		`solutions/${newFolderName}`,
		"from template",
		templateFolderPath
	);

	const templateFiles = await find(fromHere(`${templateFolderPath}/*`));
	await make(fromHere(`solutions/${newFolderName}`));
	await Promise.all(
		templateFiles.map(async (filepath) => {
			const contents = await read(filepath);
			const filename = path.parse(filepath).base;
			const newFilePath = `solutions/${newFolderName}/${filename}`;
			report("Creating:", newFilePath);
			return write(fromHere(newFilePath), contents);
		})
	);

	const testPath = fromHere(`__tests__/${newFolderName}.js`);
	report("Creating:", testPath);
	write(
		testPath,
`
const lib = require('../solutions/lib/${newFolderName}');

test("SolveFirstStar", () => {
	let lines = [];

	expect(lib.solveForFirstStar(lines)).toBe(-1);
});

test("SolveSecondStar", () => {
	let lines = [];
	
	expect(lib.solveForSecondStar(lines)).toBe(-2);
});
`
	);

	const answerPath = fromHere(`solutions/${newFolderName}/answer.txt`);
	report("Creating:", answerPath);
	write(answerPath, "TODO");

	const libsPath = fromHere(`solutions/lib/${newFolderName}.js`);
	report("Creating:", libsPath);
	write(
		libsPath,
`
const helpers = require("./helpers");

function solveForFirstStar(lines){
	return 0;
}

function solveForSecondStar(lines){
	return 0;
}

module.exports = { solveForFirstStar, solveForSecondStar };
`
	);

	const solutionsJsPath = fromHere(`solutions/${newFolderName}/solution.js`);
	fs.readFile(solutionsJsPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const updatedData = data.replace(
			/TODO/g,
			Number.parseInt(newFolderName.replace("day", "")).toString()
		);

		fs.writeFile(solutionsJsPath, updatedData, "utf8", (err) => {
			if (err) {
				throw err;
			}

			report("Adjusting:", solutionsJsPath);
		});
	});

	const viewerPath = fromHere(`solutions/${newFolderName}/viewer.html`);
	fs.readFile(viewerPath, "utf8", (err, data) => {
		if (err) {
			throw err;
		}

		const updatedData = data.replace(
			/TODO/g,
			Number.parseInt(newFolderName.replace("day", "")).toString()
		);

		fs.writeFile(viewerPath, updatedData, "utf8", (err) => {
			if (err) {
				throw err;
			}

			report("Adjusting:", viewerPath);
		});
	});

	report("Attemping to download puzzle input for this date");

	const currentPath = fromHere("/");
	const currentFolder = currentPath.split("/").reverse()[1];
	const currentYear = currentFolder.slice(-4);
	const currentDay = Number.parseInt(newFolderName.replace("day", ""));

	report(
		`Based on the path, ${currentFolder} I think its: ${currentYear}, and you're trying to solve: Day ${currentDay}`
	);

	if (currentYear > 0 && currentDay > 0) {
		report(`Potentially valid year (${currentYear}) / day (${currentDay})`);
		const aocInputText = await fetchAOCDInput(currentYear, currentDay);
		await write(
			fromHere(`solutions/${newFolderName}/input.txt`),
			aocInputText,
			"utf8"
		);
	} else {
		report(`Invalid year (${currentYear}) / day (${currentDay})`);
	}
	report("Opening puzzle of the day");
	report("Done.");
	
	open(`https://adventofcode.com/${currentYear}/day/${currentDay}`);
}

module.exports = copyTemplate();
