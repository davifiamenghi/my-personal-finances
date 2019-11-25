import React, { Component } from 'react';
import { Input } from '../Filter/Input';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';

export class Filter extends Component {
    render() {
        let validateMonth = this.props.month >= 1 && this.props.month <= 12;
        let validateYear = this.props.year >= 1 && this.props.year <= 9999;

        return (
            <Container>
                <br />
                <Row>                    
                    <Form.Group as={Col} md="2">
                        <Input
                            ref={month => this.month = month}
                            name="Month"
                            timeChange={this.props.monthChange}
                            placeholder={this.props.month}
                            validate={validateMonth}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Input
                            ref={year => this.year = year}
                            name="Year"
                            timeChange={this.props.yearChange}
                            placeholder={this.props.year}
                            validate={validateYear}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Button variant="primary" onClick={this.props.refresh}>Get Cashflows</Button>
                    </Form.Group>                    
                </Row>
                <br />
            </Container>

        )
    }

    fillFields = () => {
        this.month.fill(this.props.month);
        this.year.fill(this.props.year);
    }
}