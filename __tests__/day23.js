const lib = require("../solutions/lib/day23");

test("GetLongestHike", () => {
	let lines = [];
	lines.push("#.#####################");
	lines.push("#.......#########...###");
	lines.push("#######.#########.#.###");
	lines.push("###.....#.>.>.###.#.###");
	lines.push("###v#####.#v#.###.#.###");
	lines.push("###.>...#.#.#.....#...#");
	lines.push("###v###.#.#.#########.#");
	lines.push("###...#.#.#.......#...#");
	lines.push("#####.#.#.#######.#.###");
	lines.push("#.....#.#.#.......#...#");
	lines.push("#.#####.#.#.#########v#");
	lines.push("#.#...#...#...###...>.#");
	lines.push("#.#.#v#######v###.###v#");
	lines.push("#...#.>.#...>.>.#.###.#");
	lines.push("#####v#.#.###v#.#.###.#");
	lines.push("#.....#...#...#.#.#...#");
	lines.push("#.#########.###.#.#.###");
	lines.push("#...###...#...#...#.###");
	lines.push("###.###.#.###v#####v###");
	lines.push("#...#...#.#.>.>.#.>.###");
	lines.push("#.###.###.#.###.#.#v###");
	lines.push("#.....###...###...#...#");
	lines.push("#####################.#");

	expect(lib.takeHike(lines)).toBe(94);
});

test("GetLongestHikeInDryLand", () => {
	let lines = [];
	lines.push("#.#####################");
	lines.push("#.......#########...###");
	lines.push("#######.#########.#.###");
	lines.push("###.....#.>.>.###.#.###");
	lines.push("###v#####.#v#.###.#.###");
	lines.push("###.>...#.#.#.....#...#");
	lines.push("###v###.#.#.#########.#");
	lines.push("###...#.#.#.......#...#");
	lines.push("#####.#.#.#######.#.###");
	lines.push("#.....#.#.#.......#...#");
	lines.push("#.#####.#.#.#########v#");
	lines.push("#.#...#...#...###...>.#");
	lines.push("#.#.#v#######v###.###v#");
	lines.push("#...#.>.#...>.>.#.###.#");
	lines.push("#####v#.#.###v#.#.###.#");
	lines.push("#.....#...#...#.#.#...#");
	lines.push("#.#########.###.#.#.###");
	lines.push("#...###...#...#...#.###");
	lines.push("###.###.#.###v#####v###");
	lines.push("#...#...#.#.>.>.#.>.###");
	lines.push("#.###.###.#.###.#.#v###");
	lines.push("#.....###...###...#...#");
	lines.push("#####################.#");

	expect(lib.takeHikeInDryLand(lines)).toBe(154);
});