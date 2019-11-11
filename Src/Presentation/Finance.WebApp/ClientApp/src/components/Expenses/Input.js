import React, { Component } from 'react'

export class Input extends Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.data}>{this.props.name}</label>
                <div>
                    <input
                        className="form-control col-md-6"
                        onChange={(e) => this.props.func(e)}
                        id={this.props.data}
                        name={this.props.data}
                        type={this.props.type}
                    />
                </div>
            </div>
        )
    }    
}
