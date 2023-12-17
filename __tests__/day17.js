const lib = require("../solutions/lib/day17");

test("BestRoute", () => {
	let lines = [];
	lines.push("2413432311323");
	lines.push("3215453535623");
	lines.push("3255245654254");
	lines.push("3446585845452");
	lines.push("4546657867536");
	lines.push("1438598798454");
	lines.push("4457876987766");
	lines.push("3637877979653");
	lines.push("4654967986887");
	lines.push("4564679986453");
	lines.push("1224686865563");
	lines.push("2546548887735");
	lines.push("4322674655533");
	expect(lib.getBestRoute(lines)).toBe(102);
});

test("BestRouteWithUltra-1", () => {
	let lines = [];
	lines.push("2413432311323");
	lines.push("3215453535623");
	lines.push("3255245654254");
	lines.push("3446585845452");
	lines.push("4546657867536");
	lines.push("1438598798454");
	lines.push("4457876987766");
	lines.push("3637877979653");
	lines.push("4654967986887");
	lines.push("4564679986453");
	lines.push("1224686865563");
	lines.push("2546548887735");
	lines.push("4322674655533");
	expect(lib.getBestRouteWithUltraCrucibles(lines)).toBe(94);
});

test("BestRouteWithUltra-2", () => {
	let lines = [];
	lines.push("111111111111");
	lines.push("999999999991");
	lines.push("999999999991");
	lines.push("999999999991");
	lines.push("999999999991");
	expect(lib.getBestRouteWithUltraCrucibles(lines)).toBe(71);
});
