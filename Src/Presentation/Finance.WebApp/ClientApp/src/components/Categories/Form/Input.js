import React, { Component } from 'react'

export class Input extends Component {

    render() {
        return (
            <div className="form-row">
                <input
                    ref={input => this.input = input}
                    className="form-control col-md-12 categoryInput"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                    placeholder={this.props.name}
                    style={{ border: this.props.validate ? '1px solid #0062cc' : '1px solid red' }}
                    autocomplete="off"
                />
            </div>
        )
    }

    clear() {
        this.input.value = '';
    }

    fill(value) {
        this.input.value = value;
    } 
}
