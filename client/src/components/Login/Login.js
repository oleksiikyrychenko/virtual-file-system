import React, { Component } from 'react';
import { Field, Formik } from "formik";
import { connect } from "react-redux";
import { login } from '../../store/auth/actions';
import AppLayout from "../../layout/AppLayout";
import Styles from "./styles";
class Login extends Component{

    onSubmit = (values) => {
        this.props.login(values);
    };

    render() {
        return (
            <AppLayout
                displayFooter={false}
            >
                <Styles>
                    <div className={'form-wrapper'}>
                        <div className={'title-block'}>
                            <h1>Hello there!</h1>
                            <p>Welcome back</p>
                        </div>
                        <Formik
                            onSubmit={this.onSubmit}
                            render={({handleSubmit}) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className={'login-form'}
                                >
                                    <Field
                                        name="email"
                                        placeholder="Enter your email"
                                        className={'field field-email'}
                                    />
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className={'field field-pass'}
                                    />
                                    <button
                                        type="submit"
                                        className={'submit-button'}
                                    >
                                        Log In
                                    </button>
                                </form>
                            )}
                        />
                    </div>
                </Styles>
            </AppLayout>
        )
    }
}

export default connect(null, { login })(Login);
