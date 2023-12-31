const { greatest, identity, least } = require("./math.js");
const hasProp = require("./objects.js");

/**
 * Count the items in an array which match an optional value or predicate.
 * If the second parameter is omitted, all truthy values will be counted.
 *
 * @param {Array} items - the values to count
 * @param {function|*} [match] - a value or predicate function to count
 * @returns {number} the count of matching values
 */
const count = (items, match = Boolean) => {
	const matchFn =
		typeof match === "function" ? match : (item) => item === match;

	return items.filter(matchFn).length;
};

/**
 * Returns an object with the count of every group of items in an array.
 * Items are grouped by an optional groupFn (defaults to identity).
 *
 * Works on strings as well as arrays.
 *
 * @param {Array|str} items - the values to count
 * @param {function} [groupFn] - groups items into categories
 * @returns {Object<string, number>} the counts of each group
 */
const countGroups = (strOrArray, groupFn = identity) => {
	const counts = {};

	for (let i = 0; i < strOrArray.length; i += 1) {
		const group = groupFn(strOrArray[i], i, strOrArray);

		if (hasProp(counts, group)) {
			counts[group] += 1;
		} else {
			counts[group] = 1;
		}
	}

	return counts;
};

/**
 * Chunks an array or string into subsections with an overlap. An overlap of
 * 1 means the last item of one subsection will be the first item of the next.
 * A negative overlap indicates items should be skipped between chunks.
 *
 * @param {string|Array} strOrArray - the array or string to chunk
 * @param {number} size - the maximum size of the chunks
 * @param {number} [overlap] - the size of the overlap (defaults to 1)
 * @returns {Array<string|Array>} an array of sub-arrays or sub-strings
 */
const chunkOverlap = (strOrArray, size, overlap = 1) => {
	const diff = size - overlap;
	if (diff < 1) {
		throw Error(
			`Chunk size must be larger than overlap: ${size} ${overlap}`
		);
	}

	const chunks = [];
	const stop = Math.ceil((strOrArray.length - size) / diff) + 1;

	for (let i = 0; i < stop; i += 1) {
		const start = i * diff;
		const end = start + size;
		chunks.push(strOrArray.slice(start, end));
	}

	return chunks;
};

const getIndexes = (items) => Object.keys(items).map(Number);
const getGreatestIndex = (items) => greatest(getIndexes(items));
const getLeastIndex = (items) => least(getIndexes(items));

/**
 * Shifts an array with negative indexes so the least index is at zero.
 * Optionally instead accepts an explicit amount to shift by.
 *
 * @param {Array} negativeArray - the array with negative indexes
 * @param {number} [amount] - optional explicit shift amount
 * @returns {Array} the shifted array
 */
const shiftArray = (negativeArray, amount = null) => {
	if (amount === null) {
		const leastIndex = getLeastIndex(negativeArray);
		if (leastIndex >= 0) {
			return negativeArray;
		}

		amount = -leastIndex;
	}

	const shifted = [];
	for (const [i, val] of Object.entries(negativeArray)) {
		shifted[Number(i) + amount] = val;
	}

	return shifted;
};

/**
 * Shifts a 2D array with negative indexes so the least index is at zero.
 *
 * @param {Array<Array>} negativeMatrix - the 2D array with negative indexes
 * @returns {Array<Array>} the shifted matrix
 */
const shiftMatrix = (negativeMatrix) => {
	const shifted = shiftArray(negativeMatrix);
	const leastXIndex = least(shifted.map(getLeastIndex));
	return shifted.map((row) => shiftArray(row, -leastXIndex));
};

/**
 * Fills a sparse 2D array so that each all rows have the same length.
 * Fills previously empty spots with undefined.
 *
 * @param {Array<Array>} sparseMatrix - the 2D array with uneven rows
 * @returns {Array<Array>} the filled matrix
 */
const fillMatrix = (sparseMatrix) => {
	const filled = [];
	const greatestXIndex = greatest(sparseMatrix.map(getGreatestIndex));

	for (let y = 0; y < sparseMatrix.length; y++) {
		filled[y] = [];

		for (let x = 0; x <= greatestXIndex; x++) {
			filled[y][x] = sparseMatrix[y][x];
		}
	}

	return filled;
};

