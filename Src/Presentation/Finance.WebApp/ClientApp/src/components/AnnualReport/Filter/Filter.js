import React, { Component } from 'react';
import { Input } from '../../../shared/Filter/Input';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';

export class Filter extends Component {
    render() {
        let validateYear = this.props.year >= 1 && this.props.year <= 9999;

        return (
            <Container>
                <br />
                <Row>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Year:</Form.Label>
                        <Input
                            ref={year => this.year = year}
                            name="Year"
                            timeChange={this.props.yearChange}
                            placeholder={this.props.year}
                            validate={validateYear}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label style={{ color: '#FFF' }}>Action:</Form.Label>
                        <Button variant="primary action" onClick={this.props.refresh}>Get Cashflows</Button>
                    </Form.Group>
                </Row>
                <br />
            </Container>
        )
    }

    fillFields = () => {
        this.year.fill(this.props.year);
    }
}