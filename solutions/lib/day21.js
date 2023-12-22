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
	//what happened is that my original algorithm was checking for out-of-bounds and ofc this does not occur in 
	//a infinite map. I then rewrote and the logs above, when plotted, hinted a quadratic function. 
}



function getCoordinates(i, j){
	return `${i} , ${j}`;
};

function buildMap(lines) {
	const map = lines.map((line) => line.split(""));

	return map;
}

function parse(map){
	const rocks = {};
	const plots = {};
	let start = { i: 0, j: 0 };
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			const value = map[i][j];
			if (value == "#") {
				rocks[getCoordinates(i, j)] = true;
			}
			if (value == "S") {
				plots[getCoordinates(i, j)] = -1;
				start = { i: i, j: j };
			}
		}
	}
	return {
		rocks: rocks,
		plots: plots,
		start: start,
		size: map.length
	};
};

//this is what solved part 2, instead of ignoring out-of-bounds, wrap them :)
/*
test cases
coords>>> 131 , 65  wrapped>>> 0 , 65
coords>>> -1 , 65  wrapped>>> 130 , 65
coords>>> 65 , 131  wrapped>>> 65 , 0
coords>>> 65 , -1  wrapped>>> 65 , 130
coords>>> 132 , 65  wrapped>>> 1 , 65
*/
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
	
	if (grid.rocks[wk] || grid.plots[coords] >= remaining) {
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

/*
//My original solution (that worked flawlessly for part 1)

function getStartingPoint(map) {
	const startingPoint = {};
	const startingPointChar = "S";
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === startingPointChar) {
				startingPoint.x = x;
				startingPoint.y = y;
				break;
			}
		}
	}

	return startingPoint;
}

function walkTheMap(map, steps) {
	const startingPoint = getStartingPoint(map);
	let positions = {};

	positions[startingPoint.y + "," + startingPoint.x] = true;

	for (let i = 1; i <= steps; i++) {
		let newPositions = {};

		for (let position in positions) {
			const newCoordinates = moveAroundTheMap(map, position);

			newCoordinates.forEach((coord) => {
				if (map[coord.y][coord.x] != "#") {
					newPositions[coord.y + "," + coord.x] = true;
				}
			});
		}

		positions = newPositions;
	}
	return Object.keys(positions).length;
}

function moveAroundTheMap(map, position) {
	let newCoordinates = [];

	const [y, x] = position.split(",").map((val) => parseInt(val, 10));

	if (y - 1 >= 0) {
		newCoordinates.push({ y: y - 1, x: x });
	}
	if (y + 1 < map.length) {
		newCoordinates.push({ y: y + 1, x: x });
	}
	if (x - 1 >= 0) {
		newCoordinates.push({ y: y, x: x - 1 });
	}
	if (x + 1 < map[0].length) {
		newCoordinates.push({ y: y, x: x + 1 });
	}

	return newCoordinates;
}
*/

module.exports = { getPositionsAfterWalking, getPositionsInInfiniteMap };
