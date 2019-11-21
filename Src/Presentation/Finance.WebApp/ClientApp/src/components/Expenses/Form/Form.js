import React, { Component } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import authService from '../../api-authorization/AuthorizeService';
import { getExpense } from '../../../services/expense-service';
import { createExpense } from '../../../services/expense-service';
import { updateExpense } from '../../../services/expense-service';
import { isValid, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            userId: '',
            isCreate: true
        }
    }

    render() {
        let validMerchant = this.state.merchant.length <= 50;
        let validDate = isValid(parseISO(this.state.date));
        let validCategory = this.state.categoryId !== "";
        let validNote = this.state.note <= 200;
        let validTotal = this.state.total > 0;

        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.state.isCreate ? this.create : this.update} className="form-row">
                        <div className="col-md-2">
                            <Input
                                ref={merchant => this.merchant = merchant}
                                type='text'
                                data='merchant'
                                name='Merchant'
                                func={e => { this.setState({ merchant: e.target.value }) }}
                                valid={validMerchant}
                            />
                        </div>
                        <div className="col-md-2">
                            <Input
                                ref={date => this.date = date}
                                type='date'
                                data='date'
                                name='Date'
                                func={e => { this.setState({ date: e.target.value }) }}
                                valid={validDate}
                            />
                        </div>
                        <div className="col-md-2">
                            <Select
                                ref={category => this.category = category}
                                data="category"
                                name='Category'
                                func={e => { this.setState({ categoryId: e.target.value }) }}
                                valid={validCategory}
                            >
                            </Select>
                        </div>
                        <div className="col-md-2">
                            <Input
                                ref={total => this.total = total}
                                type='number'
                                data='total'
                                name='Total'
                                func={e => { this.setState({ total: e.target.value }) }}
                                valid={validTotal}
                            />
                        </div>
                        <div className="col-md-2">
                            <Input
                                ref={note => this.note = note}
                                type='text'
                                data='note'
                                name='Note'
                                func={e => { this.setState({ note: e.target.value }) }}
                                valid={validNote}
                            />
                        </div>
                        <div className="col-md-2">
                            <Button
                                clearInputs={this.clearInputs}
                                isCreate={this.state.isCreate}
                            />
                        </div>                 
                    </form>
                </div>
            </div>            
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
                this.setState({ isCreate: false });
            });
    }

    create = event => {
        event.preventDefault();
        let payload = this.getPayload();

        createExpense(payload)
            .then((res) => {
                if (res) {
                    this.collectErrors(res.errors);
                    this.fillFields();
                } else {
                    this.resetState();
                    this.props.refresh();
                }
            });
    }

    update = event => {
        event.preventDefault();
        let payload = this.getPayload();

        updateExpense(payload)
            .then((res) => {
                if (res) {
                    this.collectErrors(res.errors);
                    this.fillFields();
                } else {
                    this.resetState();
                    this.props.refresh();
                }
            });
    }

    resetState = () => {
        this.setState({
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: '',
            note: '',
            isCreate: true
        });
    }

    updateState = expense => {
        this.setState({
            merchant: expense.merchant,
            date: expense.date,
            total: expense.total,
            categoryId: expense.categoryId,
            note: expense.note,
            isCreate: false
        });
    }

    getPayload = () => {
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.categoryId,
            note: this.state.note,
            userId: this.state.userId,
            id: this.props.expenseId
        }

        return payload;
    }

    collectErrors(err) {
        let errors = [];

        if (err.CategoryId) {
            errors = [...errors, err.CategoryId.toString()]
        }

        if (err.Date) {
            errors = [...errors, err.Date.toString()]
        }

        if (err.Merchant) {
            errors = [...errors, err.Merchant.toString()]
        }

        if (err.Total) {
            errors = [...errors, err.Total.toString()]
        }

        if (err.Note) {
            errors = [...errors, err.note.toString()]
        }

        errors.forEach(error => this.notify(error));
    }

    notify = (message) => {
        toast(message);
    }
}