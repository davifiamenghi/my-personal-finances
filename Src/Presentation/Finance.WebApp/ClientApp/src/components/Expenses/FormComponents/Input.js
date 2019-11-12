import React, { Component } from 'react'

export class Input extends Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.data}>{this.props.name}</label>
                <div>
                    {this.getInput()}
                </div>
            </div>
        )
    }

    clear() {
        this.input.value = '';
    }


    getInput = () => {
        if (this.props.type === 'number') {
            return (
                <input
                    ref={input => this.input = input}
                    min="1"
                    step="0.01"
                    className="form-control col-md-6"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                />
            )
        } else if (this.props.type === 'hidden') {
            return (
                <input
                    id={this.props.data}
                    name={this.props.data}
                    value={this.props.userId}
                    type="hidden"
                />
            )
        } else if (this.props.type === 'date') {
            return (
                <input
                    ref={input => this.input = input}
                    className="form-control col-md-6"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                />
            )
        } else {
            return (
                <input
                    ref={input => this.input = input}
                    className="form-control col-md-6"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                />
            )
        }
    }
}
