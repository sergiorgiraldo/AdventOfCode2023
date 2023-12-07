function calculateWinningPoints(line) {
	const parts = line.split(":");
	const winningGame = parts[1].split("|")[0].trim().split(/\s+/);
	const myGame = parts[1].split("|")[1].trim().split(/\s+/);
	let winningPoints = 0;
    for (card in myGame) {
        if (winningGame.includes(myGame[card].trim())) {
            winningPoints = (winningPoints === 0) ? 1 : winningPoints * 2;
        }
    }
	return winningPoints;
}

function getNewCards(lines){
    const cards = convertLinesToCards(lines); 

    let numCards = Array(lines.length ).fill(1);
    cards.forEach((card, i) => {
        let nextCards = 0;
        for(num of card.myNumbers ){
            if(card.winningNumbers.includes(num) ){
                nextCards++;
            }
        }
        // copies
        let numCardsCurrIndex = numCards[i];
        for( let n = i+1, m = i+1+nextCards; n < m; n++ ){
            numCards[n] += numCardsCurrIndex;
        }
    } );
    return numCards.reduce((total, item) => total + item);
}

function convertLinesToCards(lines){
    var cards = [];
    lines.forEach((line) => {
        let [winningString, cardString] = line.split(": ")[1].split(" | ");
        cards.push(
            {
                winningNumbers: winningString.trim().split(/\s+/),
                myNumbers: cardString.trim().split(/\s+/)
            }
        );
    } );
    return cards;
};

module.exports = { calculateWinningPoints, getNewCards };
