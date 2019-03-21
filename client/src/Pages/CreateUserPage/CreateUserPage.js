import React, {Component} from 'react';
import CreateUser from "../../Components/CreateUser/CreateUser";
import * as config from "../../config";
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

    setUser = () => {
        fetch('https://api.imgur.com/3/image/', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${config.client}`
            },
            body: this.state.selectedFile
        })
            .then(res => res.json())
            .then(img => {
                this.createUser(this.state.username, this.state.password, img.data.link, img.data.deletehash)
            })
            .catch(e => console.log(e))
        }


    createUser(username, password, link, deletehash) {
        fetch('/api/createuser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                link: link,
                deletehash: deletehash
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.success === true) {
                    this.setState({redirect: true, loading: false, error: false})
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

    // deletehash is if we want to delete the image from imgur. You do this with https://api.imgur.com/3/image/{id}, where {id} is the deletehash.
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
