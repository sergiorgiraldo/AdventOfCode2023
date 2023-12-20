function calculateWinningPoints(line) {
    const cards = convertLinesToCards([line])[0]; 

    const included = cards.myNumbers.filter(num => cards.winningNumbers.includes(num));

    const winningPoints = included.some(a=>a)?2 ** (included.length - 1):0;

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
