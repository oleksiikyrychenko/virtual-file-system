import React, { Component } from 'react';
import AppContent from './parts/Content';
import AppHeader from './parts/Header';
import AppFooter from './parts/Footer';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Alert from "react-s-alert";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import {withRouter} from "react-router-dom";

class AppLayout extends Component {
    static propTypes = {
        location: PropTypes.object,
        children: PropTypes.node
    };

    componentDidMount(): void {
    }

    displayFooter = (routes) => {
        const { location } = this.props;
        let res = true;

        routes.map(item => {
            if(location && location.pathname.includes(item)){
                return res = false;
            }
            return res;
        });
        return res;
    };

    render() {
        const displayFooterExcept = [
            '/login',
            '/register',
            '/dashboard',
            '/profile'
        ];

        return (
            <>
                <Alert stack={{ limit: 1 }} effect='stackslide' position='top' timeout={3000} />
                <AppHeader />
                <AppContent>
                    {this.props.children}
                </AppContent>
                {this.displayFooter(displayFooterExcept) && <AppFooter />}
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(withRouter(AppLayout));
