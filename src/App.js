import React from 'react';
import './App.css';
import Mines from './App/Mines';
import OptionsDiv from './App/OptionsDiv';
import Time from './App/Time';
import Board from './App/Board';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.time = 0;
        this.board = 0;
        this.state = {
            count: 0,
            options: {
                sizeX: 30,
                sizeY: 20,
                mines: 100
            },
            minesLeft: 100
        };
    }

    loadOptions(options) {
        this.setState({
            count: this.state.count+1,
            options: options
        });
    }

    setMines(mines) {
        this.setState({ minesLeft: mines });
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <Mines value={ this.state.minesLeft } />
                    <OptionsDiv onSubmit={ options => this.loadOptions(options) } />
                    <Time key={ this.state.count } parent={ this } />
                </div>
                <Board key={ this.state.count } parent={ this } options={ this.state.options } />
            </div>
        );
    }
}

export default App;
