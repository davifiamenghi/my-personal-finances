import React, { Component } from 'react'


export class Input extends Component {

    render() {
        return (
            <div className="form-row">
                    {this.getInput()}
            </div>
        )
    }

    clear() {
        this.props.type === 'date' ?
            this.input.value = new Date().toLocaleString() : this.input.value = '';       
    }

    fill(value) {
        this.input.value = value;
    }


    getInput = () => {
        if (this.props.type === 'number') {
            return (
                <input
                    ref={input => this.input = input}
                    min="1"
                    step="0.01"
                    className="form-control col-md-12"
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
                <input
                    ref={input => this.input = input}
                    className="form-control col-md-12"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                    type={this.props.type}
                    style={{ border: this.props.valid ? '1px solid #0062cc' : '1px solid red' }}
                />
            )
        } else {
            return (
                <input
                    ref={input => this.input = input}
                    className="form-control col-md-12"
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
