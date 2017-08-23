import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            name: '',
            pass: '',
            userCreated: false
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        })
    }

    onFormSubmit(event) {
        event.preventDefault();
        axios.post('/register', { user: this.state.user, name: this.state.name, pass: this.state.pass })
            .then(({ status }) => {
                const created = status === 200;
                this.setState({ userCreated: created });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            this.state.userCreated
                ? <Redirect to={'/login'} />
                : <form className='content full-width' onSubmit={this.onFormSubmit}>
                    <label>
                        User:
                        <input type="text" name="user" value={this.state.user} onChange={this.onFormChange} />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.onFormChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="pass" value={this.state.pass} onChange={this.onFormChange} />
                    </label>
                    <input type="submit" />
                </form>
        );
    }
}

export default Register;
