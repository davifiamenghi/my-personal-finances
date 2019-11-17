import React, { Component } from 'react';

export class TableRow extends Component {
    constructor() {
        super()

        this.state = {
            colors: {
                1: "table-primary",
                2: "table-warning",
                3: "table-primary",
                4: "table-warning",
                5: "table-info",
                7: "table-warning",
                8: "table-info",
                9: "table-danger"
            }
        }
    }

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