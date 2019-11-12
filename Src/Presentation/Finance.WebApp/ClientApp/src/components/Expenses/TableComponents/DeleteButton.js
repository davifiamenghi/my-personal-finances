﻿import React, { Component } from 'react';

export class DeleteButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-danger btn-sm" onClick={this.props.deleteExpense}>Delete</button>
        )
    }
}