require("regenerator-runtime");
const { mincut } = require("@graph-algorithm/minimum-cut");
/*
 in essence this a graph where I have to make a partition of the vertices into 2 subsets, a min-cut.

what is nice of the min-cut is that it will return the min :) so I dont have to account for exactly 3, it is baked into 
the algorithm

i took a shortcut (pun intended) and used a npm library
*/

function getGroupsAfter3WiresDisconnected(lines) {
	const connections = [];
	const connectionsMap = new Map();

	lines.forEach((line) => {
		const [component, connectedComponentsString] = line.split(": ");
		let connectedComponents = connectedComponentsString.split(" ");

		if (!connectionsMap.has(component)) {
			connectionsMap.set(component, connectedComponents);
		} else {
			connectionsMap.get(component).push(...connectedComponents);
		}

		for (const connectedComponent of connectedComponents) {
			connections.push([component, connectedComponent]);

			if (!connectionsMap.has(connectedComponent))
				connectionsMap.set(connectedComponent, []);

			const alreadyConnectedComponents =
				connectionsMap.get(connectedComponent);

			alreadyConnectedComponents.push(component);
		}
	});

	for (const [component1, component2] of mincut(connections)) {
		cutConnection(connectionsMap, component1, component2);
	}

	const graph = buildGraph(connectionsMap);

	return graph[0].length * graph[1].length;
}

function buildGraph(connections) {
	const graph = [];
	const visited = new Set();

	for (const component of connections.keys()) {
		if (visited.has(component)) continue;

		const group = [];
		const queue = [component];

		while (queue.length > 0) {
			const connectedComponent = queue.pop();

			if (visited.has(connectedComponent)) continue;
			visited.add(connectedComponent);

			group.push(connectedComponent);
			queue.push(...connections.get(connectedComponent));
		}

		graph.push(group);
	}

	return graph;
}

function cutConnection(connections, component1, component2) {
	const connectionsToC1 = connections.get(component1);
	const connectionsToC2 = connections.get(component2);

	connections.set(component1, connectionsToC1.filter((c) => c !== component2) ?? []);
    
	connections.set(component2, connectionsToC2.filter((c) => c !== component1) ?? []);

	return connections;
}

module.exports = { getGroupsAfter3WiresDisconnected };
