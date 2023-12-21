const helpers = require("./helpers.js");

function getPositionsAfterWalking(lines, steps) {
	const map = buildMap(lines);

	const result = walkTheMap(map, steps);

	return result;
}

function getPositionsInInfiniteMap(lines) {
	const map = buildMap(lines);

	const values = [walkTheMap(map, 65), walkTheMap(map, 65 + 131), walkTheMap(map, 65 + 131 * 2)];

	const polynomial = helpers.math.simplifiedLagrange(values);
	
	const target = (26_501_365 - 65) / 131;
	return polynomial.a * target * target + polynomial.b * target + polynomial.c;
}

function debug(map) {
	//lets try to find a relation with the map length to get the cycle
	//26501365 = 202_300 * 131 + 65
	//i will calculate positions for 65, 65+131, 65+131*2, 65+131*3, *4, *5, see if there is some pattern
	console.log("65", walkTheMap(map, 65)); //3832
	console.log("65+131", walkTheMap(map, 65 + 131)); //7457
	console.log("65+131*2", walkTheMap(map, 65 + 131 * 2)); //7520
	console.log("65+131*3", walkTheMap(map, 65 + 131 * 3)); //7457
	console.log("65+131*4", walkTheMap(map, 65 + 131 * 4)); //7520
	console.log("65+131*5", walkTheMap(map, 65 + 131 * 5)); //7457
	console.log("65+131*6", walkTheMap(map, 65 + 131 * 6)); //7520 and this pattern, 7457/7520 repeats forever
	//WRONG, i thought i could get the multiple from 131 and it was not correct
	//after pulling my hair off, i figured it out: I am iterating only over the original map,
	//not over the infinite map
}

function debug2(map) {
	const repeatedArr = [];

	// replicate the array vertically
	for (let i = 0; i < 3; i++) {
		repeatedArr.push(...map);
	}

	// replicate the array horizontally
	for (let i = 0; i < repeatedArr.length; i++) {
		repeatedArr[i] = repeatedArr[i]
			.concat(...repeatedArr[i].slice())
			.concat(...repeatedArr[i].slice());
	}

	// replace "S" with "X" in the replicated array
	for (let i = 0; i < repeatedArr.length; i++) {
		for (let j = 0; j < repeatedArr[i].length; j++) {
			if (repeatedArr[i][j] === "S") {
				repeatedArr[i][j] = ".";
			}
		}
	}

	const centerI = Math.floor(repeatedArr.length / 2);
	const centerJ = Math.floor(repeatedArr[0].length / 2);
	repeatedArr[centerI][centerJ] = "S";

	console.log("65", walkTheMap(repeatedArr, 65)); //3832
	console.log("65+131", walkTheMap(repeatedArr, 65 + 131)); //33967
	console.log("65+131*2", walkTheMap(repeatedArr, 65 + 131 * 2)); //63740
	console.log("65+131*3", walkTheMap(repeatedArr, 65 + 131 * 3)); //67365
	console.log("65+131*4", walkTheMap(repeatedArr, 65 + 131 * 4)); //67428
	//plotted and this give a quadratic feeling
}

function buildMap(lines) {
	const map = lines.map((line) => line.split(""));

	return map;
}

function getCoordinates(i, j){
	return `${i},${j}`;
};

function parse(map){
	const walls = {};
	const plots = {};
	let start = { i: 0, j: 0 };
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			const value = map[i][j];
			if (value == "#") {
				walls[getCoordinates(i, j)] = true;
			}
			if (value == "S") {
				plots[getCoordinates(i, j)] = -1;
				start = { i: i, j: j };
			}
		}
	}
	return {
		walls: walls,
		plots: plots,
		start: start,
		size: map.length
	};
};

function wrapped (i, j, size){
	i %= size;
	j %= size;
	return {
		wi: i >= 0 ? i : size + i,
		wj: j >= 0 ? j : size + j
	};
};

function getNextSteps(grid, i, j, remaining) {
	const coords = getCoordinates(i, j);
	const { wi, wj } = wrapped(i, j, grid.size);
	const wk = getCoordinates(wi, wj);

	if (grid.walls[wk] || grid.plots[coords] >= remaining) {
		return [];
	}
	grid.plots[coords] = remaining;

	if (remaining > 0) {
		return [
			{ i: i + 1, j: j, remaining: remaining - 1 },
			{ i: i - 1, j: j, remaining: remaining - 1 },
			{ i: i, j: j + 1, remaining: remaining - 1 },
			{ i: i, j: j - 1, remaining: remaining - 1 }
		];
	}
	return [];
};

function walkTheMap (map, steps = 64){
	const grid = parse(map);
	const queue = [
		{
			i: grid.start.i,
			j: grid.start.j,
			remaining: steps
		}
	];
	while (queue.length > 0) {
		const step = queue.shift();
		queue.push(...getNextSteps(grid, step.i, step.j, step.remaining));
	}
	return Object.values(grid.plots).filter((e) => e % 2 == 0).length;
};

module.exports = { getPositionsAfterWalking, getPositionsInInfiniteMap };
