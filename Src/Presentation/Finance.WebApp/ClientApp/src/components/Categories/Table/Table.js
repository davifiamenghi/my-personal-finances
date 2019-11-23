import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { deleteExpenseCategory } from '../../../services/expenseCategory-service';
import { deleteIncomeCategory } from '../../../services/incomeCategory-service';
import { notify } from '../../../services/error-service';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped table-bordered table-sm' aria-labelledby="tabelLabel">
                <thead className='thead-dark'>
                    <tr>
                        <th>{this.props.isIncome ? "Income Categories" : "Expense Categories"}</th>
                        <th className='centered'>Type Id</th>
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
                .then((res) => {
                    if (res) {
                        notify(res.error.split('. ')[1]);
                        return;
                    }

                    this.props.refresh();
                    notify("Successfully delete an Income Category!");
                });
        } else {
            deleteExpenseCategory(id)
                .then((res) => {
                    if (res) {
                        notify(res.error.split('. ')[1]);
                        return;
                    }

                    this.props.refresh();
                    notify("Successfully delete an Expense Category!");
                });
        }
    }
}