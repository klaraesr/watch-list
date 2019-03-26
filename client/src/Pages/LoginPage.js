import React, {Component} from 'react'
import Login from "../Components/Login/Login"
import Redirect from "react-router-dom/es/Redirect";


// statefull component
class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wrongPassword: false,
            username: '',
            password: '',
            redirect: false
        }

        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    componentDidMount() {
        fetch('/api/getCurrentUser')
            .then(res => res.json())
            .then(data => {
                if(data.userId !== ''){ // if logged in, redirect user to feed
                    console.log(data.userId)
                    this.props.handleLogin(data.userId)
                    this.setState({ redirect:true })
                }
            })
            .catch(error => console.log(error))
    }

    validateUser(username, password){
        fetch('/api/validateuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(body => {
                if (body.user !== "Invalid") {
                    this.setState({ redirect: true, wrongPassword: false });
                } else {
                    this.setState({wrongPassword:true});
                }
            })
            .catch(err => console.log(err))
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

    handleSubmitBtn() {
        if(this.state.username === '' || this.state.password === ''){
            this.setState({wrongPassword:true});

        } else{
            this.validateUser(this.state.username, this.state.password)
        }
    }

    handleForm(e){
        e.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/landing'/>
        }
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
