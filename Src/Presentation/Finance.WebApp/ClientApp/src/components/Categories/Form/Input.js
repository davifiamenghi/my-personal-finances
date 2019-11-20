import React, { Component } from 'react'

export class Input extends Component {

    render() {
        return (
            <div className="form-row">
                <input
                    ref={input => this.input = input}
                    className="form-control col-md-12"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                    placeholder={this.props.name}
                />
            </div>
        )
    }

    clear() {
        this.input.value = '';
    }
}
