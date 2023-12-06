function LetsWinTheRace(lines){
    let times = lines[0].split(":")[1].trim().split(/\s+/).map(Number);
    let distances = lines[1].split(":")[1].trim().split(/\s+/).map(Number);

    let possibilities = Array(times.length).fill(0);
    for (let i = 0; i < times.length; i++) {
        let time = times[i];
        let distance = distances[i];
        for (let j = 1; j < time; j++) {
            let total = j * (time - j);
            if (total > distance) {
                possibilities[i] += 1;
            }
        }
    }

    return possibilities.reduce((a, b) => a * b, 1);

}

function LetsWinTheRace_Kerning(lines){
    let times = lines[0].split(":")[1].trim().split(/\s+/).map(Number);
    let distances = lines[1].split(":")[1].trim().split(/\s+/).map(Number);

    let time = parseInt(times.join(''));
    let distance = parseInt(distances.join(''));

    let possibilities = 0;

    for (let j = 1; j < time; j++) {
        let total = j * (time - j);
        if (total > distance) {
            possibilities += 1;
        }
        else if (j > (time/3)) {
            break;
        }
    }

    return possibilities;

}

module.exports = { LetsWinTheRace, LetsWinTheRace_Kerning };