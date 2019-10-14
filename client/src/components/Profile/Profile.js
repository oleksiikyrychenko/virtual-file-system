import React, { Component } from 'react';
import Styles from "./styles";
import {connect} from "react-redux";
import * as yup from "yup";
import AuthorizationForm from "../forms/AuthorizationForm";
import {updateUser} from "../../store/auth/actions";

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    email: yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),
    password: yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
});

class Profile extends Component{
    onSubmit = ({ email, lastName, firstName, password}) => {
        const {updateUser} = this.props;
        const data = {
            email,
            last_name: lastName,
            first_name: firstName
        };

        if(password) {
            data['password'] = password;
        }

        updateUser(data);
    };

    render() {
        const { user } = this.props;

        const fields = [{
            name: "firstName",
            placeholder: "Enter your first name",
            className: 'field user-icon'
        }, {
            name: "lastName",
            placeholder: "Enter your last name",
            className: 'field user-icon'
        }, {
            name: "email",
            placeholder: "Enter your email",
            className: 'field user-icon'
        }, {
            name: "password",
            placeholder: "Enter your password",
            className: 'field field-pass',
            type: "password"
        }];

        const initialValues = {
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
        };

        return (
            <Styles>
                {
                    <div className={'form-wrapper'}>
                        <h1>Hey, <span>{`${initialValues.firstName} ${initialValues.lastName}`}</span></h1>
                        <AuthorizationForm
                            fields={fields}
                            onSubmit={this.onSubmit}
                            buttonText={'Update Profile'}
                            validationSchema={validationSchema}
                            initialValues={initialValues}
                        />
                    </div>
                }
            </Styles>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { updateUser })(Profile);
