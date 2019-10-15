import React from 'react';

class OptionTr extends React.Component {
    constructor(props) {
        super(props);
        this.height = props.height;
        this.width = props.width;
        this.mines = props.mines;
        if (props.name == 'Custom')
            props.onChange(this);
    }

    getOptions() {
        return {
            height: this.height,
            width: this.width,
            mines: this.mines
        };
    }

    render() {
        return (
            <tr>
                {(this.props.name == 'Custom')? (
                    <>
                    <td><input type="radio" name="option" defaultChecked="true" 
                        onChange={() => this.props.onChange(this)} />{ this.props.name }</td>
                    <td><input type='text' size='4' defaultValue={ this.height } 
                        onChange={event => this.height = event.target.value} /></td>
                    <td><input type='text' size='4' defaultValue={ this.width } 
                        onChange={event => this.width = event.target.value} /></td>
                    <td><input type='text' size='4' defaultValue={ this.mines } 
                        onChange={event => this.mines = event.target.value} /><br/></td>
                    </>
                ) : (
                    <>
                    <td><input type="radio" name="option" 
                        onChange={() => this.props.onChange(this)} />{ this.props.name }</td>
                    <td>{ this.height }</td>
                    <td>{ this.width }</td>
                    <td>{ this.mines }</td>
                    </>
                )}
            </tr>
        );
    }
}

export default OptionTr;
