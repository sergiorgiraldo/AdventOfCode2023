
const lib = require('../solutions/lib/day15');

test("ComputeHash", () => {
	const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
	expect(lib.getSumOfHashes(input)).toBe(1320);
});

test("GetFocusingPower", () => {
	const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
	expect(lib.getFocusingPower(input)).toBe(145);
});
