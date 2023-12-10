function getStepsToFarthest(lines) {
	let start = getStartingPoint(lines);

	// find firt step to initiate the traversal
	let startingStep = getStartingStep(lines, start.x, start.y);

	let x = startingStep.x;
	let y = startingStep.y;
	let direction = startingStep.direction;

	let steps = 1;

	while (x !== start.x || y !== start.y) {
		let delta = getDelta(lines, x, y, direction);
		x += delta.x;
		y += delta.y;
		direction = delta.direction;

		steps += 1;
	}

	return steps / 2;
}

function getTiles(lines) {
	let start = getStartingPoint(lines);

	// find firt step to initiate the traversal
	let startingStep = getStartingStep(lines, start.x, start.y);

	let x = startingStep.x;
	let y = startingStep.y;
	let direction = startingStep.direction;

	let isLoop = Array.from({ length: lines.length }, () => []);
	isLoop[start.y][start.x] = true;
	isLoop[y][x] = true;

	while (x !== start.x || y !== start.y) {
		let delta = getDelta(lines, x, y, direction);
		x += delta.x;
		y += delta.y;
		direction = delta.direction;

		isLoop[y] = isLoop[y] || [];
		isLoop[y][x] = true;
	}

	let count = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
        let walls = 0;
		let pipe = "";
		
        for (let j = 0; j < line.length; j++) {
			if (isLoop[i][j]) {
				let current = lines[i][j];
				if (current === "|") {
					walls += 1;
				} else if (current !== "-") {
					if (pipe != "") {
						if (pipe === "L" && current === "7") { // L:└  7:┐ => └┐
							walls += 1;
						} else if (pipe === "F" && current === "J") { // F:┌  J:┘ => ┌┘
							walls += 1;
						}
						pipe = "";
					} else {
						pipe = current;
					}
				}
			} else if (walls % 2 === 1) {
				count += 1;
			}
		}
	}
	return count;
}

function getStartingPoint(lines) {
	const grid = lines.map((line) => line.split(""));

	const startingY = grid
		.map((line, index) => [line, index])
		.find(([line]) => line.includes("S"))[1];
	const startingX = grid[startingY].indexOf("S");

	return {
		x: startingX,
		y: startingY
	};
}

function getStartingStep(lines, x, y) {
	let direction = "";
	let newX = x;
	let newY = y;

	let bottomDirection = lines[y + 1][x];
	if (
		bottomDirection === "|" ||
		bottomDirection === "L" ||
		bottomDirection === "J"
	) {
		direction = "S";
		newY += 1;
	}
	if (!direction) {
		let topDirection = lines[y - 1][x];
		if (
			topDirection === "|" ||
			topDirection === "F" ||
			topDirection === "7"
		) {
			direction = "N";
			newY -= 1;
		}
	}
	//only possible direction is horizontal , picked W
	if (!direction) {
		direction = "W";
		newX += 1;
	}

	return {
		x: newX,
		y: newY,
		direction: direction
	};
}

function getDelta(lines, x, y, direction) {
	let deltaX = 0;
	let deltaY = 0;
	let newDirection = "";

	switch (lines[y][x] + direction) {
		case "|S":
			deltaY = 1;
			break;
		case "|N":
			deltaY = -1;
			break;
		case "-E":
			deltaX = 1;
			break;
		case "-W":
			deltaX = -1;
			break;
		case "LS":
			deltaX = 1;
			break;
		case "LW":
			deltaY = -1;
			break;
		case "JS":
			deltaX = -1;
			break;
		case "JE":
			deltaY = -1;
			break;
		case "7N":
			deltaX = -1;
			break;
		case "7E":
			deltaY = 1;
			break;
		case "FN":
			deltaX = 1;
			break;
		case "FW":
			deltaY = 1;
			break;
		default:
			throw new Error("Invalid direction");
	}
	if (deltaY === 1) {
		newDirection = "S";
	} else if (deltaY === -1) {
		newDirection = "N";
	} else if (deltaX === -1) {
		newDirection = "W";
	} else {
		newDirection = "E";
	}
	return {
		x: deltaX,
		y: deltaY,
		direction: newDirection
	};
}

module.exports = { getStepsToFarthest, getTiles };
