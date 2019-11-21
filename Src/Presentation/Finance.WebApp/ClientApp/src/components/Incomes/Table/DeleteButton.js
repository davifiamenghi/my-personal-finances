import React, { Component } from 'react';

export class DeleteButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-danger flowEditDelete action" onClick={() => this.props.deleteIncome(this.props.incomeId)}>Delete</button>
        )
    }
}