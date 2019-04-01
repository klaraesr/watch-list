import React, {Component} from 'react'
import './Login.css'
import {Link} from "react-router-dom";


// stateless component
class Login extends Component {

    render() {
        return (
            <div className="container" id="loginContainer">
                {this.props.createdAccount && <p>Your account has been created. You can now log in!</p>}
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
                    <button type="submit" onClick={this.props.handleSubmitBtn} className="btn watchlistBtn no-margin">Submit</button>
                </form>
                <Link to="/createUser"> <button type="submit" className="btn watchlistBtn no-margin" id="signUpBtn"> Sign Up</button></Link>
            </div>
        );
    }
}

export default Login;
