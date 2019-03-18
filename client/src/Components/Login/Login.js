import React, {Component} from 'react'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wrongPassword: false,
            username: '',
            password: ''
        }
    }


    handleLogin = () => {
        console.log("Submit")
    }

    handleEmailUpdate = (e) => {
        console.log(e.target.value)
    }

    handlePasswordUpdate = (e) => {
        console.log(e.target.value)
    }

    render() {
        return (
            <div className="container" id="loginContainer">
                <h3 id="loginHeader">LOGIN</h3>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmailUpdate} id="usernameInput" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={this.handlePasswordUpdate} className="form-control" id="passwordInput" placeholder="Enter Password" required/>
                    </div>
                    {this.state.wrongPassword && <p id='wrongPassword'>Could not log in, please check your email or password.</p>}
                    <button type="submit" onClick={this.handleSubmitBtn } className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;
