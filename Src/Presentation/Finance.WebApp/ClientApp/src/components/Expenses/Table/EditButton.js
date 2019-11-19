import React, { Component } from 'react';

export class EditButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-outline-success" onFocus={() => this.props.expenseIdChange(this.props.expenseId) } onClick={() => { this.props.editExpense(this.props.expenseId) }}>Edit</button>
        )
    }
}