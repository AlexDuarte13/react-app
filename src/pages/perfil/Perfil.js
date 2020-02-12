import React, { Component } from 'react';
import * as cookie from 'react-cookies';
import './Perfil.css'

class Perfil extends Component {

    constructor(props) {

        super(props);

        this.state = {
            username: props.user.name,
            photo: ''
        }
    }

    state = {
        username: '',
        photo: ''
    };

    render() {
        return (
            <div className="navbar-nav">
                <div className="nav-user">
                    <a href="#"><img className="img-avatar" src={this.state.photo? this.state.photo : 'img/default-profile-picture-clipart-3.jpg'} /></a>
                </div>
                <ul className="navbar-nav ml-auto ml-auto-ajustes nav-responsive-none">
                    <li className="nav-item">
                        <span className="nav-link white padding-li-itens" href="#">{this.state.username}</span>
                        <span><a className="nav-link yellow padding-li-itens" href="/">Sair</a></span>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Perfil;