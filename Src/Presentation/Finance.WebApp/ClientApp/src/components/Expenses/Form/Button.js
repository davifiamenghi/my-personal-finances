import React, { Component } from 'react';

export class Button extends Component {
    render() {
        return (
            <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.props.clearInputs}>Create</button>
            </div>
        )
    }    
}