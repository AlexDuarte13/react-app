import React, { Component } from 'react';
import Menu from '../menu/Menu';
import $ from 'jquery';
import Inputmask from 'inputmask';
import LoadingSpinner from '../comum/LoadingSpinner';
import {registerUser} from '../../auth';
import './Segurado.css';
import Popup from '../comum/Popup';

class Segurado extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            profile: 'INSURED',
            mensagem: '',
            tipoMensagem: '',
            loading: false,
            showPopup: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSend = this.handleSend.bind(this);
   
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    handleFormValidation() {

        let mensagens = [];

        if(!$('[name="name"]').val().trim()) {
            mensagens.push('*O campo Nome completo é obrigatório.');
        }

        if(!$('[name="email"]').val().trim()) {
            mensagens.push('*O campo E-mail é obrigatório.');
        }

        if(!$('[name="phone"]').val().trim()) {
            mensagens.push('*O campo Telefone é obrigatório.');
        }

        return mensagens;

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSend = async e => {

        e.preventDefault();

        let msgError = this.handleFormValidation();
        if(msgError.length) {
            this.setState({mensagem: msgError, tipoMensagem: 'error'});
            this.togglePopup();
            return;
        }

        this.setState({loading: true});

        const data = {
            name: this.state.name,
            email: this.state.email,
            profile: this.state.profile,
            phone: this.state.phone
        };

        const response = await registerUser(data);

        debugger

        if(response.error) {

            let mensagem = response.data.status === 400 ? response.data.errors.map(item => item.defaultMessage) : response.data;

            this.setState({loading: false, mensagem: mensagem, tipoMensagem: 'error'});

        } else {

            this.setState({loading: false, mensagem: 'Usuário cadastrado com sucesso.', tipoMensagem: 'success'});

        }

        this.togglePopup();

    }

    componentDidMount() {

        Inputmask({'mask': '(99) 99999-9999'}).mask($('#phone'));
        
    }

    render() {
        return ( 
            <div>
                <Menu />
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div className="design-process-content bg-blank">
                    <h4>Registro de usuário</h4>
                    <form>
                       
                        <div className="container">

                            <div className="row-sub doc">
                                <h6>Segurado</h6>
                            </div>

                            <div className="col-md-8">
                                <div className="form">
                                    <input type="text" onChange={this.handleInputChange} autoComplete="off" required className="form-control" name="name" value={this.state.name} id="name" required="required"></input>
                                    <label htmlFor="name" className="label-name">
                                        <span className="content-name">Nome completo</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form">
                                    <input type="text" onChange={this.handleInputChange} autoComplete="off" required className="form-control" name="email" value={this.state.email} id="email" required></input>
                                    <label htmlFor="email" className="label-name">
                                        <span className="content-name">E-mail</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form">
                                    <input type="text" onChange={this.handleInputChange} autoComplete="off" required className="form-control" name="phone" value={this.state.phone} id="phone" required></input>
                                    <label htmlFor="phone" className="label-name">
                                        <span className="content-name">Telefone</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <button type="submit" className="btn btn-final" onClick={this.handleSend}>Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.loading ? <LoadingSpinner /> : ''}
                {
                    this.state.showPopup ? 
                        <Popup content={this.state.mensagem} type={this.state.tipoMensagem} closePopup={this.togglePopup.bind(this)} size={'small'} />
                    : null
                }
            </div>
        )
    }
}

export default Segurado;