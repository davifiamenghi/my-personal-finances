import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer>
                <hr />
                <Container>
                    <Row>
                        <Col md={4}>

                            <h6 className="text-uppercase mb-4 font-weight-bold">My Personal Finances</h6>
                            <p>My Personal Finances is web application wich priovides an easy management system for your income and expenses. Also with month and annual report you can take effective decision about your financial future.</p>

                        </Col>
                        <Col md={2}>

                            <h6 className="text-uppercase mb-4 font-weight-bold">Futures</h6>
                            <p>
                                <Link to="/Incomes">Incomes</Link>
                            </p>
                            <p>
                                <Link to="/Expenses">Expenses</Link>
                            </p>
                            <p>
                                <Link to="/Monthly-Report">Monthly Report</Link>
                            </p>
                            <p>
                                <Link to="/Annual-Report">Annual Report</Link>
                            </p>

                        </Col>
                        <Col md={2}>

                            <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                            <p>
                                <a href="#!">Your Account</a>
                            </p>
                            <p>
                                <a href="#!">Become an Affiliate</a>
                            </p>
                            <p>
                                <a href="#!">Shipping Rates</a>
                            </p>
                            <p>
                                <a href="#!">Help</a>
                            </p>

                        </Col>
                        <Col md={4}>

                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p>
                                <i className="fa fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p>
                                <i className="fa fa-envelope mr-3"></i> info@gmail.com</p>
                            <p>
                                <i className="fa fa-phone mr-3"></i> + 01 234 567 88</p>
                            <p>
                                <i className="fa fa-print mr-3"></i> + 01 234 567 89</p>

                        </Col>
                    </Row>
                    <p className="text-center text-md-left">© 2018 Copyright:
                         <Link to="/"><strong> my-personal-finances.com</strong></Link>
                    </p>
                </Container>
            </footer>
        );
    }
}

