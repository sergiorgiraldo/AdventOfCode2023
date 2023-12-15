function getSumOfHashes(line) {
	const steps = line.split(",");

	const total = steps.map(getHash).reduce((acc, val) => acc + val, 0);

	return total;
}

// to calculate the hashes for the lenses, dont use the full step string, just the label
function getFocusingPower(line) {
	const steps = line.split(",");

	const boxes = Array(256)
		.fill(null)
		.map(() => []);

	// label of the lens is always the first part of the step, before the dash or equals sign. then ...
	// if the step ends with a dash, remove the lens from the box
	// if the step ends with an equals sign, add the lens to the box
	for (const step of steps) {
		if (step.endsWith("-")) {
			const label = step.slice(0, -1);
			const hash = getHash(label);
			boxes[hash] = boxes[hash].filter((lens) => lens.label !== label);
		} else {
			// ends with =
			// focal length is the second part of the step, after equals sign
			const [label, focalLength] = step
				.split("=")
				.map((item, index) => (index === 1 ? Number(item) : item));
			const hash = getHash(label);

			const index = boxes[hash].findIndex((lens) => lens.label === label);

			if (index === -1) {
				boxes[hash].push({ label, focalLength });
			} else {
				boxes[hash][index].focalLength = focalLength;
			}
		}
	}

	const boxPowers = boxes
		.map((box, hash) => {
			return box.map(
				({ focalLength }, index) =>
					(1 + hash) * (1 + index) * focalLength
			);
		})
		.map((subArray) => subArray.reduce((acc, curr) => acc + curr, 0));

	const total = boxPowers.reduce((acc, curr) => acc + curr, 0);

	return total;
}

function getHash(step) {
	return step
		.split("")
		.map((char) => char.charCodeAt(0))
		.reduce((hash, charCode) => {
			hash += charCode;
			hash *= 17;
			hash %= 256;
			return hash;
		}, 0);
}

module.exports = { getSumOfHashes, getFocusingPower };
