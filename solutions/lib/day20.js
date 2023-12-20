const helpers = require("./helpers");

function emit1000Pulses(lines) {
	const [modules, _] = emitPulses(lines, false);

	let totalLow = 1000; // every button push sends a low pulse in the beginning
	let totalHigh = 0;

	modules.forEach((module) => {
		totalLow += module.lowPulsesSent;
		totalHigh += module.highPulsesSent;
	});

	return totalLow * totalHigh;
}

function emitPulsesUntilCyclesFound(lines) {
	const [_, cycles] = emitPulses(lines, true);

	return helpers.math.leastCommonMultiple(cycles);
}

function emitPulses(lines, cyclesToBeFound) {
	let modules = buildConfiguration(lines);

	// for all & modules, find their inputs
	Array.from(modules.values())
		.filter((module) => module.type === "&")
		.forEach((module) => {
			const inputs = Array.from(modules.values()).filter((otherModule) =>
				otherModule.destinations.includes(module.label)
			);
			inputs.forEach((input) => (module.memory[input.label] = false));
		});

	let queue = [];

	// there is only one module which can send a pulse to module rx, and that's module bn.
	// Module bn is a conjunction module, so it will only send a low pulse to rx when it has received a high pulse from all its inputs.
	// looking into button cycles (uncomment console.log statement below), i see that on cycles where one of
	// bn's inputs sends a high pulse, that same input will send a low pulse before the cycle has completed.
	// This means that bn will only send a low pulse to rx if all of bn's inputs send it a high pulse in the same cycle.
	// also each of bn's inputs regularly sends a high pulse to it every n cycles, and that each of those cycles
	// starts at the 0th button press.

	let bnLoops = new Map(
		Object.keys(Array.from(modules).filter(([key, _]) => key === "bn")[0][1].memory)
		.map(key => [key, null])
	  );

	let bnSenders = [];
	bnLoops.forEach((_, k) => bnSenders.push(k));

	let buttonPresses = 0;
	let cycles = [];
	let cnt = 0;

	while (true){
		buttonPresses += 1;

		pushButton(modules, queue, bnLoops, buttonPresses);

		if (cyclesToBeFound) {
			const allSentHighPulse = bnSenders.filter((sender) => bnLoops[sender] != null).length === bnSenders.length;

			if (allSentHighPulse) {
				cycles = bnSenders.map((sender) => parseInt(bnLoops[sender], 10));
				break;
			}
		}
		else{
			cnt++;
			if (cnt == 1000) break;
		}
	}

	return [modules, cycles];
}

function pushButton(modules, queue, bnLoops, buttonPresses) {
	addToQueue(modules, queue, "low", "broadcaster");

	// process the queue
	while (queue.length > 0) {
		const item = queue.pop();
		if (item.module == null) {
			continue;
		}

		if (item.module.type === "broadcaster") {
			item.module.destinations.forEach((d) =>
				addToQueue(modules, queue, "low", d, item.module)
			);
		} else if (item.module.type === "%" && item.pulse === "low") { // % flip-flops only send a pulse when receive a low pulse
			item.module.state = !item.module.state;
			item.module.destinations.forEach((d) =>
				addToQueue(modules, queue, item.module.state ? "high" : "low", d, item.module)
			);
		} else if (item.module.type === "&") {
			if (item.module.label === "bn") {
				// for the first time that one of bn's inputs sends a high pulse, record the cycle length
				if (bnLoops[item.sender] == null && item.pulse === "high") {
					bnLoops[item.sender] = buttonPresses;
				}
			}
			// remember the state of the input
			item.module.memory[item.sender] = (item.pulse === "high");
			
			//if high pulses for all inputs, send a low pulse, ootherwise send a high pulse
			//const pulseToSend = !Object.values(item.module.memory).every((p) => p);
			const pulseToSend = !Object.values(item.module.memory).every((p) => p);

			// console.log( `${item.module.type}${item.module.label} with pulse ${pulseToSend?"high":"low"} to `, item.module.destinations );

			item.module.destinations.forEach((d) =>
				addToQueue(modules, queue, pulseToSend ? "high" : "low", d, item.module)
			);
		}
	}
};

function addToQueue(modules, queue, pulse, destinationName, sender) {
	if (sender != null) {
		pulse === "high" ? sender.highPulsesSent++ : sender.lowPulsesSent++;
	}
	queue.unshift({
		pulse: pulse,
		module: modules.get(destinationName),
		sender: sender?.label ?? ""
	});
};

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
