import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: props.value
//         };
//     }

//     render() {
//         return (
//             <button className="square" 
//                     onClick={() => this.setState({ value: 'X' })}>
//                 {this.state.value}
//             </button>
//         );
//     }
// }

function Square (props) {
    return (
        <button className="square" 
                onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} 
                       onClick={() => this.handleClick(i)} />
    }

    handleClick(i) {
        const { xIsNext, winner } = this.state;
        const squares = this.state.squares.slice();
        
        if (winner || squares[i]) {
            // Do Nothing
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            squares,
            xIsNext: !xIsNext,
            winner: this.calculateWinner(squares)
        });
    }

    calculateWinner(squares) {
        /*
        [ 
            0 1 2
            3 4 5
            6 7 8 
        ]
        */
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        let winner;

        for(let i = 0, ln = winningCombinations.length; i < ln; i++) {
            const [a, b, c] = winningCombinations[i];

            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                winner = squares[a];
                break;
            }
        }

        return winner;
    }

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null
        });
    }

    render() {
        const { xIsNext, winner } = this.state;
        const status = winner ? `Player ${winner} wins!` : `Next Player: ${xIsNext ? 'X' : 'O'}`;
        let resetBtn;
        
        if (winner) {
            resetBtn = <button className="reset-btn" onClick={() => this.resetGame()}>Restart</button>;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    <div>{this.renderSquare(0)}</div>
                    <div>{this.renderSquare(1)}</div>
                    <div>{this.renderSquare(2)}</div>
                </div>
                <div className="board-row">
                    <div>{this.renderSquare(3)}</div>
                    <div>{this.renderSquare(4)}</div>
                    <div>{this.renderSquare(5)}</div>
                </div>
                <div className="board-row">
                    <div>{this.renderSquare(6)}</div>
                    <div>{this.renderSquare(7)}</div>
                    <div>{this.renderSquare(8)}</div>
                </div>
                <div>
                    {resetBtn}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div>
                <Board />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)