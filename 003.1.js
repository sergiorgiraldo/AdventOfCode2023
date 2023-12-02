const readline = require("readline");
const fs = require("fs");
const max = {
    "red": 12,
    "green": 13,
    "blue": 14,
}
const readInterface = readline.createInterface({
	input: fs.createReadStream("002.txt")
});
let result=0;
readInterface.on("line", function (line) {
    let allowed = true;
    const parts = line.split(":");
    const id = parts[0].split(" ")[1];
    const picks = parts[1].trim().split(";");
    for (let i = 0; i < picks.length; i++) {
        if (!allowed) break;
        const outcomes = picks[i].trim().split(",");
        for (let j = 0; j < outcomes.length; j++) {
            const number = outcomes[j].trim().split(" ")[0];
            const color = outcomes[j].trim().split(" ")[1];
            if (number > max[color]) {
                allowed = false;
                break;
            }
        }
    }
    if (allowed) result += parseInt(id, 10);
});
readInterface.on("close", function () {
	console.log(`${result}`);
});
//2006