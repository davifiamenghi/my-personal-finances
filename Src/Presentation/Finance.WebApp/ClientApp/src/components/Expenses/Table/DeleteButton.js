import React, { Component } from 'react';

export class DeleteButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-outline-danger" onClick={() => this.props.deleteExpense(this.props.expenseId)}>Delete</button>
        )
    }
}