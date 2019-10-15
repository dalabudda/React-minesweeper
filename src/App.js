import React from 'react';
import './App.css';
import Mines from './Mines';
import Options from './Options';
import Time from './Time';
import Board from './Board';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.mines = 0;
        this.time = 0;
        this.board = 0;
        this.state = {
            count: 0,
            options: {
                sizeX: 30,
                sizeY: 20,
                mines: 100
            }
        };
    }

    loadOptions(options) {
        function validateX(sizeX) {
            const MIN_SIZE_X = 7;
            if (isNaN(sizeX))
                return MIN_SIZE_X;
            if (sizeX < MIN_SIZE_X)
                return MIN_SIZE_X;
            return sizeX;
        }
        function validateY(sizeY) {
            const MIN_SIZE_Y = 1;
            if (isNaN(sizeY))
                return MIN_SIZE_Y;
            if (sizeY < MIN_SIZE_Y)
                return MIN_SIZE_Y;
            return sizeY;
        }
        
        options.width = parseInt(options.width);
        options.height = parseInt(options.height);
        options.mines = parseInt(options.mines);

        let sizeX = validateX(options.width);
        let sizeY = validateY(options.height);

        function validateM(mines) {
            if (isNaN(mines))
                return 1;
            if (mines < 1)
                return 1;
            if (sizeX*sizeY <= 10)
                return 1;
            if (mines > (sizeX*sizeY - 9))
                return (sizeX*sizeY - 9);
            return mines;
        }

        let mines = validateM(options.mines);
        this.setState({
            count: this.state.count+1,
            options: {
                sizeX: sizeX,
                sizeY: sizeY,
                mines: mines
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <Mines parent={ this } />
                    <Options onSubmit={ options => this.loadOptions(options) } />
                    <Time key={ this.state.count } parent={ this } />
                </div>
                <Board key={ this.state.count } parent={ this } options={ this.state.options } />
            </div>
        );
    }
}

export default App;
