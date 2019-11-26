import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class EditButton extends Component {
    render() {
        return (
            <Button type="button" variant="success flowEditDelete action" onFocus={() => this.props.incomeIdChange(this.props.incomeId)} onClick={() => { this.props.editIncome(this.props.incomeId) }}>Edit</Button>
        )
    }
}