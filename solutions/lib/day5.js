const inputs = {
	seed: [],
	seedToSoil: [],
	soilToFertilizer: [],
	fertilizerToWater: [],
	waterToLight: [],
	lightToTemperature: [],
	temperatureToHumidity: [],
	humidityToLocation: []
};

const maps = {
	seedToSoil: [],
	soilToFertilizer: [],
	fertilizerToWater: [],
	waterToLight: [],
	lightToTemperature: [],
	temperatureToHumidity: [],
	humidityToLocation: []
};

function buildMap(inputs, whichMap) {
	for (let i = 0; i < inputs.length; i++) {
		let tokens = inputs[i].split(/\s+/).map(Number);
		let destinationRangeStart = tokens[0];
		let sourceRangeStart = tokens[1];
		let rangeLength = tokens[2];

		whichMap.push({
			destStart: destinationRangeStart,
			sourceStart: sourceRangeStart,
			rangeLength: rangeLength
		});
	}
}

function getMapValue(source, map) {
	let value = source;
	for (let i = 0; i < map.length; i++) {
		let token = map[i];
		if (source >= token.sourceStart && source < token.sourceStart + token.rangeLength) {
			value = token.destStart + (source - token.sourceStart);
			break;
		}
	}

	return value;
}

function getLocationFromSeed(seed, maps) {
	const soil = getMapValue(seed, maps.seedToSoil);
	const fertilizer = getMapValue(soil, maps.soilToFertilizer);
	const water = getMapValue(fertilizer, maps.fertilizerToWater);
	const light = getMapValue(water, maps.waterToLight);
	const temperature = getMapValue(light, maps.lightToTemperature);
	const humidity = getMapValue(temperature, maps.temperatureToHumidity);
	const location = getMapValue(humidity, maps.humidityToLocation);

	return location;
}

function buildInputsAndMaps(lines) {
	let source = null;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].length == 0) {
			continue;
		}
		switch (true) {
			case lines[i].startsWith("seeds: "):
				inputs.seed = lines[i].split(": ")[1].split(/\s+/).map(Number);
				break;
			case lines[i].startsWith("seed-to-soil"):
				source = "seedToSoil";
				break;
			case lines[i].startsWith("soil-to-fertilizer"):
				source = "soilToFertilizer";
				break;
			case lines[i].startsWith("fertilizer-to-water"):
				source = "fertilizerToWater";
				break;
			case lines[i].startsWith("water-to-light"):
				source = "waterToLight";
				break;
			case lines[i].startsWith("light-to-temperature"):
				source = "lightToTemperature";
				break;
			case lines[i].startsWith("temperature-to-humidity"):
				source = "temperatureToHumidity";
				break;
			case lines[i].startsWith("humidity-to-location"):
				source = "humidityToLocation";
				break;
			default:
				inputs[source].push(lines[i]);
				break;
		}
	}

	buildMap(inputs.seedToSoil, maps.seedToSoil);
	buildMap(inputs.soilToFertilizer, maps.soilToFertilizer);
	buildMap(inputs.fertilizerToWater, maps.fertilizerToWater);
	buildMap(inputs.waterToLight, maps.waterToLight);
	buildMap(inputs.lightToTemperature, maps.lightToTemperature);
	buildMap(inputs.temperatureToHumidity, maps.temperatureToHumidity);
	buildMap(inputs.humidityToLocation, maps.humidityToLocation);
}

function getLowestLocation(lines) {
	buildInputsAndMaps(lines);

	const locations = inputs.seed.map((seed) =>
		getLocationFromSeed(seed, maps)
	);

	const min = Math.min(...locations.map(Number));

	return min;
}

function getLowestLocationFromRangeSeeds(lines) {
	buildInputsAndMaps(lines);

	let seeds = maps.seedToSoil
		.sort((a, b) => a.sourceStart - b.sourceStart)
		.map((seed) => ({
			start: seed.sourceStart,
			end: seed.sourceStart + seed.rangeLength,
			startLocation: getLocationFromSeed(seed.sourceStart, maps),
			endLocation: getLocationFromSeed(seed.sourceStart + seed.rangeLength, maps)
		}));

	min = Number.MAX_SAFE_INTEGER;
	
	for (let i = 0; i < inputs.seed.length; i += 2) {
		let start = inputs.seed[i];
		let end = start + inputs.seed[i + 1] - 1;
		let location = Number.MAX_SAFE_INTEGER;

		for (let j = 0; j < seeds.length; j++) {
			let overlap = Math.min(end, seeds[j].end) - Math.max(start, seeds[j].start);
			if (overlap >= 0) {
				let offsetBegin = start >= seeds[j].start ? start : seeds[j].start;
				let offsetEnds = end <= seeds[j].end ? end : seeds[j].end;

				for (let k = offsetBegin; k <= offsetEnds; k++) {
					location = getLocationFromSeed(k, maps);
					if (location < min) {
						min = location;
					}
				}

				break;
			}
		}
	}

	return min;
}

module.exports = { getLowestLocation, getLowestLocationFromRangeSeeds };
