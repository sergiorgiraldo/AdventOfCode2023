
const lib = require('../solutions/lib/day20');

test("emit1000Pulses-1", () => {
	let lines = [];
	lines.push("broadcaster -> a, b, c");
	lines.push("%a -> b");
	lines.push("%b -> c");
	lines.push("%c -> inv");
	lines.push("&inv -> a");
	expect(lib.emit1000Pulses(lines)).toBe(32000000);
});

test("emit1000Pulses-2", () => {
	let lines = [];
	lines.push("broadcaster -> a");
	lines.push("%a -> inv, con");
	lines.push("&inv -> b");
	lines.push("%b -> con");
	lines.push("&con -> output");
	expect(lib.emit1000Pulses(lines)).toBe(11687500);
});