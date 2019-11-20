import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { deleteExpenseCategory } from '../../../services/expenseCategory-service';
import { deleteIncomeCategory } from '../../../services/incomeCategory-service';


export class Table extends Component {
    render() {
        return (
            <table className='table table-striped table-bordered table-sm' aria-labelledby="tabelLabel">
                <thead className='thead-dark'>
                    <tr>
                        <th>Name</th>
                        <th className='centered'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.categories.map(category =>
                        <TableRow
                            key={category.id}
                            category={category}
                            delete={this.delete}
                        />                        
                    )}
                </tbody>
            </table>
        )
    }

    delete = id => {
        if (this.props.isIncome) {
            deleteIncomeCategory(id)
                .then(() => this.props.refresh())
                .catch(err => console.log(err));
        } else {
            deleteExpenseCategory(id)
                .then(() => this.props.refresh())
                .catch(err => console.log(err));
        }        
    }
}