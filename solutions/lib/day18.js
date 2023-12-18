const helpers = require("./helpers");
function getLavaLagoon(plan) {
	const lava = buildLavaLagoon(plan, "normal");

	return lava;
}

function getHugeLavaLagoon(plan) {
	const lava = buildLavaLagoon(plan, "huge");

	return lava;
}

function buildLavaLagoon(plan, lagoonSize) {
	const grid = [];

	let position = [0, 0];
	let perimeter = 0;

	for (const instruction of plan) {
		const [[y, x], metersToDig] = parseInstruction(instruction, lagoonSize);

		position = [
			position[0] + metersToDig * y,
			position[1] + metersToDig * x
		];

		perimeter += metersToDig;

		grid.push(position);
	}

	const total = calculateLava(grid, perimeter);

	return total;
}

function parseInstruction(instruction, lagoonSize) {
	const directions = {
		R: [0, 1],
		D: [-1, 0],
		L: [0, -1],
		U: [1, 0]
	};
	let next = [];
	let metersToDig;

	if (lagoonSize === "normal") {
		const [direction, n] = instruction.split(" ");

		next = directions[direction];

		metersToDig = parseInt(n, 10);
	} 
    else if (lagoonSize === "huge") {
		const fromColor = instruction.split("#")[1].split(")")[0];

		const direction = Object.keys(directions)[parseInt(fromColor.substring(fromColor.length - 1))];
		next = directions[direction];

		metersToDig = parseInt(fromColor.slice(0, -1), 16); //convert hex to decimal
	}
	return [next, metersToDig];
}

/*
To calculate how many point are inside, use Pick's theorem (https://en.wikipedia.org/wiki/Pick%27s_theorem)

    Area = Internal_points + boundary_points/2 - 1
    Internal_points = Area - boundary_points/2 + 1

To calculate the area use the shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula)

	Area = 1/2 ( ∑(i=1->n) (y_i + y_i+1) * (x_i - x_i+1) )
*/
function calculateLava(grid, perimeter) {
	let area = 0;
	grid.map((_, i) => {
		if (i < grid.length - 1) {
			const topPointX = grid[i][0];
			const bottomPointX = grid[i + 1][0];

			const topPointY = grid[i][1];
			const bottomPointY = grid[i + 1][1];

			area += (topPointY + bottomPointY) * (topPointX - bottomPointX);
		}
	});
	
    //boundary points are exactly the same as the perimeter
    //shoelace formula returns the area multiplied by 2
	const internalPoints = (area / 2) - (perimeter / 2) + 1;

	//total lava is the sum of internal points and perimeter
	const total = internalPoints + perimeter;

	return total;
}

module.exports = { getLavaLagoon, getHugeLavaLagoon };
