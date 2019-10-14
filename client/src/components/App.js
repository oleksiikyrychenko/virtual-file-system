import React, { Component } from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../store'
import routes from "../routes";
import AppLayout from "../layout/AppLayout";
import 'antd/dist/antd.css';
import PrivateRoute from "../utils/PrivatRoute";
import checkAuth from "../hoc/checkAuth";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <AppLayout>
                        <Switch>
                            {
                                routes.map((route, index) => (
                                    route.isPrivate ?
                                    <PrivateRoute
                                        path={route.path}
                                        component={route.component}
                                        key={index}
                                    />
                                    :
                                    <Route
                                        exact={route.path === '/'}
                                        path={route.path}
                                        component={route.component}
                                        key={index}
                                    />
                                ))
                            }
                            <Route render={() => <div>Error 404. This page is not found!</div>}/>
                        </Switch>
                    </AppLayout>
                </Router>
            </Provider>
        )
    }
}

export default checkAuth(App);
