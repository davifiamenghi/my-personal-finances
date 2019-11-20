import React, { Component } from 'react';
import { Table } from './Table/Table';
import { Form } from './Form/Form';
import { TableCashflowTypes } from './Table/TableCashflowTypes';
import { getAllExpenseCategories } from '../../services/expenseCategory-service';
import { getAllIncomeCategories } from '../../services/incomeCategory-service';
import { getAllCashflowTypes } from '../../services/cashflowType-service';

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseCategories: [],
            incomeCategories: [],
            cashflowTypes: [],
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable(this.state.expenseCategories, this.state.incomeCategories, this.state.cashflowTypes);

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.populateData();
    }

    renderExpensesTable(expenseCategories, incomeCategories, cashflowTypes) {
        return (
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h2> Create Income Category</h2>
                            <Form
                                isIncome={true}
                                refresh={this.populateData}
                            />
                        </div>

                        <div className="col-md-6">
                            <h2> Create Expense Category</h2>
                            <Form
                                isIncome={false}
                                refresh={this.populateData}
                            />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <Table
                                refresh={this.populateData}
                                categories={incomeCategories}
                                isIncome={true}
                            />
                        </div>

                        <div className="col-md-4">
                            <Table
                                refresh={this.populateData}
                                categories={expenseCategories}
                                isIncome={false}
                            />
                        </div>

                        <div className="col-md-4">
                            <TableCashflowTypes
                                refresh={this.populateData}
                                cashflowTypes={cashflowTypes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    populateExpenseCategoriesData = () => {
        getAllExpenseCategories()
            .then(data => {
                console.log(data)
                this.setState({
                    expenseCategories: data.categories,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    populateIncomeCategoriesData = () => {
        getAllIncomeCategories()
            .then(data => {
                console.log(data)

                this.setState({
                    incomeCategories: data.categories,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    populateCashflowsTypesData = () => {
        getAllCashflowTypes()
            .then(data => {
                console.log(data)

                this.setState({
                    cashflowTypes: data.cashflowTypes,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    populateData = () => {
        this.populateIncomeCategoriesData();
        this.populateExpenseCategoriesData();
        this.populateCashflowsTypesData();
    }
}