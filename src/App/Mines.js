import React from 'react';
import './Mines.css';

class Mines extends React.Component {
    constructor(props) {
        super(props);
        props.parent.mines = this;
        this.state = { value: 0 };
    }

    render() {
        return (
             <div className="Mines">
                  Mines: { this.state.value }
             </div>
        );
    }
}

export default Mines;
