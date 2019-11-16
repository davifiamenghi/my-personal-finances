import React, { Component } from 'react';

export class Button extends Component {
    render() {
        return (
            <div className="form-group">
                <button type="submit" className={`btn ${this.getColor()}`} onClick={this.props.clearInputs}>{this.getText()}</button>
            </div>
        )
    }   

    getText = () => {
        return this.props.isCreate ? "Create" : "Update"
    }

    getColor = () => {
        return this.props.isCreate ? "btn-primary" : "btn-info"
    }
}