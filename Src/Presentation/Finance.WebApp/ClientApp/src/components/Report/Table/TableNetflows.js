import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { Table } from 'react-bootstrap';

export class TableNetflows extends Component {
    render() {
        return (
            <Table bordered size="sm">
                <tbody>
                    <tr className="last-row">
                        <td className="firstColumn">{this.props.label}</td>
                        <td className="secondColumn">{this.props.number}</td>
                        <td>{this.props.netflow} lv.</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}