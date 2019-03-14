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

class App extends Component {
    constructor() {
        super()

        this.state = {
            userId: null
        }
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
                            <Route path='/profile/:id' render={({ location, match }) => <ProfilePage model={model} params={match.params} navbar={navbar}/>}/>
                            <Route path='/moviedetails/:id' render={({ location, match }) => <MovieDetailsPage model={model} params={match.params} navbar={navbar}/>}/>
                            <Route path='/search/:value' render={({ location, match }) => <SearchPage model={model} params={match.params} navbar={navbar}/>}/>
                            <Route path='/landing' render={() => <LandingPage model={model} navbar={navbar}/>}/>

                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
