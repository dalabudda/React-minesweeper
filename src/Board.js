import React from 'react';
import './Board.css';
import Cell from './Cell';
import Highlight from './Highlight';
import generateBoard from './BoardGenerator';

class Board extends React.Component {
    constructor(props) {
        super(props);
        props.parent.board = this;
        this.loadOptions(props.options);
        this.updateMines();
        this.highlight = new Highlight(this);
        this.cells = [this.sizeY];
        for (let y = 0; y < this.sizeY; ++y) {
            this.cells[y] = [this.sizeX];
        }
    }

    loadOptions(options) {
        this.sizeY = options.sizeY;
        this.sizeX = options.sizeX;
        this.allMines = options.mines;
        this.minesLeft = options.mines;
    }

    isInside(x, y) {
        return (y >=0 && y < this.sizeY &&
                x >=0 && x < this.sizeX);
    }

    forArea(X, Y, callback) {
        for (let y = Y-1; y <= Y+1; ++y) {
            for (let x = X-1; x <= X+1; ++x) {
                if (this.isInside(x, y))
                    callback(this.cells[y][x]);
            }
        }
    }

    forAll(callback) {
        for (let y = 0; y < this.sizeY; ++y) {
            for (let x = 0; x < this.sizeX; ++x) {
                callback(this.cells[y][x]);
            }
        }
    }

    checkArea(cell) {
        let x = cell.props.pos.x;
        let y = cell.props.pos.y;
        let count = this.countFlagsAndHidden(x, y);
        let view = 'c' + count.flags;
		if (cell.state.view == view)
			this.showArea(x, y);
		else {
            view = 'c' + (count.flags + count.hidden);
            if (cell.state.view == view)
                this.flagArea(x, y);
        }
    }
    
	countFlagsAndHidden(x, y) {
		let count = {flags: 0, hidden: 0};
		this.forArea(x, y, cell => {
			if (cell.state.view == 'flag')
				count.flags++;
			else if (cell.state.view == 'hidden')
				count.hidden++;
		});
		return count;
    }
    
	showArea(x, y) {
		this.forArea(x, y, cell => {
			if (cell.state.view == 'hidden')
                cell.show();
		});
    }
    
	flagArea(x, y) {
		if (this.minesLeft > 0) {
			let that = this;
			this.forArea(x, y, cell => {
				if (cell.state.view == 'hidden')
					cell.placeFlag();
            });
		}
    }
    
    updateMines() {
        this.props.parent.mines.setState({
            value: this.minesLeft
        });
    }

    minesLeftChange(difference) {
        this.minesLeft += difference;
        this.updateMines();
        if (this.minesLeft == 0)
            this.checkWin();
    }

    checkWin() {
		let win = true;
		this.forAll(cell => {
			if ((cell.type == 'mine') != (cell.state.view == 'flag'))
				win = false;
		});
		if (win)
			this.win();
    }
    
	win() {
        this.props.parent.time.stopTimer();
		this.forAll(cell => {
            if (cell.state.view == 'hidden')
                cell.setState({ view: cell.type });
        });
    }
    
    loss() {
        this.props.parent.time.stopTimer();
        this.forAll(cell => {
            if (cell.type == 'mine') {
                if (cell.state.view == 'hidden')
                    cell.setState({ view: 'mine' });
            }
            else if (cell.state.view == 'flag')
                cell.setState({ view: 'fakeMine' });
        });
    }

    generate(pos) {
        generateBoard(this, pos.x, pos.y);
        this.props.parent.time.startTimer();
    }

    renderCell(x, y) {
        const pos = {
            x: x,
            y: y
        };
        return (
            <Cell 
                pos={ pos } 
                parent={ this }
            />
        );
    }

    renderCells() {
        let cells = [];
        for (let y = 0; y < this.sizeY; ++y) {
            for (let x = 0; x < this.sizeX; ++x) {
                cells.push(this.renderCell(x, y));
            }
            cells.push(<br/>);
        }
        return cells;
    }

    render() {
        return (
            <div className="Board">
                { this.renderCells() }
            </div>
        );
    }
}

export default Board;
