function findReflections(lines) {
	const patterns = buildPatterns(lines);

	const total = getTotalOfReflections(patterns, isMirrored);

	return total;
}

function fixSmudges(lines) {
	const patterns = buildPatterns(lines);

	const total = getTotalOfReflections(patterns, isMirroredWithSmudges);

	return total;
}

function getTotalOfReflections(patterns, method) {
	let total = 0;

	for (const pattern of patterns) {
		let found = false;
		for (let i = 1; i < pattern.length; i++) {
			if (found) break;

			const result = checkMirrored(pattern, i, method, 100);
			found = result.found;
			total += result.increment;
		}
		if (!found) {
			// finding vertical reflection is the same as finding horizontal on the transposed pattern
			const transposed = transpose(pattern);
			for (let i = 1; i < transposed.length; i++) {
				if (found) break;

				const result = checkMirrored(transposed, i, method, 1);
				found = result.found;
				total += result.increment;
			}
		}
	}

	return total;
}

function buildPatterns(lines) {
	let patterns = [];
	patterns.push([]);

	for (let i = 0; i < lines.length; i++) {
		if (lines[i] === "") {
			patterns.push([]);
		} else {
			patterns[patterns.length - 1].push(lines[i]);
		}
	}
	return patterns;
}

function checkMirrored(pattern, row, method, factor) {
	if (method(pattern, row)) {
		return { found: true, increment: factor * row };
	} else {
		return { found: false, increment: 0 };
	}
}

function isMirrored(pattern, row) {
	for (
		let goingUp = row - 1, goingBottom = row;
		goingUp >= 0 && goingBottom < pattern.length;
		goingUp--, goingBottom++
	) {
		if (pattern[goingUp] !== pattern[goingBottom]) return false;
	}
	return true;
}

function isMirroredWithSmudges(pattern, row) {
	let smudgeFound = false;
	for (
		let goingUp = row - 1, goingBottom = row;
		goingUp >= 0 && goingBottom < pattern.length;
		goingUp--, goingBottom++
	) {
		const patternA = pattern[goingUp];
		const patternB = pattern[goingBottom];

		if (patternA !== patternB) {
			for (let i = 0; i < patternA.length; i++) {
				if (patternA[i] !== patternB[i]) {
					// we must have only one smudge to have a reflection
					if (smudgeFound) return false;
					smudgeFound = true;
				}
			}
		}
	}
	return smudgeFound;
}

function transpose(pattern) {
	const transposed = Array(pattern[0].length).fill("");

	for (const row of pattern) {
		[...row].forEach((rowValue, index) => (transposed[index] += rowValue));
	}

	return transposed;
}

module.exports = { findReflections, fixSmudges };
