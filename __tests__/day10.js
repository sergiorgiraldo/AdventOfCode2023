const lib = require('../solutions/lib/day10');

test("Pipe 1", () => {
	const lines = [];
	lines.push(".....");
	lines.push(".S-7.");
	lines.push(".|.|.");
	lines.push(".L-J.");
	lines.push(".....");

	expect(lib.getStepsToFarthest(lines)).toBe(4);
});


test("Pipe 2", () => {
	const lines = [];
	lines.push("..F7.");
	lines.push(".FJ|.");
	lines.push("SJ.L7");
	lines.push("|F--J");
	lines.push("LJ...");

	expect(lib.getStepsToFarthest(lines)).toBe(8);
});

test("Loop 1", () => {
	const lines = [];
	lines.push("...........");
	lines.push(".S-------7.");
	lines.push(".|F-----7|.");
	lines.push(".||.....||.");
	lines.push(".||.....||.");
	lines.push(".|L-7.F-J|.");
	lines.push(".|..|.|..|.");
	lines.push(".L--J.L--J.");
	lines.push("...........");

	expect(lib.getTiles(lines)).toBe(4);
});

test("Loop 2", () => {
	const lines = [];
	lines.push("...........");
	lines.push(".S-------7.");
	lines.push(".|F-----7|.");
	lines.push(".||OOOOO||.");
	lines.push(".||OOOOO||.");
	lines.push(".|L-7OF-J|.");
	lines.push(".|II|O|II|.");
	lines.push(".L--JOL--J.");
	lines.push(".....O.....");
	
	expect(lib.getTiles(lines)).toBe(4);
});

test("Loop 3", () => {
	const lines = [];
	lines.push("FF7FSF7F7F7F7F7F---7");
	lines.push("L|LJ||||||||||||F--J");
	lines.push("FL-7LJLJ||||||LJL-77");
	lines.push("F--JF--7||LJLJIF7FJ-");
	lines.push("L---JF-JLJIIIIFJLJJ7");
	lines.push("|F|F-JF---7IIIL7L|7|");
	lines.push("|FFJF7L7F-JF7IIL---7");
	lines.push("7-L-JL7||F7|L7F-7F7|");
	lines.push("L.L7LFJ|||||FJL7||LJ");
	lines.push("L7JLJL-JLJLJL--JLJ.L");

	expect(lib.getTiles(lines)).toBe(10);
});