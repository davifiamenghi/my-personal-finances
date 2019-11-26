import React, { Component, Fragment } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Info } from './Info';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Fragment>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={process.env.PUBLIC_URL + '/slide1.jpg'}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h1 className="slider">MY PERSONAL FINANCES</h1>
                            <h4>Manage your finances easaly. Start today!</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Container>
                    <Row>
                        <Info
                            title="Incomes"
                            content="It is better to have more passive incomes. Thats why you have to invest."
                            styleColor="#218838"
                            buttonColor="success"
                            link="/Incomes"
                        />
                        <Info
                            title="Expenses"
                            content="Expenses can be optimized for bigger monthly net cashflow."
                            styleColor="#C82333"
                            buttonColor="danger"
                            link="/Expenses"
                        />
                        <Info
                            title="Monthly Report"
                            content="Attention to 'Pay to Yourself' row. Save your money before taxes."
                            styleColor="#E0A800"
                            buttonColor="warning"
                            link="/Monthly-Report"
                        />
                        <Info
                            title="Annual Report"
                            content="Check your year savings. You can have more money for investments."
                            styleColor="#0069D9"
                            buttonColor="primary"
                            link="/Annual-Report"
                        />
                    </Row>
                </Container>
            </Fragment>
        );
    }
}
