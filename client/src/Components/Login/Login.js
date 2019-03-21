import React, {Component} from 'react'
import './Login.css'
import {Link} from "react-router-dom";


// stateless component
class Login extends Component {
    render() {
        return (
            <div className="container" id="loginContainer">
                <h3 id="loginHeader">LOGIN</h3>
                <form onSubmit={this.props.handleForm}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="username" className="form-control" value={this.props.username} onChange={this.props.handleUsernameUpdate} id="usernameInput" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={this.props.handlePasswordUpdate} className="form-control" id="passwordInput" placeholder="Enter Password" required/>
                    </div>
                    {this.props.wrongPassword && <p id='wrongPasswordId'>Could not log in, please check your email or password.</p>}
                    <button type="submit" onClick={this.props.handleLogin} className="btn btn-primary">Submit</button>
                </form>
                <Link to="/createUser"> <button type="submit" onClick={this.props.handleLogin} className="btn btn-primary" id="signUpBtn"> Sign Up</button></Link>
            </div>
        );
    }
}

export default Login;
