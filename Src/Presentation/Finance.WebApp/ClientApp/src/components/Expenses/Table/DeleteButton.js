import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class DeleteButton extends Component {
    render() {
        return (
            <Button type="button" variant="danger flowEditDelete action" onClick={() => this.props.deleteExpense(this.props.expenseId)}>Delete</Button>
        )
    }
}