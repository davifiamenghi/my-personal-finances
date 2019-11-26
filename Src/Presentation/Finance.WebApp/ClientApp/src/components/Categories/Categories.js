import React, { Component } from 'react';
import { TableCategories } from './Table/TableCategories';
import { FormCategory } from './Form/FormCategory';
import { TableCashflowTypes } from './Table/TableCashflowTypes';
import { getAllExpenseCategories } from '../../services/expenseCategory-service';
import { getAllIncomeCategories } from '../../services/incomeCategory-service';
import { getAllCashflowTypes } from '../../services/cashflowType-service';
import { Container, Row, Col } from 'react-bootstrap';

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

    renderExpensesTable(expenseCategories, incomeCategories, cashflowTypes) {
        return (
            <Container>
                <Row>
                    <Col md={5}>
                        <h2> Create Income Category</h2>
                        <FormCategory
                            isIncome={true}
                            refresh={this.populateData}
                        />
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col md={5}>
                        <h2> Create Expense Category</h2>
                        <FormCategory
                            isIncome={false}
                            refresh={this.populateData}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4}>
                        <TableCategories
                            refresh={this.populateData}
                            categories={incomeCategories}
                            isIncome={true}
                        />
                    </Col>
                    <Col md={4}>
                        <TableCashflowTypes
                            refresh={this.populateData}
                            cashflowTypes={cashflowTypes}
                        />
                    </Col>
                    <Col md={4}>
                        <TableCategories
                            refresh={this.populateData}
                            categories={expenseCategories}
                            isIncome={false}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    // Lifecycle methods.
    componentDidMount() {
        this.populateData();
    }

    // State change methods.
    populateExpenseCategoriesData = () => {
        getAllExpenseCategories()
            .then(data => {
                this.setState({
                    expenseCategories: data.categories,
                    loading: false
                })
            });
    }

    populateIncomeCategoriesData = () => {
        getAllIncomeCategories()
            .then(data => {
                this.setState({
                    incomeCategories: data.categories,
                    loading: false
                })
            });
    }

    populateCashflowsTypesData = () => {
        getAllCashflowTypes()
            .then(data => {
                this.setState({
                    cashflowTypes: data.cashflowTypes,
                    loading: false
                })
            });
    }

    // Helper methods.
    populateData = () => {
        this.populateIncomeCategoriesData();
        this.populateExpenseCategoriesData();
        this.populateCashflowsTypesData();
    }
}