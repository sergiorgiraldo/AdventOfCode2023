const helpers = require("./helpers.js");

function getRatingsOfAccepted(lines) {
	const system = describeSystem(lines);
	let accepted = [];

	for (const part of system.catalog) {
		let workflowName = "in"; //start always with `in` workflow

		while (!/R|A/.test(workflowName)) {
			const workflow = system.workflows[workflowName];

			//test if any rule is matched or use default target
			workflowName =
				workflow.rules.find((rule) =>
					helpers.math.predicate(part[rule.attribute], rule.operator,rule.value))?.target ?? 
					workflow.defaultTarget;
		}

		if (workflowName === "A") {
			accepted.push(part);
		}
	}

	const totalFromAccepted = accepted.reduce((acc, curr) => acc + curr.x + curr.m + curr.a + curr.s, 0);

	return totalFromAccepted;
}

function getCombinations(lines) {
	const system = describeSystem(lines);
	const ranges = { x: [1, 4001], m: [1, 4001], a: [1, 4001], s: [1, 4001] };

	let accepted = [];
	checkRatingsInRange(ranges, "in", accepted, system.workflows);

	const totalFromAccepted = accepted
		.map((batch) =>
			Object.keys(ranges)
				.map((attribute) => batch[attribute][1] - batch[attribute][0])
				.reduce((acc, curr) => acc * curr, 1)
		)
		.reduce((acc, curr) => acc + curr, 0);

	return totalFromAccepted;
}

function checkRatingsInRange(batch, workflowName, accepted, workflows) {
	if (workflowName === "R") return;

	if (workflowName === "A") {
		accepted.push(batch);
		return;
	}

	const workflow = workflows[workflowName];

	for (const rule of workflow.rules) {
		const range = batch[rule.attribute];

		switch (rule.operator) {
			case "<":
				if (range[1] <= rule.value) {
					// entire batch satisfies, go to next workflow
					checkRatingsInRange(
						batch,
						rule.target,
						accepted,
						workflows
					);

					return;
				} 
				else if (range[0] < rule.value) {
					// part of batch satisfies
					// make sure we have acceptable ranges in the new batch and continue with the rest of the rules
					// create two new batches using the rule value to split them
					// e.g. the rule is "< 1351" and the original range was [1, 4001]
					// then create a batch with range [1, 1351] and another with range [1351, 4001]

					const matchedPart = {
						...batch,
						[rule.attribute]: [range[0], rule.value]
					};
					checkRatingsInRange(
						matchedPart,
						rule.target,
						accepted,
						workflows
					);

					batch = {
						...batch,
						[rule.attribute]: [rule.value, range[1]]
					};
					continue;
				}
				break;

			case ">":
				if (range[0] > rule.value) {
					// entire batch satisfies, go to next workflow
					checkRatingsInRange(
						batch,
						rule.target,
						accepted,
						workflows
					);

					return;
				} 
				else if (range[1] > rule.value + 1) {
					// part of batch satisfies
					// make sure we have acceptable ranges in the new batch and continue with the rest of the rules
					// create two new batch using the rule value to split them
					// e.g. the rule is "> 1351" and the original range was [1, 4001]
					// then create a batch with range [1352, 4001] and another with range [1, 1352]

					const matchedPart = {
						...batch,
						[rule.attribute]: [rule.value + 1, range[1]]
					};

					checkRatingsInRange(
						matchedPart,
						rule.target,
						accepted,
						workflows
					);

					batch = {
						...batch,
						[rule.attribute]: [range[0], rule.value + 1]
					};
					continue;
				}
				break;
		}
	}

	//process the default target, it is not handled by the loop above
	checkRatingsInRange(batch, workflow.defaultTarget, accepted, workflows);

	return;
}

function describeSystem(lines) {
	const [specifications, parts] = parseRunbook(lines);
	const instructions = specifications.map((spec) => {
		//name is the first word in the specification
		const name = /^\w+/.exec(spec)[0];

		//rule is in this format
		//{attribute from the part, can be x or m or a or s}{operator, < or >}{value as number}
		//followed by : and then {workflow or A or R}
		const ruleRegex = /(x|m|a|s)(<|>)(\d+):(\w+)/g;
		const rules = [...spec.matchAll(ruleRegex)].map((rule) => ({
			attribute: rule[1],
			operator: rule[2],
			value: parseInt(rule[3], 10),
			target: rule[4]
		}));

		//default target is the last workflow in the specification and executed if no rule is matched
		const defaultTarget = /,(\w+)\}$/.exec(spec)[1];

		const workflow = { rules, defaultTarget };

		return [name, workflow];
	});

	const workflows = Object.fromEntries(instructions);

	const catalog = parts.map((part) => {
		const attributes = [...part.matchAll(/([xmas])=(\d+)/g)].map(
			(attribute) => [attribute[1], parseInt(attribute[2])]
		);

		const item = Object.fromEntries(attributes);

		return item;
	});

	const system = { catalog, workflows };

	return system;
}

function parseRunbook(lines) {
	let parts = [];
	let emptyLineFound = false;

	let specifications = lines
		.map((line) => {
			if (line === "") {
				emptyLineFound = true;
				return null;
			} else if (emptyLineFound) {
				parts.push(line);
				return null;
			} else {
				return line;
			}
		})
		.filter(Boolean);

	return [specifications, parts];
}

module.exports = { getRatingsOfAccepted, getCombinations };
