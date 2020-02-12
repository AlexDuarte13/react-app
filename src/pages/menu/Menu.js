import React, { Component } from 'react';
import * as cookie from 'react-cookies';
import './Menu.css'
import menuConfig from './menuConfig';
import Perfil from '../perfil/Perfil';
import { NavLink } from 'react-router-dom';

class Menu extends Component {

    constructor(props) {
        
        super(props);

        const user_login = cookie.load('user_login');

        this.state = {
            menu: menuConfig,
            user: user_login.user,
            home_page: user_login.user.profile === 'ADMIN' ? '/vistorias': '/vistoria',
            fakeMenuNavLinkActive: props.fakeMenuNavLinkActive
        }
    }

    render() {
        return (
            <header className="header-home">
                <nav className="navbar navbar-expand-lg nav-mso display-desk">
                    <a className="navbar-brand mr-auto mr-lg-0" href={this.state.home_page}></a>
                    <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
                    <div className="navbar-toggler-icon">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    </button>
                    <div className="navbar-collapse offcanvas-collapse">
                        <ul className="navbar-nav padding-nav mx-auto nav-pills nav-fill easi-menu-nav">
                        {
                            this.state.fakeMenuNavLinkActive ? 
                                <li className="nav-item menu-nav-item easi-menu-nav-item">
                                    <NavLink 
                                        className='easi-menu-nav-link nav-link' 
                                        activeClassName='active' 
                                        to={this.state.fakeMenuNavLinkActive.url} exact>
                                        {this.state.fakeMenuNavLinkActive.label}
                                    </NavLink>
                                </li> : ''
                        }
                        {
                            menuConfig.map((value, key) => {
                                if(this.state.user.profile === value.role) {
                                    return <li key={key} className="nav-item menu-nav-item easi-menu-nav-item"><NavLink key={key} className='easi-menu-nav-link nav-link' activeClassName='active' to={value.url} exact>{value.label}</NavLink></li>
                                }
                            }) 
                        }
                        </ul>
                        <Perfil user={this.state.user} />
                    </div>
                </nav>
            </header>
        )
    }
}

export default Menu;