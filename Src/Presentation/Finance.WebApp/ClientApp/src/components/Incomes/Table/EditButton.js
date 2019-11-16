﻿import React, { Component } from 'react';

export class EditButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-success" onFocus={() => this.props.incomeIdChange(this.props.incomeId) } onClick={() => { this.props.editIncome(this.props.incomeId) }}>Edit</button>
        )
    }
}