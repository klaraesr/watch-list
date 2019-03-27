import React, {Component} from 'react'
import Login from "../Components/Login/Login"
import model from './../Model.js'


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

    handleUsernameUpdate = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    handlePasswordUpdate = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    handleSubmitBtn = () => {
        if(this.state.username === '' || this.state.password === ''){
            this.setState({wrongPassword:true});
        } else{
            model.validateUser(this.state.username, this.state.password)
                .then(body => {
                    if (body.userId !== null) {
                        model.setCurrentUser(body.userId)
                    } else {
                        this.setState({wrongPassword: true})
                    }
                })
        }
    }

    handleForm = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Login
                    handlePasswordUpdate={this.handlePasswordUpdate}
                    handleUsernameUpdate={this.handleUsernameUpdate}
                    handleForm = {this.handleForm}
                    handleSubmitBtn={this.handleSubmitBtn}
                    username={this.state.username}
                    wrongPassword={this.state.wrongPassword}/>
            </div>
        );
    }
}

export default LoginPage;
