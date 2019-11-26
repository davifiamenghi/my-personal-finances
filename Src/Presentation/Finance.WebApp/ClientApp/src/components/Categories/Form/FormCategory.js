import React, { Component } from 'react';
import { Input } from './Input';
import { CreateButton } from './CreateButton';
import { Select } from './Select';
import { Form } from 'react-bootstrap';
import authService from '../../api-authorization/AuthorizeService';
import { createExpenseCategory } from '../../../services/expenseCategory-service';
import { createIncomeCategory } from '../../../services/incomeCategory-service';
import { collectCategoriesErrors } from '../../../services/error-service';
import { notify } from '../../../services/error-service';

export class FormCategory extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            typeId: '',
            options: [],
            userId: ''
        }
    }

    render() {
        return (
            <Form onSubmit={this.create}>
                <Form.Group>
                    <Input
                        ref={name => this.name = name}
                        type='text'
                        data='name'
                        name='Category Name'
                        func={e => { this.setState({ name: e.target.value }) }}
                        validate={this.isValidName()}
                    />
                </Form.Group>
                <Form.Group>
                    <Select
                        ref={typeId => this.typeId = typeId}
                        data="typeId"
                        name='TypeId'
                        func={e => { this.setState({ typeId: e.target.value }) }}
                        validate={this.isValidCashflowTypeId()}
                        isIncome={this.props.isIncome}
                    >
                    </Select>
                </Form.Group>
                <Form.Group>
                    <CreateButton clearInputs={this.clearInputs} />
                </Form.Group>
            </Form>
        )
    }

    // Lifecycle methods.
    componentDidMount() {
        authService
            .getUser()
            .then(user => {
                this.setState({
                    userId: user.sub
                });
            });
    }

    // State change methods.
    create = event => {
        event.preventDefault();

        let isValidNameAndType = this.validateNameAndType();
        if (isValidNameAndType) {
            let payload = this.getPayload();

            if (this.props.isIncome) {
                createIncomeCategory(payload)
                    .then((res) => {
                        if (res) {
                            collectCategoriesErrors(res.errors);
                            this.fillFields();
                        } else {
                            this.resetState();
                            this.props.refresh();
                            notify("Successfuly create an Income Category!");
                        }
                    });
            } else {
                createExpenseCategory(payload)
                    .then(() => {
                        this.resetState();
                        this.props.refresh();
                        notify("Successfuly create an Expense Category!");
                    });
            }
        }        
    }

    resetState = () => {
        this.setState({
            name: '',
            typeId: ''
        });
    }

    // Helper methods.
    clearInputs = () => {
        this.name.clear();
        this.typeId.clear();
    }    

    getPayload = () => {
        let payload = {
            name: this.state.name,
            typeId: this.state.typeId,
            userId: this.state.userId
        }

        return payload;
    }

    fillFields = () => {
        this.name.fill(this.state.name);
        this.typeId.fill(this.state.typeId);
    }

    // Validation methods.
    isValidName = () => this.state.name.length >= 1 && this.state.name.length <= 20;
    isValidCashflowTypeId = () => this.props.isIncome ?
        this.state.typeId >= 1 && this.state.typeId <= 5 : this.state.typeId >= 7 && this.state.typeId <= 9;

    validateNameAndType = () => {
        if (!this.isValidName() || !this.isValidCashflowTypeId()) {

            if (!this.isValidName()) notify("Name cannot be empty and logner than 20 characters!");
            if (!this.isValidCashflowTypeId()) notify("Please, select Cashflow Type!");

            this.fillFields();

            return false;
        }

        return true;
    }
}