/**
 * Searches a 2D array for a value w, returning its X/Y coordinates.
 * Returns [-1, -1] if the value cannot be found.
 *
 * @param {Array<Array>} matrix - the 2D array to search
 * @param {function} predicate - identifies the value by returning true
 * @returns {number[]} the X/Y coordinates of the value
 */
const findCoords = (matrix, predicate) => {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (predicate(matrix[y][x], [x, y], matrix)) {
				return [x, y];
			}
		}
	}

	return [-1, -1];
};

/**
 * Searches a 2D array for a particular value, returning its X/Y coordinates.
 * Returns [-1, -1] if the value cannot be found.
 *
 * @param {Array<Array>} matrix - the 2D array to search
 * @param {*} item - the value to search for
 * @returns {number[]} the X/Y coordinates of the value
 */
const coordsOf = (matrix, item) => {
	return findCoords(matrix, (val) => val === item);
};

/**
 * Iterates over a 2D array, calling an iteratee function on each item.
 *
 * This eachFn will be called with three parameters:
 *   - each item
 *   - that item's X/Y coordinates
 *   - the matrix itself
 *
 * @param {Array<Array>} matrix - the 2D array to iterate over
 * @param {function} eachFn - the iteratee function
 */
const eachMatrix = (matrix, eachFn) => {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			eachFn(matrix[y][x], [x, y], matrix);
		}
	}
};

/**
 * Iterates over each item in a 2D array, calling a mapping function on each.
 * Returns a new transformed matrix.
 *
 * This mapFn will be called with three parameters:
 *   - each item
 *   - that item's X/Y coordinates
 *   - the matrix itself
 *
 * @param {Array<Array>} matrix - the 2D array to iterate over
 * @param {function} mapFn - the mapping function
 * @returns {Array<Array>} a new transformed matrix
 */
const mapMatrix = (matrix, mapFn) => {
	const mapped = [];

	for (let y = 0; y < matrix.length; y++) {
		mapped[y] = [];

		for (let x = 0; x < matrix[y].length; x++) {
			mapped[y][x] = mapFn(matrix[y][x], [x, y], matrix);
		}
	}

	return mapped;
};

/**
 * Rotates a 2D array 90 degrees clock-wise, returning the new rotated matrix.
 *
 * @param {Array<Array>} matrix - the 2D array to rotate
 * @returns {Array<Array>} the rotated matrix
 */
const rotateMatrix = (matrix) => {
	const width = matrix[0].length;
	const rotated = matrix[0].map(() => []);

	eachMatrix(matrix, (item, [x, y]) => {
		rotated[x][width - y - 1] = item;
	});

	return rotated;
};

/**
 * Flips a 2D array horizontally, returning the new flipped matrix.
 *
 * @param {Array<Array>} matrix - the 2D array to flip
 * @returns {Array<Array>} the flipped matrix
 */
const flipMatrix = (matrix) => {
	const width = matrix[0].length;
	const flipped = matrix[0].map(() => []);

	eachMatrix(matrix, (item, [x, y]) => {
		flipped[y][width - x - 1] = item;
	});

	return flipped;
};

/**
 * Calls a function on a particular X/Y coordinate in a matrix. The function
 * will not be called if the coordinates do not exist in the matrix.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} coords - the X/Y coordinates to call the function on
 * @param {function} eachFn - the function to call
 */
const callAtCoords = (matrix, coords, callFn) => {
	const [x, y] = coords;

	if (hasProp(matrix, y) && hasProp(matrix[y], x)) {
		callFn(matrix[y][x], coords, matrix);
	}
};

/**
 * Iterates through the matrix spots directly adjacent to the passed central
 * coordinates, starting with the top and rotating clockwise. Calls the passed
 * eachFn on each adjacent spot.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the center spot
 * @param {function} eachFn - the function to call on each adjacent spot
 */
const eachAdjacent = (matrix, [x, y], eachFn) => {
	callAtCoords(matrix, [x, y - 1], eachFn);
	callAtCoords(matrix, [x + 1, y], eachFn);
	callAtCoords(matrix, [x, y + 1], eachFn);
	callAtCoords(matrix, [x - 1, y], eachFn);
};

/**
 * Iterates through the matrix spots surrounding the passed central
 * coordinates, both directly adjacent and diagonal. Starts at the top and then
 * goes clockwise. Calls the passed eachFn on each surrounding spot.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the center spot
 * @param {function} eachFn - the function to call on each surrounding spot
 */
