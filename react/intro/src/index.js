import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square"
            onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} />
    }

    render() {
        const boardSize = 3;
        const rows = [];

        for (let i = 0; i < boardSize; i++) {
            const columns = [];
            for (let j = 0; j < boardSize; j++) {
                columns.push(this.renderSquare(boardSize * i + j))
            }
            rows.push((
                <div className="board-row">
                    {columns}
                </div>
            ));
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }


    handleClick(i) {
        const { xIsNext, stepNumber } = this.state;
        const history = this.state.history.slice(0, stepNumber + 1);
        const current = history[stepNumber];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            // Do Nothing
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares
            }]),
            stepNumber: history.length,
            xIsNext: !xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    resetGame() {
        this.setState({
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        });
    }

    render() {
        const { xIsNext, history, stepNumber } = this.state;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        const status = winner ? `Player ${winner} wins!` : `Next Player: ${xIsNext ? 'X' : 'O'}`;

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : `Go to game start`;

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let gameActions;
        if (winner) {
            gameActions = (
                <div className="game-actions">
                    <button onClick={() => this.resetGame()}>Restart</button>
                </div>
            );
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    {gameActions}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

function calculateWinner(squares) {
    /*
    [ 
        0 1 2
        3 4 5
        6 7 8 
    ]
    */
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner;

    for (let i = 0, ln = winningCombinations.length; i < ln; i++) {
        const [a, b, c] = winningCombinations[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner = squares[a];
            break;
        }
    }

    return winner;
}