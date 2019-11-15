import React, { Component } from 'react';

export class EditButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-success" onClick={this.props.editExpense}>Edit</button>
        )
    }
}