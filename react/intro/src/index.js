import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <div>{this.props.value}</div>
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
                <div>
                    <div>{this.renderSquare(0)}</div>
                    <div>{this.renderSquare(1)}</div>
                    <div>{this.renderSquare(2)}</div>
                </div>
                <div>
                    <div>{this.renderSquare(3)}</div>
                    <div>{this.renderSquare(4)}</div>
                    <div>{this.renderSquare(5)}</div>
                </div>
                <div>
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