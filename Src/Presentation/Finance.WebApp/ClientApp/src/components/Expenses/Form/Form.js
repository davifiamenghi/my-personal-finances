import React, { Component } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import authService from '../../api-authorization/AuthorizeService';
import { getExpense } from '../../../services/expense-service';
import { createExpense } from '../../../services/expense-service';

export class Form extends Component {
    constructor() {
        super()

        this.state = {
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: '',
            note: '',
            options: [],
            userId: ''
        }
    }

    render() {
        return (
            <form onSubmit={this.create} className="form-row">
                <Input
                    ref={merchant => this.merchant = merchant}
                    type='text'
                    data='merchant'
                    name='Merchant'
                    func={e => { this.setState({ merchant: e.target.value }) }}
                />
                <Input
                    ref={date => this.date = date}
                    type='date'
                    data='date'
                    name='Date'
                    func={e => { this.setState({ date: e.target.value }) }}
                />
                <Select
                    ref={category => this.category = category}
                    data="category"
                    name='Category'
                    func={e => { this.setState({ categoryId: e.target.value }) }}
                >
                </Select>
                <Input
                    ref={total => this.total = total}
                    type='number'
                    data='total'
                    name='Total'
                    func={e => { this.setState({ total: e.target.value }) }}
                />
                <Input
                    ref={note => this.note = note}
                    type='text'
                    data='note'
                    name='Note'
                    func={e => { this.setState({ note: e.target.value }) }}
                />
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
        this.merchant.clear();
        this.note.clear();
        this.total.clear();
        this.date.clear();
        this.category.clear();
    }

    fillFields = () => {
        this.merchant.fill(this.state.merchant);
        this.note.fill(this.state.note);
        this.total.fill(this.state.total);
        this.date.fill(this.state.date);
        this.category.fill(this.state.categoryId);
    }

    fillInputs = id => {
        getExpense(id)
            .then(expense => {
                this.updateState(expense);
                this.fillFields();
            });
    }

    create = event => {
        event.preventDefault();
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.categoryId,
            note: this.state.note,
            userId: this.state.userId
        }

        createExpense(payload)
            .then(() => {
                this.resetState();
                this.props.refresh();
            });
    }

    resetState = () => {
        this.setState({
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: '',
            note: ''
        });
    }

    updateState = expense => {
        this.setState({
            merchant: expense.merchant,
            date: expense.date,
            total: expense.total,
            categoryId: expense.categoryId,
            note: expense.note,
        });
    }
}