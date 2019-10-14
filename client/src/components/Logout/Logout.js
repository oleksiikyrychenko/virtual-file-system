import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from "../../store/auth/actions";

class Logout extends React.Component {
    static propTypes = {
        signOut: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { signOut, history } = this.props;
        signOut();
        history.push('/');
    }

    render() {
        return null;
    }
}

export default connect(null, { signOut })(Logout);
