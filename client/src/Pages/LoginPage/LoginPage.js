import React, {Component} from 'react'
import './LoginPage.css'
import Login from "../../Components/Login/Login"

// statefull component
class LoginPage extends Component {
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
            <div>
                <Login
                    handlePasswordUpdate={this.handlePasswordUpdate}
                    handleEmailUpdate={this.handleEmailUpdate}
                    handleLogin={this.handleLogin}
                    email={this.state.email}
                    wrongPassword={this.state.wrongPassword}/>
            </div>
        );
    }
}

export default LoginPage;
