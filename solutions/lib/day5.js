const inputs = {
	seed: 0,
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

function buildMaps(inputs, map) {
	for (let i = 0; i < inputs.length; i++) {
		let tokens = inputs[i].split(" ").map(Number);
		let destinationRangeStart = tokens[0];
		let sourceRangeStart = tokens[1];
		let rangeLength = tokens[2];

		map.push({
			destStart: destinationRangeStart,
			sourceStart: sourceRangeStart,
			rangeLength: rangeLength
		});
	}
}

function getMapValue(source, map) {
	let dest = source;
	for (let i = 0; i < map.length; i++) {
		let range = map[i];
		if (
			source >= range.sourceStart &&
			source < range.sourceStart + range.rangeLength
		) {
			dest = range.destStart + (source - range.sourceStart);
			break;
		}
	}

	return dest;
}

function getLocationFromSeed(seed, maps) {
	let soil, fertilizer, water, light, temperature, humidity, location;

	soil = getMapValue(seed, maps.seedToSoil);
	fertilizer = getMapValue(soil, maps.soilToFertilizer);
	water = getMapValue(fertilizer, maps.fertilizerToWater);
	light = getMapValue(water, maps.waterToLight);
	temperature = getMapValue(light, maps.lightToTemperature);
	humidity = getMapValue(temperature, maps.temperatureToHumidity);
	location = getMapValue(humidity, maps.humidityToLocation);

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
				inputs.seed = lines[i].substring(7).split(" ").map(Number);
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

	buildMaps(inputs.seedToSoil, maps.seedToSoil);
	buildMaps(inputs.soilToFertilizer, maps.soilToFertilizer);
	buildMaps(inputs.fertilizerToWater, maps.fertilizerToWater);
	buildMaps(inputs.waterToLight, maps.waterToLight);
	buildMaps(inputs.lightToTemperature, maps.lightToTemperature);
	buildMaps(inputs.temperatureToHumidity, maps.temperatureToHumidity);
	buildMaps(inputs.humidityToLocation, maps.humidityToLocation);
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
