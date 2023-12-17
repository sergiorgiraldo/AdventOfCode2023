function countEnergizedTilesFromTopLeft(lines) {
	const entryPoint = { coordinates: { i: 0, j: 0 }, direction: "r" }; //beam enters from the left going right
	const grid = lines.map((line) => line.split(""));
	
	const energy = energizeTiles(entryPoint, grid);

	return energy;
}

function countEnergizedTilesFromAnywhere(lines) {
	const entryPoints = []; //beam enters from any boundary
	const grid = lines.map((line) => line.split(""));

	grid.map((row, i) => { //left wall
		entryPoints.push({
			coordinates: { i: i, j: 0 },
			direction: "r"
		});

		entryPoints.push({ //right wall
			coordinates: { i: i, j: row.length - 1 },
			direction: "l"
		});
	});

	grid[0].map((_, j) => { //top wall
		entryPoints.push({
			coordinates: { i: 0, j: j },
			direction: "d"
		});

		entryPoints.push({ //bottom wall
			coordinates: { i: grid.length - 1, j: j },
			direction: "u"
		});
	});

	const energies = entryPoints.map((entryPoint) => energizeTiles(entryPoint, grid));

	const maxEnergy = Math.max(...energies);

	return maxEnergy;
}

function energizeTiles(first, grid) {
	let beams = [first];
	let energyzed = {};

	while (beams.length) {
		let newBeams = []; //beams that will be added to the next iteration because original was splitted
		for (let index = 0; index < beams.length; index++) {
			const beam = beams[index];
			const location = `[${beam.coordinates.i},${beam.coordinates.j}]`;

			if (!energyzed[location]) {
				energyzed[location] = {};
			}
			energyzed[location][beam.direction] = true;

			const current = grid[beam.coordinates.i]
				? grid[beam.coordinates.i][beam.coordinates.j]
				: null;
			const nextDirection = getNextDirections(current, beam.direction);

			for (const direction of nextDirection) {
				const newBeam = {
					coordinates: moveAroundTheGrid(beam.coordinates, direction),
					direction: direction
				};

				// off bounds
				if (
					!(
						newBeam.coordinates.j >= 0 &&
						newBeam.coordinates.j < grid[0].length &&
						newBeam.coordinates.i >= 0 &&
						newBeam.coordinates.i < grid.length
					)
				) {
					continue;
				}

				// already visited going the same direction
				const newLocation = `[${newBeam.coordinates.i},${newBeam.coordinates.j}]`;
				if (energyzed[newLocation] && energyzed[newLocation][direction]) {
					continue;
				}
				newBeams.push(newBeam);
			}
		}
		beams = newBeams;
	}

	return Object.keys(energyzed).length;
}

function getNextDirections(current, direction) {
	if (!current) {
		return [];
	}
	const map = {
        "|": { r: ["u", "d"], l: ["u", "d"], u: ["u"], d: ["d"] }, //splitter vertically
        
		"-": { r: ["r"], l: ["l"], u: ["r", "l"], d: ["r", "l"] }, //splitter horizontally
        
		"/": { r: ["u"], l: ["d"], u: ["r"], d: ["l"] }, //mirror
        
		"\\": { r: ["d"], l: ["u"], u: ["l"], d: ["r"] }, //mirror

		".": { r: ["r"], l: ["l"], u: ["u"], d: ["d"] } //pass-through
	};
	return map[current][direction];
}

function moveAroundTheGrid(coordinates, direction) {
	let newCoordinates = { i: coordinates.i, j: coordinates.j };

	switch (direction) {
		case "r":
			newCoordinates.j += 1;
			break;
		case "l":
			newCoordinates.j -= 1;
			break;
		case "u":
			newCoordinates.i -= 1;
			break;
		case "d":
			newCoordinates.i += 1;
			break;
	}

	return newCoordinates;
}

module.exports = {
	countEnergizedTilesFromTopLeft,
	countEnergizedTilesFromAnywhere
};
