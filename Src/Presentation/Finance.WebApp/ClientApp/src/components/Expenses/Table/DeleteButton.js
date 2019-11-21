import React, { Component } from 'react';

export class DeleteButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-danger flowEditDelete action" onClick={() => this.props.deleteExpense(this.props.expenseId)}>Delete</button>
        )
    }
}