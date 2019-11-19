import React, { Component } from 'react';
import { Filter } from './Filter/Filter';
import { Table } from './Table/Table';
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
        return (
            <div>
                <h2>Annual Report</h2>
                <br />
                <Filter
                    yearChange={this.onYearChange}
                    refresh={this.populateData}
                    year={this.state.year}
                />

                <Table
                    cashflows={this.state.cashflows}
                    totalIncomes={this.state.totalIncomes}
                    totalExpenses={this.state.totalExpenses}
                />
            </div>
        );
    }
    
    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
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