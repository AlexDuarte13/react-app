import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import * as cookie from 'react-cookies';
import './estilo-teste.css';
import './Checklist.css';
import Menu from '../menu/Menu';
import PanelLaudo from './PanelLaudo'
import PanelVistoria from './PanelVistoria'
import jsPDF from 'jspdf'
import Popup from '../comum/Popup';

const URL = "http://" + window.location.hostname + ":9093/vistoria/"

export default class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = { vistoria: '', mensagem: '', showPopup: false, tipoMensagem: '' };
    this.get(props.location.state)
    this.changeInput = this.changeInput.bind(this)
    this.fakeMenuNavLinkActive = {
      url: '/checklist',
      label: 'Laudo'
    }
  }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  get = (state) => {
    const user_login = cookie.load('user_login');

    axios.get(URL.concat(state.id), { crossDomain: true, headers: { 'token': user_login.jwt } }).then(resp => {
      this.setState({ ...this.state, vistoria: resp.data })
    })
  }

  puttin = (vistoria) => {
    const user_login = cookie.load('user_login');

    const data = vistoria;

    axios.put(URL.concat(vistoria.id).concat('/laudo'), data, { crossDomain: true, headers: { 'token': user_login.jwt } }).then(resp => {
      console.log(resp.data)

      this.setState({ mensagem: 'Vistoria Salva com Sucesso!', tipoMensagem: 'success' });

      this.togglePopup();

    }).catch(error => {

      this.setState({ mensagem: 'Erro ao Salvar a Vistoria!', tipoMensagem: 'error' });

      this.togglePopup();

      console.log(error.response)

    });
  }

  changeInput(event) {
    let target = event.target
    let index = target.name
    this.setState({
      [index]: target.value
    })
  }

  dados = {
    id: 'ID',
    name: 'Name',
    email: 'Email',
    city: 'City',
    expenses: 'Sum'
  }

  jsPDFGenerator = (vistoria) => {
    let doc = new jsPDF('p', 'pt')

    doc.setFontSize(22);
    doc.setFontStyle('bold')
    doc.text(20, 50, 'Ebix Consulting');
    doc.setLineWidth(2.0);
    doc.line(20, 56, 560, 56);

    doc.setFontSize(16);
    doc.setFontStyle('bold')
    doc.text(20, 120, 'Situação Vistoria:');
    doc.setLineWidth(1.0);
    doc.line(20, 126, 560, 126);

    doc.setFontSize(14);
    doc.setFontStyle('bold')

    if (vistoria.recomendacao) {
      doc.setTextColor(34, 139, 34);
      doc.text(20, 140, '- APROVADA')
    } else {
      doc.setTextColor(255, 0, 0);
      doc.text(20, 140, '- RECUSADA')
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFontStyle('bold')
    doc.text(20, 180, 'Dados Segurado:');
    doc.setLineWidth(1.0);
    doc.line(20, 185, 560, 185);

    doc.setFontSize(14);
    doc.setFontStyle('normal')
    doc.text(20, 200, '- Nome:  ' + vistoria.documentosPessoais.nome);
    doc.text(20, 220, '- CPF/CNPJ:  ' + vistoria.documentosPessoais.cpfCnpj);
    doc.text(20, 240, '- Email:  ' + vistoria.documentosPessoais.email);
    doc.text(20, 260, '- Data de Nascimento:  ' + vistoria.documentosPessoais.dataNascimento);

    doc.setFontSize(16);
    doc.setFontStyle('bold')
    doc.text(20, 300, 'Dados Automovel:');
    doc.setLineWidth(1.0);
    doc.line(20, 305, 560, 305);

    doc.setFontSize(14);
    doc.setFontStyle('normal')
    doc.text(20, 320, '- Placa:  ' + vistoria.automovel.placa);
    doc.text(20, 340, '- Chassi:  ' + vistoria.automovel.chassi);
    doc.text(20, 360, '- Renavam:  ' + vistoria.automovel.renavam);
    doc.text(20, 380, '- Marca Modelo:  ' + vistoria.automovel.marcaModelo);
    doc.text(20, 400, '- Cor:  ' + vistoria.automovel.cor);
    doc.text(20, 420, '- Ano Modelo:  ' + vistoria.automovel.anoModelo);


    doc.save("Laudo.pdf");

  }

  render() {

    const { pageNumber, numPages } = this.state;

    return (

      <div>
        <Menu fakeMenuNavLinkActive={this.fakeMenuNavLinkActive} />

        <noscript>You need to enable JavaScript to run this app.</noscript>
        <section className="container design-process-section vistoria automovel">
          {/** DADOS PESSOAIS*/}
          <div class="row">
            <div>
              <tr>
                <td>

                </td>
              </tr>
            </div>
            <div role="tabpanel" class="col-sm-12 tab-pane margem-vistoria" id="dados-pessoais">
              <div class="design-process-content bg-blank">
                <h4>Código</h4>
                <div class="row">
                  <div class="col-12 col-sm-12 col-md-12">
                    <div class="form">
                      <input type="text" name="text" autocomplete="off" required="" value={this.state.vistoria.id} />
                      <label for="text" class="label-name">
                        <span class="content-name">ID</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="row">

            <PanelVistoria fotoVeiculo={this.state.vistoria.fotoVeiculo}></PanelVistoria>
            <PanelLaudo vistoria={this.state.vistoria}></PanelLaudo>

            <div class="row row col-sm-12 margem-vistoria" >
              <div class="buttons-tab" className={"margem-botao"}>
                <button type="button" name="button" class="btn btn-second float-left prev" onClick={() => this.jsPDFGenerator(this.state.vistoria)} >Gerar PDF</button>
                <button type="button" name="button" class="btn btn-final float-right" data-toggle="modal"
                  data-target="#finalizar-vistoria" >Finalizar Laudo</button>
                <div class="clearfix"></div>
              </div>
            </div>

            <div class="modal fade" id="finalizar-vistoria" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Finalizar Laudo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-12">
                        <p>Tem certeza que deseja <b>ENVIAR</b> a Vistoria?</p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-cancelar" data-dismiss="modal">Não</button>
                    <button type="button" class="btn btn-final" onClick={() => this.puttin(this.state.vistoria)} data-dismiss="modal" >Sim</button>
                  </div>
                </div>
              </div>

            </div>

            <div>
              {
                this.state.showPopup ?
                  <Popup content={this.state.mensagem} type={this.state.tipoMensagem} closePopup={this.togglePopup.bind(this)} size={'small'} />
                  : null
              }
            </div>
          </div>

        </section>

      </div>


    );
  }
}
