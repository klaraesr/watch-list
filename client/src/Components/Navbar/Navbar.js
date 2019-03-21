import React, {Component} from 'react'
import './Navbar.css'
import {Link, withRouter} from "react-router-dom"

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
        }
    }

    handleSearchValue = (event) => {
        this.setState({
            searchValue: event.target.value,
        })
    }

    handleSubmitBtn = () => {
       this.props.callback(this.state.searchValue)
    }

    logOut = () => {
        console.log("Log out")
    }

    handleForm = (e) => {
        e.preventDefault();
    }


    render() {
      let callback = null
      if(this.props.callback !== undefined) {
        callback = this.props.callback
      }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={"/profile/1"}>Profile</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/landing">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={this.logOut}>Log out</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.handleForm}>
                        <input className="form-control mr-sm-2" type="search"  value={this.state.searchValue} onChange={this.handleSearchValue} placeholder="Search" aria-label="Search" id="searchField"/>
                        {
                          callback === null ?
                              <Link to={'/search/' + this.state.searchValue}><button className="btn watchlistBtn my-2 my-sm-0" type="submit" id="searchBtnLink">Search</button></Link> :
                                <button className="btn watchlistBtn my-2 my-sm-0" type="submit" onClick={this.handleSubmitBtn} id="searchBtn">Search</button>
                        }

                    </form>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {};

export default withRouter(Navbar)
