const { BattleShip } = require("./battleship");
const { Gameboard } = require("./board");
const { Player } = require("./player");

let battleship;
let gameboard;
let players = [];
let boatArray = [];
describe("Without boat placed" , ()=> {
    beforeEach(() => {
    battleship = new BattleShip(3);
    gameboard = new Gameboard(7,7);
    });

    test('Get ship length', () => {
        expect(battleship.length).toBe(3);
    });

    test('Get number of hits', () => {
        expect(battleship.hits).toBe(0);
    });

    test('Initiate hit', () => {
        expect(battleship.hit()).toBe(1);
    });

    test('Test sunken', () => {
        expect(battleship.isSunk()).toBe(false);
    });

    test('Place Boats', () => {
        expect(gameboard.placeBoat([0,0],[0,4])).toMatchObject([[0,0],[0,1],[0,2],[0,3],[0,4]]);
    });

});

describe("With boat placed" , ()=> {
        beforeEach(() => {
        battleship = new BattleShip(3);
        gameboard = new Gameboard(7,7);
        gameboard.placeBoat([0,0],[0,4]);
    });
    test('Attack Boats Hit', () => {
        expect(gameboard.receiveAttack([0,2])).toBe(true);
    });

    test('Attack Boats Miss', () => {
        expect(gameboard.receiveAttack([1,2])).toBe(false);
    });

    test('Attack Boats Miss', () => {
        expect(gameboard.receiveAttack([2,2])).toBe(false);
    });

    test('Attack Boats Hit', () => {
        expect(gameboard.receiveAttack([0,0])).toBe(true);
    });

    test('Attack Boats Hit', () => {
        expect(gameboard.receiveAttack([0,1])).toBe(true);
    });

    test('Attack Boats Hit', () => {
        expect(gameboard.receiveAttack([0,3])).toBe(true);
    });

    test('Attack Boats Hit', () => {
        expect(gameboard.receiveAttack([0,4])).toBe(true);
    });

});

describe("With boat placed and hits and misses" , ()=> {
        beforeEach(() => {
        battleship = new BattleShip(3);
        gameboard = new Gameboard(7,7);
        gameboard.placeBoat([0,0],[0,4]);
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([0,1]);
        gameboard.receiveAttack([0,2]);
        gameboard.receiveAttack([0,3]);
        gameboard.receiveAttack([0,4]);
        gameboard.receiveAttack([1,2]);
        gameboard.receiveAttack([2,2]);
    });
    
    test('Get misses', () => {
        expect(gameboard.getMisses()).toMatchObject([[1,2],[2,2]]);
    });

    test('Get hits', () => {
        expect(gameboard.getHits()).toMatchObject([[0,0],[0,1],[0,2],[0,3],[0,4]]);
    });

    test('Are all ships sunk true', () => {
        expect(gameboard.allShipsSunk()).toBe(true);
    });
});

describe("Creating Players" , ()=> {
        beforeEach(() => {
        players.push(new Player("player"));
        players.push(new Player("computer"));
    });
    
    test('Get player type of Player', () => {
        expect(players[0].type).toBe("player");
    });
    test('Get player type of computer', () => {
        expect(players[1].type).toBe("computer");
    });

    test('Set Boats Player', () => {
        expect(players[0].setBoats(boatArray)).toBe(4);
    });
    test('Set Boats Computer', () => {
        expect(players[1].setBoats(4)).toBe(4);
    });
});