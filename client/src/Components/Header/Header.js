import React, {Component} from 'react'
import './Header.css'
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/landing"><img id="logoimg" alt="Watch List" src="/watchlistlogo.png"/></Link>
            </div>
        );
    }
}

export default Header;
