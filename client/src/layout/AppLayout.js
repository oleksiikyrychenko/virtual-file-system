import React, { Component } from 'react';
import AppContent from './parts/Content';
import AppHeader from './parts/Header';
import AppFooter from './parts/Footer';
import PropTypes from 'prop-types';


class AppLayout extends Component {
    static propTypes = {
        displayFooter: PropTypes.bool
    };

    static defaultProps = {
        displayFooter: true,
    };

    render() {
        const { displayFooter } = this.props;
        return (
            <>
                <AppHeader />
                <AppContent>
                    {this.props.children}
                </AppContent>
                {displayFooter && <AppFooter />}
            </>
        );
    }
}

export default AppLayout;

