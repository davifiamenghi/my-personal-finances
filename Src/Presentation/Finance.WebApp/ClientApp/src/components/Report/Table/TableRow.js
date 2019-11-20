import React, { Component } from 'react';

export class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.flow.name}</td>
                <td>{this.props.flow.typeId}</td>
                <td>{this.props.flow.sum.toFixed(2)} lv.</td>
                <td>{((this.props.flow.sum / this.props.totals) * 100).toFixed(2)}%</td>
            </tr> 
        )
    }
}