import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class Input extends Component {

    render() {
        return (
            <Form.Control
                ref={input => this.input = input}
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
