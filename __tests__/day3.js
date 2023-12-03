const lib003 = require("../solutions/lib/003");

test("Sum of Parts", () => {
	const engine = [];
	engine.push("467..114..");
	engine.push("...*......");
	engine.push("..35..633.");
	engine.push("......#...");
	engine.push("617*......");
	engine.push(".....+.58.");
	engine.push("..592.....");
	engine.push("......755.");
	engine.push("...$.*....");
	engine.push(".664.598..");
	expect(lib003.getSumOfParts(engine)).toBe(4361);
});

test("Gear ratios", () => {
	const engine = [];
	engine.push("467..114..");
	engine.push("...*......");
	engine.push("..35..633.");
	engine.push("......#...");
	engine.push("617*......");
	engine.push(".....+.58.");
	engine.push("..592.....");
	engine.push("......755.");
	engine.push("...$.*....");
	engine.push(".664.598..");
	expect(lib003.getGearsRatio(engine)).toBe(467835);
});
