/**
 * @jest-environment jsdom
 */


// Importamos el archivo

const { string } = require("yargs");
const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");
// const { beforeEach, afterEach } = require("node:test");

// usamos jest spyOn para testear una ventana
jest.spyOn(window, "alert").mockImplementation(() => {});
// Cargamos nuestra pagina y su contenido.
beforeAll(()=> {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

describe("pre-game", () => {
    test("clicking buttons before newGame should fail", () => {
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});

describe("game object contains correct keys",()=>{
    test("score keys exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists",() => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () =>{
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key existe", () => {
        expect("choices" in game).toBe(true);
    });
    test("type of choices is array", () => {
        expect(Array.isArray(game.choices)).toBe(true);
    });
    test("choices contain corrects ids", () => {
        expect(game.choices).toEqual(["button1","button2","button3","button4"]);
    });
})

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1","button2"];
        game.currentGame = ["button1","button2"];
        document.getElementById("score").innerText = 42;
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should set playerMoves to zero", () => {
        expect(game.playerMoves).toEqual([]);
    });
    test("should display 0 for the element with of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements){
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
})

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves =[];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button =document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.TurnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!")
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
})

