const helpers = require("./helpers");

function emit1000Pulses(lines) {
	return emitPulses(lines, 1000);
}

function emitPulsesUntilCyclesFound(lines) {
	return emitPulses(lines, Number.MAX_SAFE_INTEGER, true);
}

function emitPulses(lines, limit, cyclesToBeFound = false) {
	const modules = buildConfiguration(lines);

	// for all & modules, find their inputs
	Array.from(modules.values())
		.filter((module) => module.type === "&")
		.forEach((module) => {
			const inputs = Array.from(modules.values()).filter((otherModule) =>
				otherModule.destinations.includes(module.label)
			);
			inputs.forEach((input) => (module.memory[input.label] = false));
		});

	const queue = [];

	const addToQueue = (pulse, destinationName, sender) => {
		if (sender != null) {
			pulse === "high" ? sender.highPulsesSent++ : sender.lowPulsesSent++;
		}
		queue.unshift({
			pulse: pulse,
			module: modules.get(destinationName),
			sender: sender?.label ?? ""
		});
	};

	// there is only one module which can send a pulse to module rx, and that's module bn.
	// Module bn is a conjunction module, so it will only send a low pulse to rx when it has received a high pulse from all its inputs.
	// looking into button cycles (uncomment console.log statement below), i see that on cycles where one of
	// bn's inputs sends a high pulse, that same input will send a low pulse before the cycle has completed.
	// This means that bn will only send a low pulse to rx if all of bn's inputs send it a high pulse in the same cycle.
	// also each of bn's inputs regularly sends a high pulse to it every n cycles, and that each of those cycles
	// starts at the 0th button press.
	// Keep track of what n is for each input.
	const bnLoops = helpers.objetcs.mapValues(
		modules.get("bn")?.memory,
		() => null
	);
	let bnSenders = [];
	bnLoops.forEach((_, k) => bnSenders.push(k));
	let buttonPresses = 0;

	const pushButton = () => {
		buttonPresses++;
		addToQueue("low", "broadcaster");

		// process the queue
		while (queue.length > 0) {
			const item = queue.pop();
			if (item.module == null) {
				continue;
			}

			if (item.module.type === "broadcaster") {
				item.module.destinations.forEach((d) =>
					addToQueue("low", d, item.module)
				);
			} else if (item.module.type === "%" && item.pulse === "low") { // % flip-flops only send a pulse when receive a low pulse
				item.module.state = !item.module.state;
				item.module.destinations.forEach((d) =>
					addToQueue(item.module.state ? "high" : "low", d, item.module)
				);
			} else if (item.module.type === "&") {
				if (cyclesToBeFound) {
					if (item.module.label === "bn") {
						// for the first time that one of bn's inputs sends a high pulse, record the cycle length
						if (bnLoops[item.sender] == null && item.pulse === "high") {
							bnLoops[item.sender] = buttonPresses;
						}
					}
				}
				// remember the state of the input
				item.module.memory[item.sender] = (item.pulse === "high");
				const pulseToSend = !Object.values(item.module.memory).every((p) => p);
				// console.log( `${item.module.type}${item.module.label} with pulse ${pulseToSend?"high":"low"} to `, item.module.destinations );

				item.module.destinations.forEach((d) =>
					addToQueue(pulseToSend ? "high" : "low", d, item.module)
				);
			}
		}
	};

	for (let i = 0; i < limit; i++) {
		pushButton();

		if (cyclesToBeFound) {
			const allSentHighPulse =
				bnSenders.filter((sender) => bnLoops[sender] != null).length === bnSenders.length;

			if (allSentHighPulse) {
				const cycles = bnSenders.map((sender) => parseInt(bnLoops[sender], 10));
				return helpers.math.leastCommonMultiple(cycles);
			}
		}
	}

	//part1
	let totalLow = 1000; // every button push sends a low pulse in the beginning
	let totalHigh = 0;

	modules.forEach((module) => {
		totalLow += module.lowPulsesSent;
		totalHigh += module.highPulsesSent;
	});
	return totalLow * totalHigh;
}

function buildConfiguration(lines) {
	const modules = lines.map((line) => {
		let [from, to] = line.split(" -> ");
		const isBroadcaster = /broadcaster/.test(from);
		const label = isBroadcaster ? from : from.split("").slice(1).join("");
		return [
			label,
			{
				label: label,
				type: isBroadcaster ? from : from.split("")[0],
				destinations: to.split(", "),
				state: false,
				memory: {},
				lowPulsesSent: 0,
				highPulsesSent: 0
			}
		];
	});

	return new Map(modules);
}

module.exports = { emit1000Pulses, emitPulsesUntilCyclesFound };
