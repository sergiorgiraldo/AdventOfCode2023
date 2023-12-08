const helpers = require("./helpers");

function getNumberOfSteps(lines) {
	const instructions = lines[0];
	const map = buildMap(lines);
	
	return calculateSteps(map, instructions, "AAA", /ZZZ/);
}

function getNumberOfGhostSteps(lines) {
	const instructions = lines[0];
	const map = buildMap(lines);

	const startingPoints = Object.keys(map).filter((location) => location.endsWith("A"));

	const steps = startingPoints.map((pt) =>  calculateSteps(map, instructions, pt, /Z/));

	const stepsTotal = steps.reduce((a, b) => helpers.lcm(a, b));

	return stepsTotal;
}

function buildMap(lines) {
	const lineRegex = /(\w+) = \((\w+), (\w+)\)/;

	let map = {};

	for (let i = 1; i < lines.length; i++) {
		if (lines[i].length == 0) {
			continue;
		}

		const [, location, leftDirection, rightDirection] = lines[i].match(lineRegex);

		map[location] = {
			left: leftDirection,
			right: rightDirection
		};
	}

	return map;
}

function calculateSteps(map, instructions, currentState, endStateRegex) {
	let steps = 0;
	let found = false;

	while (!found) {
		for (const instruction of instructions) {
			currentState = (instruction == "L") ? map[currentState].left : map[currentState].right;

			steps++;
			
			if (endStateRegex.test(currentState)) {
				found = true;
				break;
			}
		}
	}
	return steps;
}

module.exports = { getNumberOfSteps, getNumberOfGhostSteps };
