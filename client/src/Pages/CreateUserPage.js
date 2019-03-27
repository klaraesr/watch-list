import React, {Component} from 'react'
import model from './../Model.js'
import CreateUser from "../Components/CreateUser/CreateUser";
import Redirect from "react-router-dom/es/Redirect";

class CreateUserPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            redirect: false,
            selectedFile: null,
            loading: false,
            error: false
        }
    }

    componentDidMount(){
        this.setState({redirect: false})
    }

    // Called on submit
    setUser = () => {
        if(this.state.selectedFile === null){ // if no image
            this.createUser(this.state.username, this.state.password, 'https://i.imgur.com/A8UolBd.png', 'w3mM2pWg0wbu75L')
        } else {
            model.uploadImage(this.state.selectedFile)
                .then(img => {
                    this.createUser(this.state.username, this.state.password, img.data.link, img.data.deletehash) // if no image
                })
                .catch(e => console.log(e))
        }
    }

    // Called from setUser
    createUser(username, password, link, deletehash) {
        model.createUser(username, password, link, deletehash)
            .then(data => {
                if(data.success === true) {
                    this.setState({loading: false, error: false, redirect: true})
                } else {
                    this.setState({loading: false, error: true})
                }
            })
            .catch(error => console.log(error))
    }

    handleFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    handleUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleSubmitBtn = () => {
        this.setState({loading: true})
        this.setUser()
    }

    handleForm = (e) => {
        e.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <CreateUser
                handleSubmitBtn = {this.handleSubmitBtn}
                handleForm = {this.handleForm}
                handleUsername = {this.handleUsername}
                handlePassword = {this.handlePassword}
                handleFileChange = {this.handleFileChange}

                username = {this.state.username}
                password = {this.state.password}
                selectedFile = {this.state.selectedFile}
                loading = {this.state.loading}
                error = {this.state.error}
                />
            </div>
        );
    }
}
export default CreateUserPage;
