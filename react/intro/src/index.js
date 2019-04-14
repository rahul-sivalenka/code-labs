import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    render() {
        return (
            <button className="square" onClick={() => this.setState({ value: 'X' })}>{this.state.value}</button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />
    }
    render() {
        return (
            <div>
                <div className="status">Next Player: X</div>
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