import React, {Component} from 'react'
import './Login.css'

// stateless component
class Login extends Component {
    render() {
        return (
            <div className="container" id="loginContainer">
                <h3 id="loginHeader">LOGIN</h3>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" value={this.props.email} onChange={this.props.handleEmailUpdate} id="usernameInput" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={this.props.handlePasswordUpdate} className="form-control" id="passwordInput" placeholder="Enter Password" required/>
                    </div>
                    {this.props.wrongPassword && <p id='wrongPassword'>Could not log in, please check your email or password.</p>}
                    <button type="submit" onClick={this.props.handleSubmitBtn } className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;
