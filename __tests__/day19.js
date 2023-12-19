const lib = require("../solutions/lib/day19");

test("GetAcceptedParts", () => {
	let lines = [];
	lines.push("px{a<2006:qkq,m>2090:A,rfg}");
	lines.push("pv{a>1716:R,A}");
	lines.push("lnx{m>1548:A,A}");
	lines.push("rfg{s<537:gd,x>2440:R,A}");
	lines.push("qs{s>3448:A,lnx}");
	lines.push("qkq{x<1416:A,crn}");
	lines.push("crn{x>2662:A,R}");
	lines.push("in{s<1351:px,qqz}");
	lines.push("qqz{s>2770:qs,m<1801:hdj,R}");
	lines.push("gd{a>3333:R,R}");
	lines.push("hdj{m>838:A,pv}");
	lines.push("");
	lines.push("{x=787,m=2655,a=1222,s=2876}");
	lines.push("{x=1679,m=44,a=2067,s=496}");
	lines.push("{x=2036,m=264,a=79,s=2244}");
	lines.push("{x=2461,m=1339,a=466,s=291}");
	lines.push("{x=2127,m=1623,a=2188,s=1013}");
	expect(lib.getRatingsOfAccepted(lines)).toBe(19114);
});

test("GetCombinationsOfParts", () => {
	let lines = [];
	lines.push("px{a<2006:qkq,m>2090:A,rfg}");
	lines.push("pv{a>1716:R,A}");
	lines.push("lnx{m>1548:A,A}");
	lines.push("rfg{s<537:gd,x>2440:R,A}");
	lines.push("qs{s>3448:A,lnx}");
	lines.push("qkq{x<1416:A,crn}");
	lines.push("crn{x>2662:A,R}");
	lines.push("in{s<1351:px,qqz}");
	lines.push("qqz{s>2770:qs,m<1801:hdj,R}");
	lines.push("gd{a>3333:R,R}");
	lines.push("hdj{m>838:A,pv}");
	lines.push("");
	lines.push("{x=787,m=2655,a=1222,s=2876}");
	lines.push("{x=1679,m=44,a=2067,s=496}");
	lines.push("{x=2036,m=264,a=79,s=2244}");
	lines.push("{x=2461,m=1339,a=466,s=291}");
	lines.push("{x=2127,m=1623,a=2188,s=1013}");
	expect(lib.getCombinations(lines)).toBe(167409079868000);
});
