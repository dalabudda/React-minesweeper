import React from 'react';
import './Cell.css';

const cellChar = {
    c0: ' ',
    c1: '1',
    c2: '2',
    c3: '3',
    c4: '4',
    c5: '5',
    c6: '6',
    c7: '7',
    c8: '8',
    mine: 'M',
    flag: 'F',
    fakeMine: 'N',
	hidden: ' ',
    mistake: 'X',
    highlight: ' '
};

let Events = {
    leftClick: false,
    rightClick: false,
    stopEvents: false
};

class Cell extends React.Component {
    constructor(props) {
        super(props);
        props.parent.cells[props.pos.y][props.pos.x] = this;
        this.type = 'hidden';
        this.state = { view: 'hidden' };
        if (Events.stopEvents)
            Events.stopEvents = false;
    }

    show() {
        let props = this.props;
        if (this.type == 'hidden')
            props.parent.generate(props.pos);

        if (this.type == 'mine') {
            this.setState({ view: 'mistake' }, () => {
                Events.stopEvents = true;
                props.parent.loss();
            });
        }
        else {
            this.setState({ view: this.type });//uncover
            if (this.type == 'c0') {
                setTimeout(() => {
                    props.parent.forArea(props.pos.x, props.pos.y, cell => {
                        if (cell.state.view == 'hidden')
                            cell.show();
                        else if (cell.state.view == 'flag') {
                            cell.deleteFlag();
                            cell.show();
                        }
                    });
                }, 1);
            }
        }
    }

    placeFlag() {
        let parent = this.props.parent;
        if (parent.minesLeft > 0) {
            this.setState({ view: 'flag' });
            parent.minesLeftChange(-1);
        }
    }

    deleteFlag() {
        this.setState({ view: 'hidden' });
        this.props.parent.minesLeftChange(1);
    }

    leftClick() {
        if (this.state.view == 'hidden')
            this.show();
        else if (this.state.view == 'flag')
            this.deleteFlag();
    }

    rightClick() {
        if (this.state.view == 'hidden')
            this.placeFlag();
        else if (this.state.view == 'flag')
            this.deleteFlag();
    }

    bothClick() {
        this.props.parent.highlight.update(this.props.pos.x, this.props.pos.y);
		if (this.state.view >= 'c1' && this.state.view <= 'c8')
			this.props.parent.checkArea(this);
    }

    mouseUp(event) {
        if (Events.stopEvents)
            return;

        if (event.button == 0) {
            this.leftClick();
            Events.leftClick = false;
            if (Events.rightClick)
                this.props.parent.highlight.clear();
        }
        else if (event.button == 2) {
            this.rightClick();
            Events.rightClick = false;
            if (Events.leftClick)
                this.props.parent.highlight.clear();
        }
    }

    mouseDown(event) {
        if (Events.stopEvents)
            return;

        if (event.button == 0)
            Events.leftClick = true;
        else if (event.button == 2)
            Events.rightClick = true;
        if (Events.leftClick && Events.rightClick)
            this.bothClick();
    }

    render() {
        let classN = "Cell " + this.state.view;
        return (
            <div
                onContextMenu={ event => event.preventDefault() }  
                className={ classN }
                onMouseUp={ event => this.mouseUp(event) } 
                onMouseDown={ event => this.mouseDown(event) }
            >
                { cellChar[this.state.view] }
            </div>
        );
    }
}

export default Cell;
