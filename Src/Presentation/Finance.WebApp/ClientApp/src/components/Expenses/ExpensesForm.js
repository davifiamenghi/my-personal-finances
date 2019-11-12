import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { Input } from './FormComponents/Input';
import { Select } from './FormComponents/Select';
import { Button } from './FormComponents/Button';

export class ExpensesForm extends Component {
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
        };
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

    render() {
        return (
            <form onSubmit={this.createExpense}>
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
                    defaultValue={this.state.date}
                />
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
                <Select
                    ref={category => this.category = category}
                    data="category"
                    name='Category'
                    func={e => { this.setState({ category: e.target.value }) }}
                >
                </Select>
                <Input
                    type='hidden'
                    data='userId'
                    userId={this.state.userId}
                />
                <Button />
            </form >
        );
    }

    createExpense = event => {
        event.preventDefault();
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.category,
            note: this.state.note,
            userId: this.state.userId
        }

        fetch('/api/Expense/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(() => {
            this.resetState();
            this.clearInputs();
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

    clearInputs = () => {
        this.merchant.clear();
        this.note.clear();
        this.total.clear();
        this.date.clear();
        this.category.clear();
    }
}