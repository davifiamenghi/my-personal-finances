import React, { Component } from 'react'

export class Input extends Component {

    render() {
        return (
            <input
                ref={input => this.input = input}
                className="form-control"
                name={this.props.name}
                onChange={this.props.timeChange}
                placeholder={this.props.placeholder}
                style={{ border: this.props.validate ? '1px solid #0062cc' : '1px solid red' }}
            />
        )
    }

    fill(value) {
        this.input.value = value;
    }    
}
