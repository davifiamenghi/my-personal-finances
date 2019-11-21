import React, { Component } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import authService from '../../api-authorization/AuthorizeService';
import { createExpenseCategory } from '../../../services/expenseCategory-service';
import { createIncomeCategory } from '../../../services/incomeCategory-service';

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
        let payload = this.getPayload();

        if (this.props.isIncome) {
            createIncomeCategory(payload)
                .then(() => {
                    this.resetState();
                    this.props.refresh();
                }).catch(err => console.log(err));
        } else {
            createExpenseCategory(payload)
                .then(() => {
                    this.resetState();
                    this.props.refresh();
                }).catch(err => console.log(err));
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
}