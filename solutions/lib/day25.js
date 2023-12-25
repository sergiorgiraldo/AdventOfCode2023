require("regenerator-runtime");
const { mincut } = require("@graph-algorithm/minimum-cut");
/*
 in essence this a graph where I have to make a partition of the vertices into 2 subsets, a min-cut.

what is nice of the min-cut is that it will return the min :) so I dont have to account for exactly 3, it is baked into 
the algorithm

i took a shortcut (pun intended) and used a npm library
*/

function getGroupsAfter3WiresDisconnected(lines) {
	const [initialGraph, connections] = buildInitialGraph(lines);

	for (const [component1, component2] of mincut(initialGraph)) {
		cutConnection(connections, component1, component2);
	}

	const partitionedGraph = buildPartitionedGraph(connections);

	return partitionedGraph[0].length * partitionedGraph[1].length;
}

function buildInitialGraph(lines){
	const graph = []; //vertex
	const connections = new Map(); //connections among vertex 

	lines.forEach((line) => {
		const [component, connectedComponentsString] = line.split(": ");
		let connectedComponents = connectedComponentsString.split(" ");

		if (!connections.has(component)) {
			connections.set(component, connectedComponents);
		} 
		else {
			connections.get(component).push(...connectedComponents);
		}

		for (const connectedComponent of connectedComponents) {
			graph.push([component, connectedComponent]);

			//update map
			if (connections.has(connectedComponent)){
				const existingConnectedComponents = connections.get(connectedComponent);
				existingConnectedComponents.push(component);
			}
			else{
				connections.set(connectedComponent, [component]);
			}
		}
	});

	return [graph, connections];
}

function buildPartitionedGraph(connections) {
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
