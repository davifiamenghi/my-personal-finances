import React, { Component } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { Table } from './Table/Table';
import { getExpensesByCategory } from '../../services/expenseCaategory-service';

export class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            categories: [],
            totalExpenses: 0,
            totalIncomes: 0,
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable(this.state.categories, this.state.totalExpenses);

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {        
        this.populateCategoriesData();
    }

    renderExpensesTable(categories, totalExpenses) {
        return (
            <div>
                <h2>Monthly Report</h2>

                <Filter
                    monthChange={this.onMonthChange}
                    yearchange={this.onYearChange}
                    refresh={this.populateCategoriesData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <Table
                    refresh={this.populateExpensesData}
                    categories={categories}
                    totalExpenses={totalExpenses}
                />

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

    populateCategoriesData = () => {
        getExpensesByCategory(this.state.month, this.state.year)
            .then(data => {
                this.setState({
                    categories: data.expenseCategories,
                    totalExpenses: data.totalExpenses,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }
}