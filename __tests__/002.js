const lib002 = require("../lib/002");

test("Game 1-Allowed", () => {
    const game="Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
    expect(lib002.isAllowed(game).allowed).toBe(true);
    expect(lib002.isAllowed(game).id).toBe("1");
});

test("Game 2-Allowed", () => {
    const game="Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue";
    expect(lib002.isAllowed(game).allowed).toBe(true);
    expect(lib002.isAllowed(game).id).toBe("2");
});

test("Game 3-NotAllowed", () => {    
    const game="Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red";
    expect(lib002.isAllowed(game).allowed).toBe(false);
    expect(lib002.isAllowed(game).id).toBe("3");
});

test("Game 4-NotAllowed", () => {
    const game="Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red";
    expect(lib002.isAllowed(game).allowed).toBe(false);
    expect(lib002.isAllowed(game).id).toBe("4");
});

test("Game 5-Allowed", () => {
    const game="Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
    expect(lib002.isAllowed(game).allowed).toBe(true);
    expect(lib002.isAllowed(game).id).toBe("5");
});

test("Game 1-Power", () => {
    const power = lib002.getPower("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");
    expect(power).toBe(48);
});

test("Game 2-Power", () => {
    const power = lib002.getPower("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue");
    expect(power).toBe(12);
});

test("Game 3-Power", () => {    
    const power = lib002.getPower("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red");
    expect(power).toBe(1560);
});

test("Game 4-Power", () => {
    const power = lib002.getPower("Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red");
    expect(power).toBe(630);
});

test("Game 5-Power", () => {
    const power = lib002.getPower("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green");
    expect(power).toBe(36);
});