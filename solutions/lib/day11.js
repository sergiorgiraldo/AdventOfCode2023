function getShortestPaths(lines, factor) {
	const [galaxies, rows, cols] = buildGalaxies(lines);

	const sumOfDistances = getManhattanDistances(galaxies, rows, cols, factor);

	return sumOfDistances;
}

function getShortestPathsYoungUniverse(lines) {
	return getShortestPaths(lines, 2);
}

function getShortestPathsOlderUniverse(lines) {
    return getShortestPaths(lines, 1000000);
}

// instead of building the whole grid, map only the galaxies and track the rows and columns
function buildGalaxies(lines) {
	const universe = lines.map((line) => line.split(""));

	let galaxies = [];
	let rows = [];
	let cols = [];

	for (let i = 0; i < universe.length; i++) {
		if (!universe[i].includes("#")) rows.push(i);

		for (let j = 0; j < universe[i].length; j++){
			if (universe[i][j] === "#") galaxies.push([i, j]);

            if (i === 0 && !universe.map((item) => item[j]).includes("#")) cols.push(j);
        }
	}

	return [galaxies, rows, cols];
}

/*
In the Manhattan distance, I add up the number of blocks one needs to walk horizontally and vertically to get to the destination. It's the sum of the absolute differences between points across all dimensions
*/
function getManhattanDistances(galaxies, rows, columns, expansion) {
	let expansionFactor = expansion - 1;

	const distances = [];

	for (let i = 0; i < galaxies.length; i++) {
		distances[i] = [];
		for (let j = i; j < galaxies.length; j++) {
			//how many colums and rows are between the two galaxies
            //traversing the grid from top to bottom and then left to right
            //so rows are already ordered but not the columns
			const columnExpansion = columns.filter(
				(column) =>
					column > Math.min(galaxies[i][1], galaxies[j][1]) &&
					column < Math.max(galaxies[i][1], galaxies[j][1])
			).length;

			const rowExpansion = rows.filter(
				(row) => row > galaxies[i][0] && row < galaxies[j][0]
			).length;

			distances[i][j] =
				Math.abs(galaxies[i][0] - galaxies[j][0]) +
				Math.abs(galaxies[i][1] - galaxies[j][1]) +
				expansionFactor * columnExpansion +
				expansionFactor * rowExpansion;
		}
	}

	// calculate manhattan distance for each pair of galaxies
	const distancesForEachPairOfGalaxies = distances.map((distance) =>
		distance.reduce((acc, cur) => acc + cur, 0)
	);

	return distancesForEachPairOfGalaxies.reduce((acc, cur) => acc + cur, 0);
}
module.exports = { getShortestPaths, getShortestPathsYoungUniverse, getShortestPathsOlderUniverse };
