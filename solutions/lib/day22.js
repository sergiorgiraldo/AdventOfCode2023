function disintegrateBricks(lines) {
	const [bricks, _] = disintegrate(lines);

	return bricks;
}

function disintegratePotentialBricks(lines){
    const [_, potentialBricks] = disintegrate(lines);

	return potentialBricks;
}

function disintegrate(lines) {
	let boxes = lines
		.map((line) =>
			line.split("~").map((coords) => coords.split(",").map(Number))
		)
		.sort((a, b) => b[1][2] - a[1][2]); //sort by z coordinate
  
	let fallen = new Set();
	let bricks = 0;
	let potentialBricks = 0;

	settle(boxes, fallen); //at this point, I already know which bricks had fallen. for part 2, i will feed the new configuration

    //not optimal solution, brute force takes a lot of time but ... solves it
	boxes.forEach((_, i) => {
		fallen = new Set();

        let nboxes = JSON.parse(JSON.stringify(boxes));
		nboxes.splice(i, 1);

		const state = getState(nboxes);

        if (settle(nboxes, fallen) === state) bricks++; //if no changes, means bricks that fall in the new config it is the same as original
		potentialBricks += fallen.size;
	});

	return [bricks, potentialBricks];
}

function getState(boxes) {
	return boxes.map((box) => box[1][2]).join(",");
}

function settle(boxes, fallen) {
	let state = "";

	while (state !== getState(boxes)) {
		state = getState(boxes);
		fall(boxes, fallen);
	}
	return state;
}

function fall(boxes, fallen) {
	boxes.forEach((box, i) => {
		if (box[1][2] <= 1) return true; //reached bottom

		let z = box[0][2];

		let canFall = true;

		while (canFall && z > 1) {
			z--;
			for (let x = box[0][0]; x <= box[1][0]; x++)
				for (let y = box[0][1]; y <= box[1][1]; y++) {
					if (
						boxes.filter(
							(o, j) =>
								i !== j &&
								o[0][0] <= x &&
								o[1][0] >= x &&
								o[0][1] <= y &&
								o[1][1] >= y &&
								o[0][2] <= z &&
								o[1][2] >= z
						).length != 0
					) {
						canFall = false;
						break;
					}
				}
                
			if (canFall) { //box never rotate, if they felt update only z coordinate
				box[1][2]--;
				box[0][2]--;
				fallen.add(i);
			}
		}
	});
}

module.exports = { disintegrateBricks, disintegratePotentialBricks };
