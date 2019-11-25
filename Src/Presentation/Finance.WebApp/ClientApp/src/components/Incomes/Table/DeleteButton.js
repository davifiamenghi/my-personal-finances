import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class DeleteButton extends Component {
    render() {
        return (
            <Button type="button" variant="danger flowEditDelete action" onClick={() => this.props.deleteIncome(this.props.incomeId)}>Delete</Button>
        )
    }
}