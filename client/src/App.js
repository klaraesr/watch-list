import React, { Component } from 'react'
import model from "./Model"
import './App.css'
import LoginPage from "./Pages/LoginPage/LoginPage"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import MovieDetailsPage from "./Pages/MovieDetailsPage/MovieDetailsPage"
import SearchPage from "./Pages/SearchPage/SearchPage"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from "./Pages/LandingPage/LandingPage"
import Header from "./Components/Header/Header"
import Navbar from "./Components/Navbar/Navbar"
import MovieListPage from "./Pages/MovieListPage/MovieListPage";
import CreateUserPage from "./Pages/CreateUserPage/CreateUserPage";


class App extends Component {
    constructor() {
        super()

        this.state = {
            userId: null
        }
    }

    componentDidMount() {
        fetch('/api/test')
            .then(res => res.json())
            .then(data => {console.log(data)})
            .catch(e => console.log(e))
    }

    handleLogin = (userId) => {
        this.setState({ userId: userId })
    }

    render() {

        const navbar = <Navbar/>

        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path='/' component={LoginPage} handleLogin={this.handleLogin}/>
                            <Route path='/profile/:id' render={({ location, match, history }) => <ProfilePage model={model} params={match.params} navbar={navbar} history={history}/>}/>
                            <Route path='/moviedetails/:id' render={({ location, match}) => <MovieDetailsPage model={model} params={match.params} navbar={navbar}/>}/>
                            <Route path='/search/:value' render={({ location, match }) => <SearchPage model={model} params={match.params} navbar={navbar}/>}/>
                            <Route path='/landing' render={({history}) => <LandingPage model={model} navbar={navbar} history={history}/>}/>
                            <Route path='/movielist/:id' render={({location, match}) => <MovieListPage model={model} navbar={navbar} params={match.params}/>}/>
                            <Route path='/createuser' render={() => <CreateUserPage />}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