const eachSurrounding = (matrix, [x, y], eachFn) => {
	callAtCoords(matrix, [x, y - 1], eachFn);
	callAtCoords(matrix, [x + 1, y - 1], eachFn);
	callAtCoords(matrix, [x + 1, y], eachFn);
	callAtCoords(matrix, [x + 1, y + 1], eachFn);
	callAtCoords(matrix, [x, y + 1], eachFn);
	callAtCoords(matrix, [x - 1, y + 1], eachFn);
	callAtCoords(matrix, [x - 1, y], eachFn);
	callAtCoords(matrix, [x - 1, y - 1], eachFn);
};

/**
 * Iterates through matrix spots following a path determined by a function.
 * The path function determines what the next coordinate should be, and the
 * eachFn will be called at that point if it exists.
 *
 * Stops when the path exits the matrix or when the path function returns null.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the starting point
 * @param {function} eachFn - the function to call on each spot on the path
 * @param {function} pathFn - returns the next coordinates in the path
 */
const eachOnPath = (matrix, [startX, startY], eachFn, pathFn) => {
	let next = pathFn(matrix[startY][startX], [startX, startY], matrix);

	while (
		next &&
		hasProp(matrix, next[1]) &&
		hasProp(matrix[next[1]], next[0])
	) {
		const [x, y] = next;

		eachFn(matrix[y][x], [x, y], matrix);
		next = pathFn(matrix[y][x], [x, y], matrix);
	}
};

/**
 * Iterates from a starting point to each spot above.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the starting point
 * @param {function} eachFn - the function to call on each above spot
 */
const eachUp = (matrix, coords, eachFn) => {
	eachOnPath(matrix, coords, eachFn, (_, [x, y]) => [x, y - 1]);
};

/**
 * Iterates from a starting point to each spot to the right.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the starting point
 * @param {function} eachFn - the function to call on each rightwards spot
 */
const eachRight = (matrix, coords, eachFn) => {
	eachOnPath(matrix, coords, eachFn, (_, [x, y]) => [x + 1, y]);
};

/**
 * Iterates from a starting point to each spot below.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the starting point
 * @param {function} eachFn - the function to call on each below spot
 */
const eachDown = (matrix, coords, eachFn) => {
	eachOnPath(matrix, coords, eachFn, (_, [x, y]) => [x, y + 1]);
};

/**
 * Iterates from a starting point to each spot to the left.
 *
 * @param {Array<Array>} matrix - the 2D array
 * @param {number[]} center - the X/Y coordinates of the starting point
 * @param {function} eachFn - the function to call on each leftwards spot
 */
const eachLeft = (matrix, coords, eachFn) => {
	eachOnPath(matrix, coords, eachFn, (_, [x, y]) => [x - 1, y]);
};

/**
 * Converts a 2D array to a string representation.
 *
 * @param {Array<Array>} matrix - the 2D array to stringify
 * @returns {string} the string representation
 */
const matrixToString = (matrix) => matrix.map((row) => row.join("")).join("\n");

/**
 * Converts a string representation into a 2D matrix.
 *
 * @param {string} map - the string representation of the matrix
 * @returns {Array<Array<string>>} the 2D matrix
 */
const stringToMatrix = (map) => map.split("\n").map((line) => line.split(""));

/**
 * Calculates the determinant.
 *
 * @param {string} map - the string representation of the matrix
 * @returns {Number} determinant of matrix
 */
const determinant = (m) =>
	m.length == 1
		? m[0][0]
		: m.length == 2
		? m[0][0] * m[1][1] - m[0][1] * m[1][0]
		: m[0].reduce(
				(r, e, i) =>
					r +
					(-1) ** (i + 2) *
						e *
						determinant(
							m.slice(1).map((c) => c.filter((_, j) => i != j))
						),
				0
		  );
const intersect = (a, b) => a.filter((v) => b.includes(v));

module.exports = {
	count,
	countGroups,
	chunkOverlap,
	shiftArray,
	shiftMatrix,
	fillMatrix,
	findCoords,
	coordsOf,
	eachMatrix,
	mapMatrix,
	rotateMatrix,
	flipMatrix,
	callAtCoords,
	eachAdjacent,
	eachSurrounding,
	eachOnPath,
	eachUp,
	eachRight,
	eachDown,
	eachLeft,
	matrixToString,
	stringToMatrix,
	determinant,
	intersect
};
