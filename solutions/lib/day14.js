function getLoadAfterTilt(lines) {
	let lever = buildLever(lines);

	tiltNorth(lever);

	const total = getTotal(lever);

	return total;
}

function getLoadAfterCycles(lines) {
	const ITERATIONS = 1_000_000_000;
	let lever = buildLever(lines);

	let cache = [];
	let finalLoopItem;
	let firstLoopItem;
	let found;

	finalLoopItem = 0;
	firstLoopItem = 0;
	found = false;

	while (true) {
		const hash = getHash(lever);

		//lets find a cycle to reduce the number of iterations
		//for this, we need to find at least 3 equal hashes, then we know that we can calculate the cycle frequency
		//by the difference between the first and the last equal hashes positions in the loop
		if (cache.includes(hash)) {
			if (cache[hash] === 2) {
				//third appearance
				break;
			}
			cache[hash] += 1;

			if (!found) {
				firstLoopItem = finalLoopItem;
				found = true;
			}
		} else {
			cache.push(hash);
			cache[hash] = 1; //first apearence of this hash
		}
		cycleLever(lever);
		finalLoopItem += 1;
	}

	/*
	discard the first portion before the loop starts and 
	get the remainder from the division of the remaining cycles by the loop size
	*/
	const remainingCycles =
		(ITERATIONS - firstLoopItem) % (finalLoopItem - firstLoopItem);

	for (finalLoopItem = 0; finalLoopItem < remainingCycles; finalLoopItem++)
		cycleLever(lever);

	return getTotal(lever);
}

function cycleLever(lever) {
	tiltNorth(lever);
	tiltWest(lever);
	tiltSouth(lever);
	titlEast(lever);

	return lever;
}

//go from top to bottom, once find a cube rock, set the empty position one row below it
//once find a round rock, move it to the empty position and replace with a space

//if tilting north, we move up
function tiltNorth(lever) {
	for (let i = 0; i < lever[0].length; i++) {
		let N = 0;
		for (let j = 0; j < lever.length; j++) {
			if (lever[j][i] === "#") N = j + 1;
			if (lever[j][i] === "O")
				(lever[j][i] = "."), (lever[N][i] = "O"), N++;
		}
	}
	return lever;
}

//if tilting west, we move left
function tiltWest(lever) {
	for (let i = 0; i < lever.length; i++) {
		let W = 0;
		for (let j = 0; j < lever[i].length; j++) {
			if (lever[i][j] === "#") W = j + 1;
			if (lever[i][j] === "O")
				(lever[i][j] = "."), (lever[i][W] = "O"), W++;
		}
	}
	return lever;
}

//if tilting south, we move bottom
function tiltSouth(lever) {
	for (let i = 0; i < lever[0].length; i++) {
		let S = lever.length - 1;
		for (let j = lever.length - 1; j >= 0; j--) {
			if (lever[j][i] === "#") S = j - 1;
			if (lever[j][i] === "O")
				(lever[j][i] = "."), (lever[S][i] = "O"), S--;
		}
	}
	return lever;
}

//if tilting east, we move right
function titlEast(lever) {
	for (let i = 0; i < lever.length; i++) {
		let E = lever[i].length - 1;
		for (let j = lever[i].length - 1; j >= 0; j--) {
			if (lever[i][j] === "#") E = j - 1;
			if (lever[i][j] === "O")
				(lever[i][j] = "."), (lever[i][E] = "O"), E--;
		}
	}
	return lever;
}

function getHash(lever) {
	return lever
		.map((l) => l.join(""))
		.join("");
}

function buildLever(lines) {
	let lever = lines.map((line) => line.split(""));

	return lever;
}

function getTotal(lever) {
	const total = lever.reduce((acc, row, i) => {
		let numberOfRoundRocks = row.reduce(
			(rockCount, rock) => (rock === "O" ? rockCount + 1 : rockCount),
			0
		);
		return acc + numberOfRoundRocks * (lever.length - i);
	}, 0);

	return total;
}


module.exports = { getLoadAfterTilt, getLoadAfterCycles };
