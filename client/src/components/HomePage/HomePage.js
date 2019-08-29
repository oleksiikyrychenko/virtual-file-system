import React, { Component } from 'react';
import Styles from './styles';
import {connect} from "react-redux";
import {login} from '../../store/auth/actions';
import AppLayout from "../../layout/AppLayout";

class HomePage extends Component{

    onSubmit = (values) => {
        this.props.login(values);
    };

    render() {


        return (
            <AppLayout>
                 <Styles>
                     <h1>HomePage</h1>
                 </Styles>
            </AppLayout>
        )
    }
}

export default connect(null, { login })(HomePage);
