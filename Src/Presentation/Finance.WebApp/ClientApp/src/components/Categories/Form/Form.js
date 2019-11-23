import React, { Component } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import authService from '../../api-authorization/AuthorizeService';
import { createExpenseCategory } from '../../../services/expenseCategory-service';
import { createIncomeCategory } from '../../../services/incomeCategory-service';
import { collectCategoriesErrors } from '../../../services/error-service';
import { notify } from '../../../services/error-service';

export class Form extends Component {
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
        let validateName = this.state.name.length >= 1 && this.state.name.length <= 20;
        let validateIncomeTypeId = this.state.typeId >= 1 && this.state.typeId <= 5;
        let validateExpenseTypeId = this.state.typeId >= 7 && this.state.typeId <= 9;

        return (
            <form onSubmit={this.create} className="form-group">
                <Input
                    ref={name => this.name = name}
                    type='text'
                    data='name'
                    name='Category Name'
                    func={e => { this.setState({ name: e.target.value }) }}
                    validate={validateName}
                />
                
                <Select
                    ref={typeId => this.typeId = typeId}
                    data="typeId"
                    name='TypeId'
                    func={e => { this.setState({ typeId: e.target.value }) }}
                    validate={this.props.isIncome ? validateIncomeTypeId : validateExpenseTypeId}
                    isIncome={this.props.isIncome}
                >
                </Select>
                
                <Button clearInputs={this.clearInputs} />
            </form>
        )
    }

    componentDidMount() {
        authService
            .getUser()
            .then(user => {
                this.setState({
                    userId: user.sub
                });
            });
    }

    clearInputs = () => {
        this.name.clear();
        this.typeId.clear();
    }

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

    validateNameAndType = () => {
        let isValidName = this.state.name.length >= 1 && this.state.name.length <= 20;

        let isValidCashflowTypeId = this.props.isIncome ?
            this.state.typeId >= 1 && this.state.typeId <= 5 : this.state.typeId >= 7 && this.state.typeId <= 9;

        if (!isValidName || !isValidCashflowTypeId) {

            if (!isValidName) notify("Name cannot be empty and logner than 20 characters!");
            if (!isValidCashflowTypeId) notify("Please, select Cashflow Type!");

            this.fillFields();

            return false;
        }

        return true;
    }
}