const lib004 = require("../solutions/lib/004");

test("Winning Points - game 1", () => {
    const game="Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
    expect(lib004.calculateWinningPoints(game)).toBe(8);
});

test("Winning Points - game 2", () => {
    const game="Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19";
    expect(lib004.calculateWinningPoints(game)).toBe(2);
});

test("Winning Points - game 3", () => {
    const game="Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1";
    expect(lib004.calculateWinningPoints(game)).toBe(2);
});

test("Winning Points - game 4", () => {
    const game="Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83";
    expect(lib004.calculateWinningPoints(game)).toBe(1);
});

test("Winning Points - game 5", () => {
    const game="Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36";
    expect(lib004.calculateWinningPoints(game)).toBe(0);
});

test("Winning Points - game 6", () => {
    const game="Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";
    expect(lib004.calculateWinningPoints(game)).toBe(0);
});

test("Winning Points - game 7", () => {
    const game="Card   7: 89 59 76  2 60 83 21 37 92 45 | 79  5 41 92 45 59 72 50 89 37 64 65 60 54 57 22 66 21 25 76  1 39 83  2 33";
    expect(lib004.calculateWinningPoints(game)).toBe(512);
});

test("Winning Scratchcards", () => {
    const lines = [];
    lines.push("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");
    lines.push("Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19");
    lines.push("Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1");
    lines.push("Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83");
    lines.push("Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36");
    lines.push("Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11");
    expect(lib004.getNewCards(lines)).toBe(30);
});






