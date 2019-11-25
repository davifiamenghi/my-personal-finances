import React, { Component } from 'react'
import { Form } from 'react-bootstrap';

export class Input extends Component {

    render() {
        return (this.getInput())
    }

    clear() {
        this.input.value = '';
    }

    fill(value) {
        this.input.value = value;
    }


    getInput = () => {
        if (this.props.type === 'number') {
            return (
                <Form.Control
                    ref={input => this.input = input}
                    min="1"
                    step="0.01"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                    placeholder={this.props.name}
                    style={{ border: this.props.valid ? '1px solid #0062cc' : '1px solid red' }}
                />
            )
        } else if (this.props.name === 'date') {
            return (
                <Form.Control
                    ref={input => this.input = input}
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                    style={{ border: this.props.valid ? '1px solid #0062cc' : '1px solid red' }}
                />
            )
        } else {
            return (
                <Form.Control
                    ref={input => this.input = input}
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                    placeholder={this.props.name}
                    style={{ border: this.props.valid ? '1px solid #0062cc' : '1px solid red' }}
                />
            )
        }
    }
}
