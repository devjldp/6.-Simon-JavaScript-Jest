/* Estructura:

    game{object}:{
        score - integer
        currentGame - array
        playerMoves - array
        choices -array
    }
    newGame()
    addTurn()
    showTurn()
    lightOn()
    playerTurn()
    showScore() */


let game = {
    score: 0
}


// Uso {} porque voy a exportar mas de un objeto o funcion
module.exports = {game};
