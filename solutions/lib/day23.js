function takeHike(lines) {
	const steps = goForAHike(lines);

	return steps;
}


//brute force didn't work :D ran for 2 hours without ending
// function takeHikeInDryLand(lines){
//     const steps = goForAHike(lines, true);

// 	return steps;
// }
// instead, lets walk the entire map first and build a graph with points and distances

function takeHikeInDryLand(lines) {
	const map = buildMap(lines);
	const nodes = buildGraph(map);

	let stack = [{ id: 0, steps: 0, seen: {} }];
	let endNodeId = nodes.length - 1;
	let maxSteps = 0;

	while (stack.length) {
		let current = stack.pop();

		let id = current.id;
		current.seen[id] = 1;

		if (current.id == endNodeId) {
			maxSteps = Math.max(current.steps, maxSteps);
			continue;
		}

		nodes[id].connections
			.filter((node) => !current.seen[node.id])
			.forEach((node) =>
				stack.push({
					id: node.id,
					steps: current.steps + node.distance,
					seen: { ...current.seen }
				})
			);
	}

	return maxSteps;
}

function goForAHike(lines, isDryTerrain = false) {
	let map = buildMap(lines);

	let stack = [{ coords: [1, 0], steps: 0, visited: {} }];
	let endPos = [map[0].length - 2, map.length - 1];
	let maxSteps = 0;

	while (stack.length) {
		const current = stack.pop();
		const key = makeKey(current.coords);

		current.visited[key] = 1;

		let moves = getMoves(map, current, isDryTerrain);
		while (moves.length == 1) {
			current.visited[makeKey(moves[0])] = 1;
			current.steps++;
			current.coords = moves[0];
			moves = getMoves(map, current, isDryTerrain);
		}

		if (current.coords[0] == endPos[0] && current.coords[1] == endPos[1]) {
			maxSteps = Math.max(maxSteps, current.steps);
			continue;
		}

		moves.forEach((move) =>
			stack.push({
				coords: move,
				steps: current.steps + 1,
				visited: { ...current.visited }
			})
		);
	}
	return maxSteps;
}

function buildMap(lines) {
	const map = lines.map((line) => line.split("").map((trail) => trail));

	return map;
}

function buildGraph(map) {
	const directions = {
		right: [1, 0],
		down: [0, 1],
		left: [-1, 0],
		up: [0, -1]
	};

    const startPosition = [1, 0];
    const endPosition = [map[0].length-2, map.length-1];

	const addConnectNode = (current) => {
		// try to locate existing one
		let newJuncId = nodes.findIndex((node) => node.coords[0] === current.coords[0] && node.coords[1] === current.coords[1]);

		if (newJuncId == current.lastJuncId) return newJuncId;

		if (newJuncId == -1){
			newJuncId = nodes.push({ coords: current.coords.slice(), connections: [] }) - 1;
        }

		// we need to connect cur.lastJuncId and newJuncId
		if (nodes[current.lastJuncId].connections.findIndex((conn) => conn.id == newJuncId) == -1){
			nodes[current.lastJuncId].connections.push({
				id: newJuncId,
				distance: current.steps - current.stepsToLastJunc
			});
        }
		if (nodes[newJuncId].connections.findIndex((connection) => connection.id == current.lastJuncId) == -1){
			nodes[newJuncId].connections.push({
				id: current.lastJuncId,
				distance: current.steps - current.stepsToLastJunc
			});
        }

		return newJuncId;
	};

	let stack = [
		{
			coords: startPosition.slice(),
			steps: 0,
			lastJuncId: 0,
			stepsToLastJunc: 0
		}
	];
	let nodes = [{ coords: startPosition, connections: [] }];
	let visited = {};

	while (stack.length) {
		let current = stack.pop();
		
        let key = makeKey(current.coords);

		let moves = Object.values(directions)
			.map((direction) => getNewPosition(current.coords, direction))
			.filter((move) => {
				if (!map[move[1]] || !map[move[1]][move[0]] || //out of bounds
					map[move[1]][move[0]] === "#") //forest
					return false;
				return true;
			});

		if (moves.length > 2) { //we have more than 1 path to follow
			current.lastJuncId = addConnectNode(current);
			current.stepsToLastJunc = current.steps;
		}

		if (visited[key]) continue;

		visited[key] = 1;

		if (current.coords[0] == endPosition[0] && current.coords[1] == endPosition[1]) {
			addConnectNode(current);
			continue;
		}

		moves.forEach((np) =>
			stack.push({
				coords: np,
				steps: current.steps + 1,
				lastJuncId: current.lastJuncId,
				stepsToLastJunc: current.stepsToLastJunc
			})
		);
	}

	return nodes;
}

function getMoves(map, current, isDryTerrain = false) {
	const directions = {
		right: [1, 0],
		down: [0, 1],
		left: [-1, 0],
		up: [0, -1]
	};
	const slopes = { ">": "right", v: "down", "<": "left", "^": "up" };

	let moves = [];

	let trail = map[current.coords[1]][current.coords[0]];

	if (!isDryTerrain && slopes[trail]) {
		moves.push(getNewPosition(current.coords, directions[slopes[trail]]));
	} else {
		Object.values(directions).forEach((direction) =>
			moves.push(getNewPosition(current.coords, direction))
		);
	}

	return moves.filter((move) => {
		if (
			!map[move[1]] ||
			!map[move[1]][move[0]] || //out of bounds
			map[move[1]][move[0]] === "#"
		)
			//forest
			return false;

		if (current.visited[makeKey(move)] !== undefined) return false; //can only be visited once

		return true;
	});
}

function makeKey(coords) {
	return coords[0] + "-" + coords[1];
}

function getNewPosition(current, direction) {
	return [current[0] + direction[0], current[1] + direction[1]];
}

module.exports = { takeHike, takeHikeInDryLand };
