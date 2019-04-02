import React, { Component } from 'react'
import model from "./Model"
import './App.css'
import LoginPage from "./Pages/LoginPage"
import ProfilePage from "./Pages/ProfilePage"
import MovieDetailsPage from "./Pages/MovieDetailsPage"
import SearchPage from "./Pages/SearchPage"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import Header from "./Components (presentational)/Header/Header"
import MovieListPage from "./Pages/MovieListPage"
import CreateUserPage from "./Pages/CreateUserPage"

// Different settings for routes
const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props, history, location, match) => (
        model.getCurrentUser() !== null
            ? <Redirect to='/landing' />
            : <LoginPage {...props}/>
    )} />
)

const CreateUserRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        model.getCurrentUser() !== null
            ? <Redirect to='/landing' />
            : <CreateUserPage />
    )} />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={({props, history, location, match}) => (
        model.getCurrentUser() !== null
            ? <Component {...props} list={rest.list} params={match.params} history={history} userId={model.getCurrentUser()}/>
            : <Redirect to='/' />
    )} />
)

const RedirectPath = () => (
    <Route render={() => (
        model.getCurrentUser() !== null
            ? <Redirect to='/landing' />
            : <Redirect to='/' />
    )} />
)

class App extends Component {
    constructor() {
        super()

        console.log(model.getCurrentUser())
    }

    componentDidMount() {
        model.addObserver(this)
    }

    updateUser() {
        this.forceUpdate()
    }

    render() {

        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <LoginRoute exact path='/' component={<LoginPage/>}/>
                            <CreateUserRoute path='/createuser' component={CreateUserPage}/>

                            <PrivateRoute path='/profile' component={ProfilePage}/>
                            <PrivateRoute path='/moviedetails/:id' component={MovieDetailsPage}/>
                            <PrivateRoute path='/search/:value' component={SearchPage}/>
                            <PrivateRoute path='/landing' component={LandingPage}/>
                            <PrivateRoute path='/towatchlist' component={MovieListPage} list="toWatchList"/>
                            <PrivateRoute path='/watchedlist' component={MovieListPage} list="watchedList"/>
                            <RedirectPath path='/*'/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
