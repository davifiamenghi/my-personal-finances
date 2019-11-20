import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';
import { deleteIncome } from '../../../services/income-service';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead className='thead-dark'>
                    <tr className="centered">
                        <th>Merchat</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Total</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.incomes.map(income =>
                        <TableRow
                            key={income.id}
                            income={income}
                            incomeIdChange={this.props.incomeIdChange}
                            editIncome={this.props.editIncome}
                            deleteIncome={this.delete} />                        
                    )}
                </tbody>
            </table>
        )
    }

    delete = id => {
        deleteIncome(id)
            .then(() => this.props.refresh())
            .catch(err => console.log(err));
    }
}