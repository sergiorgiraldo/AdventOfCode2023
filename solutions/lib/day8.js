function getNumberOfSteps(lines) {
	const instructions = lines[0];
	const map = buildMap(lines);
	return calculateSteps(map, instructions, "AAA", /ZZZ/);
}

function getNumberOfGhostSteps(lines) {
	const instructions = lines[0];
	const map = buildMap(lines);
	const startingPoints = Object.keys(map).filter((key) => key.endsWith("A"));

	let stepsPerStartingPoint = [];

	for (const startingPoint of startingPoints) {
		const steps = calculateSteps(map, instructions, startingPoint, /Z/);
		stepsPerStartingPoint.push(steps);
	}

    //find the least common multiple of all the steps
	const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const lcm = (x, y) => (x * y) / gcd(x, y);
	const stepsTotal = stepsPerStartingPoint.reduce((a, b) => lcm(a, b));

	return stepsTotal;
}

function buildMap(lines) {
	let map = {};

	for (let i = 1; i < lines.length; i++) {
		if (lines[i].length == 0) {
			continue;
		}
		const [key, value] = lines[i].split(" = ");
		let positions = [];
		positions[0] = value.split(", ")[0].replace("(", "");
		positions[1] = value.split(", ")[1].replace(")", "");
		map[key] = positions;
	}

	return map;
}

function calculateSteps(map, instructions, currentState, endStateRegex) {
	let steps = 0;
	let found = false;
	while (!found) {
		for (const instruction of instructions) {
			currentState = map[currentState][instruction == "L" ? 0 : 1];
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
