import Player from "./components/Player.jsx";
import './index.css'
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer(turns) {
    let activePlayer = 'X'
    if (turns.length > 0 && turns[0].player === 'X') {
        activePlayer = 'O'
    }
    return activePlayer;
}

function App() {
    let winner;
    const [players, setPlayers] = useState({
        X: 'Player 1',
        O: 'Player 2',
    })
    const [gameTurns, setGameTurns] = useState([])
    const activePlayer = deriveActivePlayer(gameTurns)
    const gameBoard = [...initialBoard.map(inner => [...inner])];

    for (const tune of gameTurns) {
        const {square, player} = tune
        const {row, col} = square
        gameBoard[row][col] = player
    }

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

        if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            winner = firstSymbol
        }
    }

    const hasDraw = gameTurns.length == 9 && !winner;

    const handleActiveSquare = (row, col) => {
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns)
            const updatedTurns = [{square: {row, col}, player: currentPlayer}, ...prevTurns]
            return updatedTurns
        })
    }

    const retriesHandler = () => {
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol, name) {
        setPlayers(prevPlayers => ({...prevPlayers, [symbol]: name}))
    }

    return (
        <menu>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player setPlayerName={handlePlayerNameChange}
                            playerName={players['X']}
                            symbol='X'
                            isActive={activePlayer === 'X'}/>
                    <Player setPlayerName={handlePlayerNameChange}
                            playerName={players['O']}
                            symbol='O'
                            isActive={activePlayer === 'O'}/>
                </ol>
                {(winner || hasDraw) && <GameOver players={players}
                                                  retriesHandler={retriesHandler}
                                                  winner={winner}/>}
                <GameBoard board={gameBoard} onSelectSquare={handleActiveSquare}/>
            </div>
            <Log turns={gameTurns}/>
        </menu>
    )
}

export default App