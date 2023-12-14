
const lib = require('../solutions/lib/day14');

test("GetLoadInNorth", () => {
	let lines = [];
	lines.push("O....#....");
	lines.push("O.OO#....#");
	lines.push(".....##...");
	lines.push("OO.#O....O");
	lines.push(".O.....O#.");
	lines.push("O.#..O.#.#");
	lines.push("..O..#O..O");
	lines.push(".......O..");
	lines.push("#....###..");
	lines.push("#OO..#....");
	expect(lib.getLoadAfterTilt(lines)).toBe(136);
});

test("getLoadInCycles", () => {
	let lines = [];
	lines.push("O....#....");
	lines.push("O.OO#....#");
	lines.push(".....##...");
	lines.push("OO.#O....O");
	lines.push(".O.....O#.");
	lines.push("O.#..O.#.#");
	lines.push("..O..#O..O");
	lines.push(".......O..");
	lines.push("#....###..");
	lines.push("#OO..#....");
	expect(lib.getLoadAfterCycles(lines)).toBe(64);
});

