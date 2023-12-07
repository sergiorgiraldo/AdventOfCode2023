const faceCardNormalValues = {
	T: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14
};

const faceCardPlusJokerVals = {
	T: 10,
	J: 1, //joker
	Q: 12,
	K: 13,
	A: 14
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
		return findHigherCard(cardsA, cardsB, faceCardPlusJokerVals);
	} else {
		return handValueA > handValueB ? -1 : 1;
	}
}

function getGamesWithJoker(hand) {
	const jokerRegex = /J/;

	if (!jokerRegex.test(hand)) {
		return [hand];
	}

	const handGame = getHandGame(hand);

	const possibleGames = [];
	for (let card in handGame) {
		possibleGames.push(hand.replace(/J/g, card));
	}

	return possibleGames;
}

function calculateHandValue(hand) {
	const handGame = getHandGame(hand);

	let hasPair = false;
	let hasThreeOfAKind = false;

	for (const card in handGame) {
		const val = handGame[card];
		if (val === 5) {
			return 7; // Five of a kind
		} else if (val === 4) {
			return 6; // Four of a kind
		} else if ((val === 3 && hasPair) || (val === 2 && hasThreeOfAKind)) {
			return 5; // Full house
		} else if (val === 2 && hasPair) {
			return 3; // Two pairs
		} else if (val === 3) {
			hasThreeOfAKind = true;
		} else if (val === 2) {
			hasPair = true;
		}
	}

	if (hasThreeOfAKind) return 4;

	if (hasPair) return 2;

	return 1; // High card
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
