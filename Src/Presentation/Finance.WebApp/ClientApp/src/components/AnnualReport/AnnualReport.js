import React, { Component } from 'react';
import { Filter } from './Filter/Filter';
import { getExpensesByYear } from '../../services/expense-service';
import { getIncomesByYear } from '../../services/income-service';

export class AnnualReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            cashflows: {
                expenses: [],
                incomes: [],
            },
            totalExpenses: 0,
            totalIncomes: 0,
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable();

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.populateData();
    }

    renderExpensesTable() {
        const cashflows = this.state.cashflows;
        const totalIncomes = this.state.totalIncomes;
        const totalExpenses = this.state.totalExpenses;

        return (
            <div>
                <h2>Annual Report</h2>
                <br />
                <Filter
                    yearChange={this.onYearChange}
                    refresh={this.populateData}
                    year={this.state.year}
                />

                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Income</th>
                            <th>Expense</th>
                            <th>Savings</th>
                            <th>Savings %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cashflows.incomes.map((income, key) =>
                            <tr key={income.month}>
                                <td>{income.monthName}</td>
                                <td>{income.sum.toFixed(2)} lv.</td>
                                <td>{(cashflows.expenses[key].sum).toFixed(2)} lv.</td>
                                <td>{(income.sum - cashflows.expenses[key].sum).toFixed(2)} lv.</td>
                                <td>{(((income.sum - cashflows.expenses[key].sum) / income.sum) * 100).toFixed(2)}%</td>
                            </tr>
                        )}
                        <tr key={13} className="table-success last-row">
                            <td>Totals</td>
                            <td>{totalIncomes.toFixed(2)} lv.</td>
                            <td>{totalExpenses.toFixed(2)} lv.</td>
                            <td>{(totalIncomes - totalExpenses).toFixed(2)} lv.</td>
                            <td>{(((totalIncomes - totalExpenses) / totalIncomes) * 100).toFixed(2)}%</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
    
    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    populateExpensesData = () => {
        
    }

    populateData = () => {
        getIncomesByYear(this.state.year)
            .then(incomes => {
                getExpensesByYear(this.state.year)
                    .then(expenses => {
                        this.setState({
                            cashflows: {
                                incomes: incomes.incomeSums,
                                expenses: expenses.expenseSums,
                            },
                            totalIncomes: incomes.totals,
                            totalExpenses: expenses.totals,
                            loading: false
                        });
                    }).catch(err => console.log(err));
                });
    }
}