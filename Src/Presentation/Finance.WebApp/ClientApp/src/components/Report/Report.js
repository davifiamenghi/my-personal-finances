import React, { Component } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { Table } from './Table/Table';
import { getExpensesByCategory } from '../../services/expenseCaategory-service';
import { getIncomesByCategory } from '../../services/incomeCaategory-service';


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
                    monthChange={this.onMonthChange}
                    yearchange={this.onYearChange}
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
                <table className='table table-warning table-bordered table-sm' aria-labelledby="tabelLabel">
                    <tbody>
                        <tr className="last-row">
                            <td>Pay to Yourself</td>
                            <td>6</td>
                            <td colSpan="2">{(this.state.totalIncomes * this.state.payToYourself).toFixed(2)} lv.</td>
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
                <table className='table table-primary table-bordered table-sm' aria-labelledby="tabelLabel">
                    <tbody>
                        <tr className="last-row">
                            <td>Net Cashflow</td>
                            <td>10</td>
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

    populateExpensesData = () => {
        getExpensesByCategory(this.state.month, this.state.year)
            .then(data => {
                this.setState({
                    expenses: data.expenseCategories,
                    totalExpenses: data.totals,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    populateIncomesData = () => {
        getIncomesByCategory(this.state.month, this.state.year)
            .then(data => {
                this.setState({
                    incomes: data.incomeCategories,
                    totalIncomes: data.totals,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    populateData = () => {
        this.populateExpensesData();
        this.populateIncomesData();
    }
}