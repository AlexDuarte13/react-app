import React, { Component } from 'react';
import $ from 'jquery';
import './Home.css';
import {doAuthentication} from '../../auth';
import LoadingSpinner from '../comum/LoadingSpinner';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      loading: false,
      showPopup: false,
      mensagemPopup: '',
      tipoMensagem: ''
    };

    this.handleFormError = this.handleFormError.bind(this)

    this.handleSignIn = this.handleSignIn.bind(this)
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleFormValidation() {

    let errorMsg = [];

    if(!$('#username').val().trim()) {
      errorMsg.push('*O campo E-mail é obrigatório.')
    }

    if(!$('#password').val().trim()) {
      errorMsg.push('*O campo Senha é obrigatório.')
    }

    return errorMsg;
  }

  handleFormError = (mensagem) => {
    
    this.setState({message: mensagem});

    $('#username').val('');
    $('#password').val('');

    $('#div-messages').fadeOut(4000, 'swing', function() {
      $('#div-messages').html('');
      $('#div-messages').show();
    });
  }

  handleSignIn = async e => {

    e.preventDefault();

    this.setState({message: '', loading: true});

    let formErrors = this.handleFormValidation();

    if(formErrors.length) {
      this.handleFormError(formErrors);
      return;
    }
    
    const { username, password } = this.state;

    const response = await doAuthentication(username, password);
    
    if(response.forward_permission === 'authorized') {

      response.user_login.profile === 'ADMIN' ? this.props.history.push('/vistorias') : this.props.history.push('/vistoria');

    } else if(response.forward_permission === 'unauthorized') {

      this.handleFormError('Usuário e senha inválidos.');

    } else {

      this.handleFormError('Ocorreu um erro ao tentar efetuar o login. Tente novamente.');

    }

    this.setState({loading: false});

  };

  componentDidMount() {

    $('#login').on('click', function() {
      this.state.username = $('#username').val();
      this.state.password = $('#password').val();
    })

    $(document).ready(function () {
      $(".input-login").each(function () {
        if ($(this).val() != "") {
          $(this).parent().addClass("animation");
        }
      });
    });

    //Add animation when input is focused
    $(".login-input").focus(function () {
      $(this).parent().addClass("animation animation-color");
    });

    //Remove animation(s) when input is no longer focused
    $(".login-input").focusout(function () {
      if ($(this).val() === "")
        $(this).parent().removeClass("animation");
      $(this).parent().removeClass("animation-color");
    })

  }

  render() {

    return (
      <div className="login">
        <div className="app-messages" id="div-messages">{
            typeof(this.state.message) === 'object'?<ul>{this.state.message.map(value => {
                return <li>{value}</li>
            })}</ul> : this.state.message
          }</div>
        <form>
          <div className="ajusteTamanho">
          <img src="img/logologin.png" className="center-block" />
            <div className="form">
              <input type="text" autoComplete="off" required  name="username" id="username" onChange={e => this.setState({ username: e.target.value })}></input>
              <label htmlFor="text" className="label-name">
                <span className="content-name">
                  E-mail
                </span>
              </label>
            </div>
            <div className="form">
              <input type="password" autoComplete="off" required name="password" id="password" onChange={e => this.setState({ password: e.target.value })}></input>
              <label htmlFor="text" className="label-name">
                <span className="content-name">
                  Senha
                </span>
              </label>
            </div>
            <button type="submit" onClick={this.handleSignIn}>Entrar</button>
          </div>
        </form>
        {this.state.loading ? <LoadingSpinner /> : ''}
      </div>
    );
  }
}

export default Home;
