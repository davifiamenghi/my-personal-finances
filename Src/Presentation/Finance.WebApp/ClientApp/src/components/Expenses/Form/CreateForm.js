import React, { Component } from 'react';
import { Input } from '../../../shared/Form/Input';
import { SubmitButton } from '../../../shared/Form/SubmitButton';
import { Select } from './Select';
import authService from '../../api-authorization/AuthorizeService';
import { getExpense } from '../../../services/expense-service';
import { createExpense } from '../../../services/expense-service';
import { updateExpense } from '../../../services/expense-service';
import { isValid, parseISO } from 'date-fns';
import { collectCashflowErrors } from '../../../services/error-service';
import { notify } from '../../../services/error-service';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';


export class CreateForm extends Component {
    constructor() {
        super()

        this.state = {
            merchant: '',
            date: "",
            total: 0.00,
            categoryId: "",
            note: '',
            options: [],
            userId: '',
            isCreate: true,
            errors: []
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Form onSubmit={this.state.isCreate ? this.create : this.update}>
                        <Form.Row>
                            <Form.Group as={Col} md="2">
                                <Input
                                    ref={merchant => this.merchant = merchant}
                                    type='text'
                                    data='merchant'
                                    name='Merchant'
                                    func={e => { this.setState({ merchant: e.target.value }) }}
                                    valid={this.isMerchantValid()}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Input
                                    ref={date => this.date = date}
                                    type='date'
                                    data='date'
                                    name='Date'
                                    func={e => { this.setState({ date: e.target.value }) }}
                                    valid={this.isDateValid()}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Select
                                    ref={category => this.category = category}
                                    data="category"
                                    name='Category'
                                    func={e => { this.setState({ categoryId: e.target.value }) }}
                                    valid={this.isCategoryValid()}
                                >
                                </Select>
                            </Form.Group>
                            <Form.Group as={Col} md="1">
                                <Input
                                    ref={total => this.total = total}
                                    type='number'
                                    data='total'
                                    name='Total'
                                    func={e => { this.setState({ total: e.target.value }) }}
                                    valid={this.isTotalValid()}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Input
                                    ref={note => this.note = note}
                                    type='text'
                                    data='note'
                                    name='Note'
                                    func={e => { this.setState({ note: e.target.value }) }}
                                    valid={this.isNoteValid()}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <SubmitButton
                                    clearInputs={this.clearInputs}
                                    isCreate={this.state.isCreate}
                                />
                                <Button className='cancel' onClick={this.cancel}>Cancel</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
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
                    collectCashflowErrors(res.errors);
                    this.fillFields();
                } else {
                    this.resetState();
                    this.props.refresh();
                    notify("Successfuly create an Expense!");
                }
            });
    }

    update = event => {
        event.preventDefault();
        let payload = this.getPayload();

        updateExpense(payload)
            .then((res) => {
                if (res) {
                    collectCashflowErrors(res.errors);
                    this.fillFields();
                } else {
                    this.resetState();
                    this.props.refresh();
                    notify("Successfuly update an Expense!");
                }
            });
    }

    resetState = () => {
        this.setState({
            merchant: '',
            date: '',
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

    // Helper methods.
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

    cancel = () => {
        this.clearInputs();
        this.resetState();
    }

    // Validation methods.
    isMerchantValid = () => this.state.merchant.length <= 50;
    isDateValid = () => isValid(parseISO(this.state.date));
    isCategoryValid = () => this.state.categoryId !== "";
    isTotalValid = () => this.state.total >= 0.01;
    isNoteValid = () => this.state.note.length <= 200;
}