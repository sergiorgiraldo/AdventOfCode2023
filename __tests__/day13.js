const lib = require("../solutions/lib/day13");

test("GetReflections", () => {
	const lines = [];
	lines.push("#.##..##.");
	lines.push("..#.##.#.");
	lines.push("##......#");
	lines.push("##......#");
	lines.push("..#.##.#.");
	lines.push("..##..##.");
	lines.push("#.#.##.#.");
	lines.push("");
	lines.push("#...##..#");
	lines.push("#....#..#");
	lines.push("..##..###");
	lines.push("#####.##.");
	lines.push("#####.##.");
	lines.push("..##..###");
	lines.push("#....#..#");
	expect(lib.findReflections(lines)).toBe(405);
});

test("FixSmudges", () => {
	const lines = [];
	lines.push("#.##..##.");
	lines.push("..#.##.#.");
	lines.push("##......#");
	lines.push("##......#");
	lines.push("..#.##.#.");
	lines.push("..##..##.");
	lines.push("#.#.##.#.");
	lines.push("");
	lines.push("#...##..#");
	lines.push("#....#..#");
	lines.push("..##..###");
	lines.push("#####.##.");
	lines.push("#####.##.");
	lines.push("..##..###");
	lines.push("#....#..#");
	expect(lib.fixSmudges(lines)).toBe(400);
});
