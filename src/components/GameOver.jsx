import React from 'react';

const GameOver = ({winner, retriesHandler, players}) => {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It's draw</p>}
            <p>
                <button onClick={retriesHandler}>Rematch!</button>
            </p>
        </div>
    );
};

export default GameOver;