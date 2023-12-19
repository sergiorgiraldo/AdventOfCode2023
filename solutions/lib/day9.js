function getSumOfPredictedValuesFuture(lines) {
	const predictedValues = lines.map((line) =>
		predictValue(line, inTheFuture)
	);

	const sum = predictedValues.reduce((acc, curr) => acc + curr, 0);

	return sum;
}

function getSumOfPredictedValuesPast(lines) {
	const predictedValues = lines.map((line) => 
        predictValue(line, inThePast)
    );
	
	const sum = predictedValues.reduce((acc, curr) => acc + curr, 0);

	return sum;
}

function predictValue(line, when) {
	let allSequences = [];

	let sequence = line.split(/\s+/).map(Number);
	allSequences.push(sequence);

	let newSequence = generateDerivatives(sequence);
	allSequences.push(newSequence);

	while (!checkZeroes(newSequence)) {
		newSequence = generateDerivatives(newSequence);
		allSequences.push(newSequence);
	}

	const value = when(allSequences);

	return value;
}

function inTheFuture(arr) {
	return arr.slice(0, -1).reduceRight((acc, curr) => curr.at(-1) + acc, 0);
}

function inThePast(arr) {
	return arr.slice(0, -1).reduceRight((acc, curr) => curr.at(0) - acc, 0);
}

function generateDerivatives(arr) {
	return arr.slice(1).map((item, index) => item - arr[index]);
}

function checkZeroes(arr) {
	return arr.every((item) => item === 0);
}

module.exports = { getSumOfPredictedValuesFuture, getSumOfPredictedValuesPast };
