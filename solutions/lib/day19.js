function getRatingsOfAccepted(lines) {
	function predicate(v1, operator, v2) {
		return operator === "<" ? v1 < v2 : v1 > v2;
	}

	const system = describeSystem(lines);
	let accepted = [];

	for (const part of system.catalog) {
		let workflowName = "in"; //start always with `in` workflow

		part.visited.push(workflowName);

		while (workflowName !== "R" && workflowName !== "A") {
			const workflow = system.workflows[workflowName];

			//test if any rule is matched or use default target
			workflowName =
				workflow.rules.find((rule) =>
					predicate(part[rule.attribute], rule.operator, rule.value)
				)?.target ?? workflow.defaultTarget;

			part.visited.push(workflowName);
		}

		if (workflowName === "A") {
			accepted.push(part);
		}
	}

	const totalFromAccepted = accepted.reduce(
		(acc, curr) => acc + curr.x + curr.m + curr.a + curr.s,
		0
	);

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
				.reduce((acc, val) => acc * val, 1)
		)
		.reduce((acc, val) => acc + val, 0);

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
				if (range[1] <= rule.value) { // entire batch satisfies
					checkRatingsInRange(batch, rule.target, accepted, workflows);

					return;
				} 
                else if (range[0] < rule.value) {  // part of batch satisfies
					const matchedPart = {...batch, [rule.attribute]: [range[0], rule.value]};

					checkRatingsInRange(matchedPart, rule.target, accepted, workflows);

					batch = {...batch, [rule.attribute]: [rule.value, range[1]]};
					continue;
				}
				break;

			case ">":
				if (range[0] > rule.value) { // entire batch satisfies
					checkRatingsInRange(batch, rule.target, accepted, workflows);

					return;
				} 
                else if (range[1] > rule.value + 1) { // part of batch satisfies
					const matchedPart = {...batch, [rule.attribute]: [rule.value + 1, range[1]]};

					checkRatingsInRange(matchedPart, rule.target, accepted, workflows);

					batch = {...batch, [rule.attribute]: [range[0], rule.value + 1]};
					continue;
				}
				break;
		}
	}

    checkRatingsInRange(batch, workflow.defaultTarget, accepted, workflows);

    return;
}

function describeSystem(lines) {
	const [specifications, parts] = parseRunbook(lines);
	const instructions = specifications.map((spec) => {
		//name is the first word in the specification
		const name = /^\w+/.exec(spec)[0];

		//rule is in this format
		//{attribute from the part}{operator}{value as number} followed by : and then {workflow or A or R}
		const ruleRegex = /([xmas])([<>])(\d+):(\w+)/g;
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

		//add visited to the part to track the workflow
		return [item].map((attributes) => ({ ...attributes, visited: [] }))[0];
	});

	const system = { catalog, workflows };

	return system;
}

function parseRunbook(lines) {
	let specifications = [];
	let parts = [];
	let emptyLineFound = false;

	for (let i = 0; i < lines.length; i++) {
		if (lines[i] === "") {
			emptyLineFound = true;
		} else {
			if (emptyLineFound) {
				parts.push(lines[i]);
			} else {
				specifications.push(lines[i]);
			}
		}
	}
	return [specifications, parts];
}

module.exports = { getRatingsOfAccepted, getCombinations };
