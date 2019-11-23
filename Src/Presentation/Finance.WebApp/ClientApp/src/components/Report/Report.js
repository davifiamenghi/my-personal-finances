import React, { Component } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { Table } from './Table/Table';
import { getExpensesByCategory } from '../../services/expenseCategory-service';
import { getIncomesByCategory } from '../../services/incomeCategory-service';
import { notify } from '../../services/error-service';
import { collectCashflowFilterErrors } from '../../services/error-service';

export class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            expenses: [],
            incomes: [],
            payToYourself: 0.1,
            totalExpenses: 0,
            totalIncomes: 0,
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable(this.state.expenses, this.state.totalExpenses, this.state.incomes, this.state.totalIncomes);

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.populateData();
    }

    renderExpensesTable(expenses, totalExpenses, incomes, totalIncomes) {
        return (
            <div>
                <h2>Monthly Report</h2>

                <Filter
                    ref='filter'
                    monthChange={this.onMonthChange}
                    yearChange={this.onYearChange}
                    refresh={this.populateData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <h4>Monthly Incomes</h4>
                <Table
                    refresh={this.populateIncomesData}
                    flows={incomes}
                    totals={totalIncomes}
                />
                <br />
                <table className='table table-bordered table-warning table-sm' aria-labelledby="tabelLabel">
                    <tbody>
                        <tr className="last-row">
                            <td className="firstColumn">Pay to Yourself</td>
                            <td className="secondColumn">6</td>
                            <td>{(this.state.totalIncomes * this.state.payToYourself).toFixed(2)} lv.</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h4>Monthly Expenses</h4>
                <Table
                    refresh={this.populateExpensesData}
                    flows={expenses}
                    totals={totalExpenses}
                />
                <br />
                <table className='table table-bordered table-danger table-sm' aria-labelledby="tabelLabel">
                    <tbody>
                        <tr className="last-row">
                            <td className="firstColumn">Net Cashflow</td>
                            <td className="secondColumn">10</td>
                            <td colSpan="2">{(this.state.totalIncomes - (this.state.totalIncomes * this.state.payToYourself) - this.state.totalExpenses).toFixed(2)} lv.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    onMonthChange = (event) => {
        this.setState({
            month: event.target.value
        });
    }

    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    populateData = () => {
        let isValidMonthAndYear = this.validateMonthAndYear();

        if (isValidMonthAndYear) {
            getIncomesByCategory(this.state.month, this.state.year)
                .then(incomes => {
                    getExpensesByCategory(this.state.month, this.state.year)
                        .then(expenses => {
                            if (incomes.errors || expenses.errors) {
                                if (incomes.errors) collectCashflowFilterErrors(incomes.errors);
                                if (expenses.errors) collectCashflowFilterErrors(expenses.errors);
                                return;
                            }

                            this.setState({
                                incomes: incomes.incomeCategories,
                                totalIncomes: incomes.totals,
                                expenses: expenses.expenseCategories,
                                totalExpenses: expenses.totals,
                                loading: false
                            });
                        });
                });
        }
    }

    validateMonthAndYear = () => {
        let isValidMonth = this.state.month >= 1 && this.state.month <= 12;
        let isValidYear = this.state.year >= 1 && this.state.year <= 9999;

        if (!isValidMonth || !isValidYear) {

            if (!isValidMonth) notify("Invalid Month!");
            if (!isValidYear) notify("Invalid Year!");

            this.refs.filter.fillFields();

            return false;
        }

        return true;
    }
}