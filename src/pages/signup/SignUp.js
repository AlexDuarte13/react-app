import React, { Component } from 'react';
import {registerUser} from '../../auth';
import { withRouter } from 'react-router-dom';
import './SignUp.css';
import $ from 'jquery';
import Inputmask from 'inputmask';
import LoadingSpinner from '../comum/LoadingSpinner';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            message: '',
            loading: false
        }
    }


    componentDidMount() {

        Inputmask({'mask': '(99) 99999-9999'}).mask($('#phone'));
        
    }

    handleSignUp = async e => {

        e.preventDefault();
        
        this.setState({message: ''})
    
        const user = {
           name: this.state.name,
           phone: this.state.phone,
           email: this.state.email,
           profile: 'INSURED'
        };

        const redirectToLogin = () => {

            this.props.history.push("/");
        }
    
        this.setState({loading: true});

        const response = await registerUser(user);

        if(!response.error) {

            this.setState({loading: false});
            
            this.setState({message: 'Seu cadastro foi realizado com sucesso. Um e-mail de confirmação com seus dados cadastrais foi enviado para ' + this.state.email + '. Em instantes você será redirecionado para área de Login.'})
            
            $('#div-messages').fadeIn(3000);

            setTimeout(redirectToLogin, 8000);
    
        } else {

            this.setState({loading: false});

            this.setState({message: 'Não foi possível realizar seu cadastro: ' + response.data});

            $('#div-messages').fadeOut(5000);

        }
    
    };

    render() {
        return (
            <div className="signup">
                <div className="app-messages" id="div-messages">{this.state.message}</div>
                <form>
                <div className="ajusteTamanho">
                <img src="img/logologin.png" className="center-block" />
                    <div className="form">
                    <input type="text" autoComplete="off" required  name="name" id="name" onChange={e => this.setState({ name: e.target.value })}></input>
                    <label htmlFor="text" className="label-name">
                        <span className="content-name">
                        Nome Completo
                        </span>
                    </label>
                    </div>
                    <div className="form">
                    <input type="text" autoComplete="off" required name="email" id="email" onChange={e => this.setState({ email: e.target.value })}></input>
                    <label htmlFor="text" className="label-name">
                        <span className="content-name">
                        E-mail
                        </span>
                    </label>
                    </div>
                    <div className="form">
                    <input type="text" autoComplete="off" required name="phone" id="phone" onChange={e => this.setState({ phone: e.target.value })}></input>
                    <label htmlFor="text" className="label-name">
                        <span className="content-name">
                        Telefone
                        </span>
                    </label>
                    </div>
                    <button type="submit" onClick={this.handleSignUp}>Enviar</button>
                </div>
                </form>
                {this.state.loading ? <LoadingSpinner /> : ''}
            </div>
        )
    }

}

export default withRouter(SignUp);