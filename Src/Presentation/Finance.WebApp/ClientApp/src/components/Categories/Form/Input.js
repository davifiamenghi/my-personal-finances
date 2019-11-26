import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

export class Input extends Component {

    render() {
        return (
            <Form.Control
                ref={input => this.input = input}
                className="categoryInput"
                onChange={(e) => this.props.func(e)}
                id={this.props.data}
                name={this.props.data}
                type={this.props.type}
                placeholder={this.props.name}
                style={{ border: this.props.validate ? '1px solid #0062cc' : '1px solid red' }}
                autoComplete="off"
            />
        )
    }

    clear() {
        this.input.value = '';
    }

    fill(value) {
        this.input.value = value;
    }
}
