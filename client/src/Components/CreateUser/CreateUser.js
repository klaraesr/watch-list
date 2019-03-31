import React, {Component} from 'react'
import { Link } from "react-router-dom"
import Loader from "react-loader-spinner"
import './CreateUser.css'

class CreateUser extends Component {
    render() {
        const { username, password} = this.props;
        return (
            <div>
                <div className="container" id="loginContainer">
                    {this.props.loading && <div id="loader-center"><Loader id="loader-center" type="Oval" color="#FF9A00" height="100" width="100"/></div>}
                    {!this.props.loading &&
                    <div>
                        <h3 id="loginHeader">CREATE USER</h3>
                        <form onSubmit={this.props.handleForm}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="username" value={this.props.username} onChange={this.props.handleUsername}
                                       className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp"
                                       placeholder="Enter username"/>
                                {this.props.error && <div style={{color: 'red'}}>Username is already in use.</div>}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" value={this.props.password} onChange={this.props.handlePassword}
                                       className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label>Profile picture</label>
                                <input type="file" onChange={this.props.handleFileChange}/>
                            </div>
                            <button onClick={this.props.handleSubmitBtn}
                                    disabled={username === '' || password === ''} //The user need to have a username, password
                                    type="submit" className="btn watchlistBtn no-margin">Submit
                            </button>
                        </form>
                        <Link to="/">
                            <button type="submit" className="btn watchlistBtn no-margin"> Back to login</button>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default CreateUser;
