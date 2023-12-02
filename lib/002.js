function isAllowed(line) {
    const max = {
        "red": 12,
        "green": 13,
        "blue": 14,
    }    
    let allowed = true;
    const parts = line.split(":");
    const id = parts[0].split(" ")[1].toString();
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
    return {
        id: id,
        allowed: allowed
    };
}

function getPower(line) {
    let maxRed = 1;
    let maxGreen = 1;
    let maxBlue = 1;
    let power = 1;
    const parts = line.split(":");
    const picks = parts[1].trim().split(";");
    for (let i = 0; i < picks.length; i++) {
        const outcomes = picks[i].trim().split(",");
        for (let j = 0; j < outcomes.length; j++) {
            const number = outcomes[j].trim().split(" ")[0];
            const color = outcomes[j].trim().split(" ")[1];
            if (color == "red" && number > maxRed) {
                maxRed = parseInt(number, 10);
            }
            if (color == "green" && number > maxGreen) {
                maxGreen = parseInt(number, 10);
            }
            if (color == "blue" && number > maxBlue) {
                maxBlue = parseInt(number, 10);
            }
        }
    }
    power = maxRed * maxGreen * maxBlue;
    return power;
}

module.exports = {isAllowed, getPower};