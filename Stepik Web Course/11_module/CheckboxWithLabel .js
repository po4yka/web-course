import React from 'react';

export default class CheckboxWithLabel extends React.Component {
    constructor() {
        super();

        this.labelOn = "On";
        this.labelOff = "Off";
        this.state = {
            value: this.labelOff,
            active: false
        };

            // Эта привязка обязательна для работы `this` в колбэке.
            this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.state.active) {
            this.setState({value: this.labelOff, active: false});
        } else {
            this.setState({value: this.labelOn, active: true});
        }       
    }

    render() {
        return (
          <label><input type="checkbox" onChange={this.handleClick}/>{this.state.value}</label>
        );
    }                                                               
}