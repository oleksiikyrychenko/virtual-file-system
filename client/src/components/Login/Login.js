import React, { Component } from 'react';
import { Field, Formik } from "formik";
import {connect} from "react-redux";
import {login} from '../../store/auth/actions';
import AppLayout from "../../layout/AppLayout";

class Login extends Component{

    onSubmit = (values) => {
        this.props.login(values);
    };

    render() {
        return (
            <AppLayout>
                <div>
                    <h1>Login</h1>
                    <Formik
                        onSubmit={this.onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="email" placeholder="Email" />
                                <Field name="password" placeholder="Email"/>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                    />
                </div>
            </AppLayout>
        )
    }
}

export default connect(null, { login })(Login);
