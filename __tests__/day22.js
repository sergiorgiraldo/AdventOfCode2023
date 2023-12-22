const lib = require("../solutions/lib/day22");

test("DisintegrateBricks", () => {
	let lines = [];
	lines.push("1,0,1~1,2,1");
	lines.push("0,0,2~2,0,2");
	lines.push("0,2,3~2,2,3");
	lines.push("0,0,4~0,2,4");
	lines.push("2,0,5~2,2,5");
	lines.push("0,1,6~2,1,6");
	lines.push("1,1,8~1,1,9");

	expect(lib.disintegrateBricks(lines)).toBe(5);
});

test("DisintegratePotentialBricks", () => {
	let lines = [];
	lines.push("1,0,1~1,2,1");
	lines.push("0,0,2~2,0,2");
	lines.push("0,2,3~2,2,3");
	lines.push("0,0,4~0,2,4");
	lines.push("2,0,5~2,2,5");
	lines.push("0,1,6~2,1,6");
	lines.push("1,1,8~1,1,9");

	expect(lib.disintegratePotentialBricks(lines)).toBe(7);
});
