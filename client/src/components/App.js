import React, { Component } from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from '../store'
import routes from "../routes";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        {
                            routes.map((route, index) => (
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
                </Router>
            </Provider>
        )
    }
}

export default App
