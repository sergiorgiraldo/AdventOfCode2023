const helpers = require("./helpers");

function getBestRoute(lines) {
	const grid = buildMap(lines);

	const constraint = (_, steps) => steps < 4;

	const energy = traverseGrid(grid, constraint);

	return energy;
}

function getBestRouteWithUltraCrucibles(lines) {
	const grid = buildMap(lines);

	const constraint = (prevSteps, steps) => (steps > prevSteps || prevSteps >= 4) && steps < 11;

	const energy = traverseGrid(grid, constraint);

	return energy;
}

//cheated a bit here, used a SO heap solution to get the best route
//the heap will be ordered by the energy, so the first element will be the best route
//used manhattan distance to walk the grid, hence the directions arrays
function traverseGrid(grid, withConstraint) {
    const directions = [
        [0, -1],  // N
        [1, 0],   // E
        [0, 1],   // S
        [-1, 0]   // W
    ];
    const [E, S] = [1, 2]; //crucible dont reverse, so always go E or S	
    const visited = new Map();
    const destination = {
        x : grid[0].length - 1,
        y: grid.length - 1
    };
	const queue = [
		[0, 0, [0, 0], E, 0], 
		[0, 0, [0, 0], S, 0]
	];
    //used arbitrary numbers to create a unique key for each visited location
    const makeKey = (x, y, h, steps) => (((x + 1) * 10_000 + (y + 1)) * 1_000 + h) * 100 + (steps + 10);

	while (queue.length) {
		const [, energy, [currX, currY], ch, cntSteps] = helpers.strucutures.MinHeap.pop(queue);

		if (currX === destination.x && currY === destination.y && withConstraint(cntSteps, cntSteps)) {
			return energy;
		}
        
		directions
            .map((d, h) => [d, h, h === ch ? cntSteps + 1 : 1]) // if going in the same direction, increment the steps

			.map(([[dx, dy], ...rest]) => [[currX + dx, currY + dy], ...rest]) // calculate the new positions
			
			.filter(([[x, y], h]) => grid[y]?.[x] && (h + 2) % 4 !== ch) // check if inside the grid and not reversing direction
			
			.filter(([, , steps]) => withConstraint(cntSteps, steps)) // check if the constraint is met
			
			.map(([[x, y], h, steps]) => [
				energy + grid[y][x], // calculate the new energy
				[x, y],
				h,
				steps
			]) 
			
			.filter(
				([e, [x, y], h, steps]) =>
                    // check which new energies is better than the previous one for each new location visited 
                    (visited.get(makeKey(x, y, h, steps)) ?? Number.MAX_SAFE_INTEGER) > e 
                    &&
                    // check if the new location was visited before; if not, add it to the visited map
					visited.set(makeKey(x, y, h, steps), e) 
			) 
			
			.forEach(([e, p, h, steps]) =>
				helpers.strucutures.MinHeap.push(queue, [
					e + (destination.x - p[0]) + (destination.y - p[1]),
					e,
					p,
					h,
					steps
				]) // push the new energies to the heap
			);
	}
	return -1;
}

function buildMap(lines) {
	const map = lines.map((row) => [...row].map(Number));
	return map;
}

module.exports = { getBestRoute, getBestRouteWithUltraCrucibles };
