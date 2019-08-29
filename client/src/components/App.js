import React, { Component } from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from '../store'
import HomePage from './HomePage/HomePage';
import Login from "./Login/Login";
import Register from "./Register/Register";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route render={() => <div>Error 404. This page is not found!</div>}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
