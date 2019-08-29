import React, { Component } from 'react';
import { Field, Formik } from "formik";
import {connect} from "react-redux";
import {register} from '../../store/auth/actions';
import AppLayout from "../../layout/AppLayout";

class Register extends Component{

    onSubmit = (values) => {
        const { register } = this.props;
        register(values);
    };

    render() {
        return (
            <AppLayout>
                <div>
                    <h1>Register</h1>
                    <Formik
                        onSubmit={this.onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="first_name" placeholder="first_name" />
                                <Field name="last_name" placeholder="last_name"/>
                                <Field name="password" placeholder="password"/>
                                <Field name="email" placeholder="Email"/>
                                <button type="submit">Sign Up</button>
                            </form>
                        )}
                    />
                </div>
            </AppLayout>
        )
    }
}

export default connect(null, { register })(Register);
