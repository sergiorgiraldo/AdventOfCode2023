const lib = require("../solutions/lib/day16");

test("EnergizedTilesFromTopLeft", () => {
	let lines = [];
	lines.push(".|...\\....");
	lines.push("|.-.\\.....");
	lines.push(".....|-...");
	lines.push("........|.");
	lines.push("..........");
	lines.push(".........\\");
	lines.push("..../.\\\\..");
	lines.push(".-.-/..|..");
	lines.push(".|....-|.\\");
	lines.push("..//.|....");

	expect(lib.countEnergizedTilesFromTopLeft(lines)).toBe(46);
});

test("EnergizedTilesFromAnywhere", () => {
	let lines = [];
	lines.push(".|...\\....");
	lines.push("|.-.\\.....");
	lines.push(".....|-...");
	lines.push("........|.");
	lines.push("..........");
	lines.push(".........\\");
	lines.push("..../.\\\\..");
	lines.push(".-.-/..|..");
	lines.push(".|....-|.\\");
	lines.push("..//.|....");

	expect(lib.countEnergizedTilesFromAnywhere(lines)).toBe(51);
});
