const helpers = require("./helpers");

function getBrokenSprings(lines) {
	const field = getField(lines);

	let possibilities = 0;
	for (let i = 0; i < field.length; i++) {
		const combinations = generateCombinations(field[i].springs);

		let possibility = 0;
		for (let j = 0; j < combinations.length; j++) {
			const condition = getCondition(combinations[j]);

			if (condition === field[i].conditions) {
				possibility += 1;
			}
		}
		possibilities += possibility;
	}

	return possibilities;
}

function getBrokenSpringsUnfolded(lines) {
    const field_ = getField(lines);

    const field = field_.map(item => {
        const springs = (item.springs + "?").repeat(5).slice(0, -1);
        const conditions = (item.conditions + ",").repeat(5).slice(0, -1);

        return {springs, conditions};
      });

	let possibilities = 0;
	for (let i = 0; i < field.length; i++) {
        const conditions = field[i].conditions.split(",").map(Number);

        const possibility = checkConditionsPerLine(field[i].springs, conditions);
        
        possibilities += possibility;
	}

	return possibilities;
}

function getField(lines) {
    const field = lines.map((line) => {
		const [springs, conditions] = line.split(" ");
		return { springs, conditions };
	});

    return field;
}

function getCondition(line) {
	const regex = /#+/g;
	const matches = line.match(regex);
    if (matches === null) {
        return "";
    }
    else{
	    const lengths = matches.map((match) => match.length);
	    return lengths.join(",");
    }
}

//good enough for part 1, throws out-of-memory error for part 2 :(
function generateCombinations(springs) {
    let combinations = [];

    recurse(springs);

	return combinations;

    function recurse(springs) {
		const hasQuestioMark = springs.indexOf("?") >= 0;

		if (hasQuestioMark) {
			const dotString = springs.substring(0, index) + "." + springs.substring(index + 1);
			recurse(dotString);
			
			const hashString = springs.substring(0, index) + "#" + springs.substring(index + 1);
			recurse(hashString);
		} 
		else {
			combinations.push(springs);
		}
	}
}

/* 
for part2, I gave up on generating all combinations 
instead I parsed the springs and checked them against the conditions
*/
const checkConditionsPerLine = helpers.memoize(function (line, conditions) {
	//line is empty
    if (line.length === 0) {
        // if conditions are empty too, we have a match, otherwise no match        
        return ((conditions.length === 0)) ? 1 : 0; 
	}
	
    // conditions are empty
    if (conditions.length === 0) {
        //if line can contain only . or ?, we have a match, otherwise no match
        return (line.includes("#") ? 0 : 1);   
	}

	// line is not long enough for all conditions, we should have at least 1 . between conditions
    // e.g. ??? and conditions are 2,1
	if (line.length < conditions.reduce((acc, curr) => acc + curr, 0) + conditions.length - 1) {
		return 0;
	}

    // first item does not count for conditions, skip it
	if (line[0] === ".") {
		return checkConditionsPerLine(line.slice(1), conditions);
	}

	if (line[0] === "#") {
		const condition = conditions[0];
		for (let i = 1; i < condition; i++) {
            // lines does not have enough # or ? in beginning to cover condition
            // e.g. #.#  and condition is 3
			if (line[i] === ".") { 
				return 0;
			}
		}

        // line have more # in beginning than condition
        // e.g. #### and condition is 3
		if (line[condition] === "#") { 
			return 0;
		}
        // if we get to this point, we know for sure the current condition is covered
        // so we can remove it from conditions
        const remainingConditions = conditions.slice(1);
		return checkConditionsPerLine(line.slice(condition + 1), remainingConditions);
	}

	// line[0] starts with ?, substitute with . and # and add them together
	return (
		checkConditionsPerLine("#" + line.slice(1), conditions) +
		checkConditionsPerLine("." + line.slice(1), conditions)
	);
});

module.exports = { getBrokenSprings, getBrokenSpringsUnfolded };
