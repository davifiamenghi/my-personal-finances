import React, { Component, Fragment } from 'react';
import { Filter } from './Filter/Filter';
import { TableCashflows } from './Table/TableCashflows';
import { getExpensesByYear } from '../../services/expense-service';
import { getIncomesByYear } from '../../services/income-service';
import { notify } from '../../services/error-service';
import { collectCashflowFilterErrors } from '../../services/error-service';

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

    renderExpensesTable() {
        return (
            <Fragment>
                <h2>Annual Report</h2>
                <Filter
                    ref='filter'
                    yearChange={this.onYearChange}
                    refresh={this.populateData}
                    year={this.state.year}
                    validate={this.isValidYear()}
                />
                <TableCashflows
                    cashflows={this.state.cashflows}
                    totalIncomes={this.state.totalIncomes}
                    totalExpenses={this.state.totalExpenses}
                />
            </Fragment>
        );
    }

    // Lifecycle methods.
    componentDidMount() {
        this.populateData();
    }

    // State change methods.  
    populateData = () => {
        let isFilterValid = this.validateYear();

        if (isFilterValid) {
            getIncomesByYear(this.state.year)
                .then(incomes => {
                    getExpensesByYear(this.state.year)
                        .then(expenses => {
                            if (incomes.errors || expenses.errors) {
                                if (incomes.errors) collectCashflowFilterErrors(incomes.errors);
                                if (expenses.errors) collectCashflowFilterErrors(expenses.errors);
                                return;
                            }
                            this.setState({
                                cashflows: {
                                    incomes: incomes.incomeSums,
                                    expenses: expenses.expenseSums,
                                },
                                totalIncomes: incomes.totals,
                                totalExpenses: expenses.totals,
                                loading: false
                            });
                        });
                });
        }
    }

    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    // Validation methods.
    isValidYear = () => this.state.year >= 1 && this.state.year <= 9999;

    validateYear = () => {
        if (!this.isValidYear()) {

            notify("Invalid Year!");
            this.refs.filter.fillFields();

            return false;
        }

        return true;
    }
}