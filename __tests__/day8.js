const lib = require("../solutions/lib/day8");

test("Path 1", () => {
	const lines = [];
	lines.push("RL");
	lines.push("");
	lines.push("AAA = (BBB, CCC)");
	lines.push("BBB = (DDD, EEE)");
	lines.push("CCC = (ZZZ, GGG)");
	lines.push("DDD = (DDD, DDD)");
	lines.push("EEE = (EEE, EEE)");
	lines.push("GGG = (GGG, GGG)");
	lines.push("ZZZ = (ZZZ, ZZZ)");

	expect(lib.getNumberOfSteps(lines)).toBe(2);
});

test("Path 2", () => {
	const lines = [];
	lines.push("LLR");
	lines.push("");
	lines.push("AAA = (BBB, BBB)");
	lines.push("BBB = (AAA, ZZZ)");
	lines.push("ZZZ = (ZZZ, ZZZ)");

	expect(lib.getNumberOfSteps(lines)).toBe(6);
});

test("Path Ghosts", () => {
	const lines = [];
	lines.push("LR");
	lines.push("");
	lines.push("11A = (11B, XXX)");
	lines.push("11B = (XXX, 11Z)");
	lines.push("11Z = (11B, XXX)");
	lines.push("22A = (22B, XXX)");
	lines.push("22B = (22C, 22C)");
	lines.push("22C = (22Z, 22Z)");
	lines.push("22Z = (22B, 22B)");
	lines.push("XXX = (XXX, XXX)");

	expect(lib.getNumberOfGhostSteps(lines)).toBe(6);
});