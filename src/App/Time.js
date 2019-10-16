import React from 'react';
import './Time.css';

class Time extends React.Component {
    constructor(props) {
        super(props);
        props.parent.time = this;
        this.state = { value: 0 };
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.setState({
                value: this.state.value + 1 
            });
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="Time">
                Time: { this.state.value }
            </div>
        );
    }
}

export default Time;
