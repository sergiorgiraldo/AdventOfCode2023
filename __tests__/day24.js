
const lib = require('../solutions/lib/day24');

test("GetIntersections", () => {
	let lines = [];
	lines.push("19, 13, 30 @ -2,  1, -2");
	lines.push("18, 19, 22 @ -1, -1, -2");
	lines.push("20, 25, 34 @ -2, -2, -4");
	lines.push("12, 31, 28 @ -1, -2, -1");
	lines.push("20, 19, 15 @  1, -5, -3");
	expect(lib.getIntersections(lines,7, 27)).toBe(2);
});

test("ObliterateHailstones", async () => {
	let lines = [];
	lines.push("19, 13, 30 @ -2,  1, -2");
	lines.push("18, 19, 22 @ -1, -1, -2");
	lines.push("20, 25, 34 @ -2, -2, -4");
	lines.push("12, 31, 28 @ -1, -2, -1");
	lines.push("20, 19, 15 @  1, -5, -3");
	const actual = await lib.obliterateHailstonesWithRock(lines);
	expect(actual).toBe(47);
});
