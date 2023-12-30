const submit = async () => {
	const { AocClient } = require("advent-of-code-client");
	const { position } = require("promise-path");
	const fromHere = position(__dirname);
	const fs = require("fs");
	require("dotenv").config();

	const session = process.env.SESSION;
	const currentPath = fromHere("/");
	const currentFolder = currentPath.split("/").reverse()[1];
	const currentYear = currentFolder.slice(-4);

	const dayOfChallenge = process.argv[2];
	const part = process.argv[3];

	const answerPath =
		currentPath + "solutions/day" + dayOfChallenge + "/answer.txt";
	const answersContent = fs.readFileSync(answerPath).toString();
	let answer;

	const getAnswer = (ans) => {
		if (ans.startsWith("\"")) {
			return ans.replace(/"/g, "");
		}
		else{
			return +ans;
		}
	}

	if (part === "1") {
		const part1 = answersContent.split("\n")[0];
		answer = getAnswer(part1.split(",")[1]);
	} else if (part === "2") {
		const part2 = answersContent.split("\n")[1];
		answer = getAnswer(part2.split(",")[1]);
	} else {
		console.log("I dont have answer for this yet");
		exit(0);
	}

	const client = new AocClient({
		year: currentYear, // the year of the challenge
		day: dayOfChallenge, // the day of the challenge
		token: session // the session cookie from adventofcode.com
	});

	try {
		const success = await client.submit(+part, answer);

		console.log(`status of answer for ${currentYear}-${dayOfChallenge} is: ${success}`);
	} catch (err) {
		console.log(err);
	}

    process.exit(0);
};

submit();