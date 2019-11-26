import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class EditButton extends Component {
    render() {
        return (
            <Button type="button" variant="success flowEditDelete action" onFocus={() => this.props.expenseIdChange(this.props.expenseId)} onClick={() => { this.props.editExpense(this.props.expenseId) }}>Edit</Button>
        )
    }
}