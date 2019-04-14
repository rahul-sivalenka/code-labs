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
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
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
            xIsNext: true
        };
    }


    handleClick(i) {
        const { xIsNext, history } = this.state;
        const current = history[history.length - 1];
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
            xIsNext: !xIsNext
        });
    }

    resetGame() {
        this.setState({
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            winner: null
        });
    }

    render() {

        const { xIsNext, history } = this.state;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const status = winner ? `Player ${winner} wins!` : `Next Player: ${xIsNext ? 'X' : 'O'}`;

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
                    <ol>{/* TODO */}</ol>
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