function calculateWinningPoints(line) {
	const parts = line.split(":");
	const winningGame = parts[1].split("|")[0].trim().split( /\s+/ );
	const myGame = parts[1].split("|")[1].trim().split( /\s+/ );
	let winningPoints = 0;
    for (card in myGame) {
        if (winningGame.includes(myGame[card].trim())) {
            winningPoints = ( winningPoints == 0 ) ? 1 : winningPoints * 2;
        }
    }
	return winningPoints;
}

var cards = []; // { winningNums, cardNums }

function getNewCards(lines){
    if( cards.length == 0 ){ convertLinesToCards(lines); }

    let numCards = Array( lines.length ).fill( 1 );
    cards.forEach( ( card, i ) => {
        var nextCards = 0;
        for( num of card.cardNums ){
            if( card.winningNums.includes( num ) ){
                nextCards++;
            }
        }
        // copies
        let numCardsCurrIndex = numCards[ i ];
        for( let n = i+1, m = i+1+nextCards; n < m; n++ ){
            numCards[n] += numCardsCurrIndex;
        }
    } );
    return numCards.reduce( ( total, item ) => total + item );
}

const convertLinesToCards = (lines) => {
    lines.forEach( ( line, i ) => {
        let [ winningString, cardString ] = line.split( ': ' )[ 1 ].split( ' | ');
        cards.push( {
            winningNums: winningString.trim().split( /\s+/ ),
            cardNums:    cardString.trim().split( /\s+/ )
        } );
    } );
};

module.exports = { calculateWinningPoints, getNewCards };
