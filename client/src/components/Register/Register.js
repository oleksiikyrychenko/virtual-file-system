import React, { Component } from 'react';
import {connect} from "react-redux";
import {register} from '../../store/auth/actions';
import Styles from "../Login/styles";
import AuthorizationForm from "../forms/AuthorizationForm";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    email: yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),
    password: yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
        .required('Password is required!')
});

class Register extends Component{

    onSubmit = ({ firstName, lastName, email, password  }) => {
        const { register } = this.props;
        const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };
        register(data);
    };

    render() {
        const fields = [{
            name: "firstName",
            placeholder: "Enter your first name",
            className: 'field'
        }, {
            name: "lastName",
            placeholder: "Enter your last name",
            className: 'field'
        }, {
            name: "email",
            placeholder: "Enter your email",
            className: 'field field-email'
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
                        <h1>Create account!</h1>
                    </div>
                    <AuthorizationForm
                        fields={fields}
                        onSubmit={this.onSubmit}
                        buttonText={'Sign Up'}
                        validationSchema={validationSchema}
                    />
                </div>
            </Styles>
        )
    }
}

export default connect(null, { register })(Register);
