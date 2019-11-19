import React, { Component } from 'react';

export class TableRow extends Component {
    render() {
        return (
            <tr>
                <td className="col-md-4">{this.props.flow.name}</td>
                <td className="col-md-2">{this.props.flow.typeId}</td>
                <td className="col-md-3">{this.props.flow.sum.toFixed(2)} lv.</td>
                <td className="col-md-3">{((this.props.flow.sum / this.props.totals) * 100).toFixed(2)}%</td>
            </tr>
        )
    }
}