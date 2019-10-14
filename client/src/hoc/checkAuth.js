import React from 'react';
import store from "../store";
import {STATE_STATUSES} from "../utils/stateStatuses";
import {axiosController} from "../utils/axiosController";
import { getAuthUser } from "../store/auth/actions";

export default Child => {
    return class Higher extends React.Component {
        constructor() {
            super();
            const currentStore = store.getState();
            if(localStorage.token && !currentStore.auth.isAuthenticated && currentStore.auth.status !== STATE_STATUSES.PENDING) {
                axiosController.setAuthHeader(localStorage.getItem('token'));
                store.dispatch(getAuthUser());
            }
        }

        render() {
            axiosController.setAuthHeader();
            return <Child {...this.props} />;
        }
    };
};
