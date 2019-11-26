import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

export class Info extends Component {
    render() {
        return (
            <Col md={3} className='home-info'>
                <Container style={{ border: "2px solid #E5E5E5", padding: "30px 10px" }}>
                    <h3 style={{ color: this.props.styleColor }}>{this.props.title}</h3>
                    <p>{this.props.content}</p>
                    <Button variant={this.props.buttonColor}><Link to={this.props.link}>Manage</Link></Button>
                </Container>
            </Col>
        );
    }
}
