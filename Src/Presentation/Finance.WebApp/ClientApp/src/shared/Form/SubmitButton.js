import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class SubmitButton extends Component {
    render() {
        return (
            <Button type="submit" variant={`${this.getColor()}`} onClick={this.props.clearInputs}>{this.getText()}</Button>
        )
    }   

    getText = () => {
        return this.props.isCreate ? "Create" : "Update"
    }

    getColor = () => {
        return this.props.isCreate ? "primary" : "success"
    }
}