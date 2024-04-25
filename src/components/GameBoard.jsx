export default function GameBoard({onSelectSquare, board}) {
    return <ol id="game-board">
        {board.map((boardRow, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {boardRow.map((boardCol, colIndex) =>
                        <li key={colIndex}>
                            <button disabled={boardCol != null}
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                            >{boardCol}</button>
                        </li>
                    )}
                </ol>
            </li>)
        }
    </ol>
}