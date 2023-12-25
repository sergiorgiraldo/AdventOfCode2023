const lib = require("../solutions/lib/day25");

test("Disconnect3Wires", () => {
	let lines = [];
	lines.push("jqt: rhn xhk nvd");
	lines.push("rsh: frs pzl lsr");
	lines.push("xhk: hfx");
	lines.push("cmg: qnr nvd lhk bvb");
	lines.push("rhn: xhk bvb hfx");
	lines.push("bvb: xhk hfx");
	lines.push("pzl: lsr hfx nvd");
	lines.push("qnr: nvd");
	lines.push("ntq: jqt hfx bvb xhk");
	lines.push("nvd: lhk");
	lines.push("lsr: lhk");
	lines.push("rzs: qnr cmg lsr rsh");
	lines.push("frs: qnr lhk lsr");
	expect(lib.getGroupsAfter3WiresDisconnected(lines)).toBe(54);
});
