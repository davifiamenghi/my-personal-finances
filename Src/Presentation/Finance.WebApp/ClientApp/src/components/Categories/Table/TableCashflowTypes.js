import React, { Component } from 'react';

export class TableCashflowTypes extends Component {
    render() {
        return (
            <table className='table table-striped table-bordered table-sm' aria-labelledby="tabelLabel">
                <thead className='thead-dark'>
                    <tr>
                        <th className='centered'>Id</th>
                        <th>Cashflow Types Description</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cashflowTypes.map(cashflowType =>
                        <tr key={cashflowType.id}>
                            <td className='centered'>{cashflowType.id}</td>
                            <td>{cashflowType.description}</td>
                        </tr> 
                    )}
                </tbody>
            </table>
        )
    }
}