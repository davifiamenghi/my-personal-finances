import React, { Component } from 'react'


export class Select extends Component {
    constructor() {
        super()

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.getExpenseCategories();        
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.data}>{this.props.name}</label>
                <div>
                    <select
                        className="form-control col-md-6"
                        onChange={(e) => this.props.func(e)}
                        id={this.props.data}
                        name={this.props.data}
                    />
                    {this.renderOptions.bind(this)}
                </div>
            </div>
        )
    }

    renderOptions(e) {
        e.preventDefault();
        let options = [];

        this.state.categories.forEach(category => {
            options.push(<option value={category.id}>{category.name}</option>)
        })       

        return options;
    }

    async getExpenseCategories() {
        const response = await fetch('https://localhost:5001/api/ExpenseCategories/GetAll');
        const data = await response.json();
        console.log(data)
        this.setState({ categories: data.categories });
    }
}
