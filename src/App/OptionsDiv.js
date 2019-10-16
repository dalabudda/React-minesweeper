import React from 'react';
import './OptionsDiv.css';
import OptionTr from './OptionsDiv/OptionTr';

class OptionsDiv extends React.Component {
    constructor(props) {
        super(props);
        this.input = 0;
        this.state = { 
            optionsOn: false
        };
    }

    switchOptions() {
        this.setState({ 
            optionsOn: !this.state.optionsOn
        });
    }

    render() {
        return (
            <div className="Options">
                <span onClick={ () => {this.switchOptions();} } >
                    Options
                </span>
                { this.state.optionsOn &&
                <div className="optionsBox">
                    <div onClick={ () => {this.switchOptions();} }>X</div>
                    <table>
                        <thead>
                            <tr>
                                <td className="firstTd"></td>
                                <td>Height</td>
                                <td>Width</td>
                                <td>Mines</td>
                            </tr>
                        </thead>
                        <tbody>
                            <OptionTr name="Beginner" height="9" width="9" mines="10" 
                                onChange={ child => this.input = child } />
                            <OptionTr name="Intermediate" height="16" width="16" mines="40" 
                                onChange={ child => this.input = child } />
                            <OptionTr name="Expert" height="16" width="30" mines="99" 
                                onChange={ child => this.input = child } />
                            <OptionTr name="Custom" height="17" width="28" mines="100" 
                                onChange={ child => this.input = child } />
                        </tbody>
                    </table>
                    <input className='newGame' type='button' value='New Game' 
                        onClick={ () => {
                            this.switchOptions();
                            this.props.onSubmit(this.input.getOptions());
                        } } />
                </div>
                }
            </div>
        );
    }
}

export default OptionsDiv;
