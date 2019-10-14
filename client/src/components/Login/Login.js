import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from '../../store/auth/actions';
import Styles from "./styles";
import AuthorizationForm from "../forms/AuthorizationForm";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    email: yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),
    password: yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
        .required('Password is required ')
});

class Login extends Component{

    onSubmit = ({ email, password}) => {
        this.props.login({ email, password }).then(() => {
            this.props.history.push('/dashboard');
        });
    };

    render() {
        const fields = [{
            name: "email",
            placeholder: "Enter your email",
            className: 'field field-email',
            type: 'text'
        }, {
            name: "password",
            placeholder: "Enter your password",
            className: 'field field-pass',
            type: "password"
        }];

        return (
            <Styles>
                <div className={'form-wrapper'}>
                    <div className={'title-block'}>
                        <h1>Hello there!</h1>
                        <p>Welcome back</p>
                    </div>
                    <AuthorizationForm
                        fields={fields}
                        onSubmit={this.onSubmit}
                        buttonText={'Log In'}
                        validationSchema={validationSchema}
                    />
                </div>
            </Styles>
        )
    }
}

export default connect(null, { login })(Login);
