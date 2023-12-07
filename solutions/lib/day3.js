function getSumOfParts(lines) {
	let sum = 0;

	for (const [i, line] of lines.entries()) {
		const partNumbers = [...line.matchAll(/\d+/g)];// Match all numbers

		for (const number of partNumbers) {
			const [partNumber] = number;
			const startIndex = Math.max((number.index ?? 0) - 1, 0);
			const endIndex = startIndex + partNumber.length + 2; // +2 because slice does not include the end index

			const match = [i - 1, i, i + 1].some((index) => {
				return lines[index]
					?.slice(startIndex, endIndex)
					.match(/[^\d\.]/g); // Match anything that is not a number or a dot
			});

			if (match) {
				sum += parseInt(partNumber, 10);
				continue;
			}
		}
	}

	return sum;
}

function getGearsRatio(lines) {
	let ratiosSum = 0;

	for (const [i, line] of lines.entries()) {
		const gears = [...line.matchAll(/\*/g)]; // Match all asterisks

		for (const gear of gears) {
			const ratios = [];
			const gearStartIndex = Math.max((gear.index ?? 0) - 1, 0);
			const gearEndIndex = gearStartIndex + 2; //+2 because it should be 1 position after the asterisk
			[i - 1, i, i + 1].forEach((index) => {
				const partNumbers = [...lines[index].matchAll(/\d+/g)];// Match all numbers
				for (const number of partNumbers) {
					const [partNumber] = number;

					const startIndex = number.index ?? 0;
					const endIndex = startIndex + partNumber.length - 1;

					if (endIndex >= gearStartIndex && startIndex <= gearEndIndex) {
						ratios.push(parseInt(partNumber, 10));
					}
				}
			});

			if (ratios.length === 2) { //need to have 2 ratios to calculate the product
				ratiosSum += ratios[0] * ratios[1];
			}
		}
	}

	return ratiosSum;
}

module.exports = { getSumOfParts, getGearsRatio };
