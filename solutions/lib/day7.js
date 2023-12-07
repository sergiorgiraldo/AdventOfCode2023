const faceCardNormalValues = {
	T: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14
};

const faceCardWithJokerValues = {
	T: 10,
	J: 1, //joker
	Q: 12,
	K: 13,
	A: 14
};

const gameValues = {
	HighCard: 1,
	Pair: 2,
	TwoPairs: 4,
	ThreeOfAKind: 8,
	FullHouse: 16,
	FourOfAKind: 32,
	FiveOfAKind: 64
};

function getTotalWinnings(hands) {
    sortHands(hands, sortTwoHandsDefault);
	
	return getWinnings(hands);
}

function getTotalWinningsWithJoker(hands) {
    sortHands(hands, sortTwoHandsWithJokers);

	return getWinnings(hands);
}

function sortHands(hands, sortMethod) {
    hands.sort((a, b) => {
      const cardsA = a.split(/\s+/)[0];
      const cardsB = b.split(/\s+/)[0];
      return sortMethod(cardsA, cardsB);
    });
  }

function getWinnings(hands) {
	hands.reverse();

	let totalWinnings = 0;

    hands.map((hand, index) => {
		const bid = hand.split(/\s+/)[1];
		totalWinnings += bid * (index + 1);
    });

	return totalWinnings;
}

function sortTwoHandsDefault(cardsA, cardsB) {
	const handValueA = calculateHandValue(cardsA);
	const handValueB = calculateHandValue(cardsB);

	if (handValueA === handValueB) {
		return findHigherCard(cardsA, cardsB, faceCardNormalValues);
	} else {
		return handValueA > handValueB ? -1 : 1;
	}
}

function sortTwoHandsWithJokers(cardsA, cardsB) {
	const possibleGamesA = getGamesWithJoker(cardsA);
	const handValueA = possibleGamesA
        .map((hand) => calculateHandValue(hand))
        .sort((a, b) => b - a)[0];

	const possibleGamesB = getGamesWithJoker(cardsB);
	const handValueB = possibleGamesB
		.map((hand) => calculateHandValue(hand))
		.sort((a, b) => b - a)[0];
	
    if (handValueA === handValueB) {
		return findHigherCard(cardsA, cardsB, faceCardWithJokerValues);
	} else {
		return handValueA > handValueB ? -1 : 1;
	}
}

function getGamesWithJoker(hand) {
	const jokerRegex = /J/g;

	if (!jokerRegex.test(hand)) return [hand];

	const handGame = getHandGame(hand);

	const possibleGames = Object.keys(handGame).map(card => hand.replace(jokerRegex, card));
	
	return possibleGames;
}

function calculateHandValue(hand) {
	const handGame = getHandGame(hand);

	let hasPair = false;
	let hasThreeOfAKind = false;
	for (const card in handGame) {
		const handRank = handGame[card];

		if (handRank === 5) return gameValues["FiveOfAKind"];
		
		if (handRank === 4) return gameValues["FourOfAKind"]; 
		
		if ((handRank === 3 && hasPair) || (handRank === 2 && hasThreeOfAKind)) return gameValues["FullHouse"]; 
		
		if (handRank === 2 && hasPair) return gameValues["TwoPairs"];

		if (handRank === 3) {
			hasThreeOfAKind = true;
		} else if (handRank === 2) {
			hasPair = true;
		}
	}
	
	if (hasThreeOfAKind) return gameValues["ThreeOfAKind"]; 
	
	if (hasPair) return gameValues["Pair"];

	return gameValues["HighCard"];
}

function getHandGame(hand) {
	const handGame = {};
	for (let i = 0; i < hand.length; i++) {
		handGame[hand[i]] = handGame[hand[i]] || 0;
		handGame[hand[i]] += 1;
	}
	return handGame;
}

function findHigherCard(cardsA, cardsB, cardValues) {
	for (let i = 0; i < cardsA.length; i++) {
		const cardA = cardsA[i];
		const cardB = cardsB[i];

		const handValueA = isNaN(cardA) ? cardValues[cardA] : cardA;
		const handValueB = isNaN(cardB) ? cardValues[cardB] : cardB;

		if (handValueA != handValueB) {
			return handValueA > handValueB ? -1 : 1;
		}
	}
	return 0;
}

module.exports = { getTotalWinnings, getTotalWinningsWithJoker };
