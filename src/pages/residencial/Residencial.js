import React, { Component } from 'react';
import './Residencial.css'
import axios from 'axios';
import Menu from '../menu/Menu';

export default class Residencial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            cpfCnpj: '',
            email: '',
            telefone: '',
            dataNascimento: '',
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            ufEndereco: '',
            quantidade_quartos: '',
            quantidade_salas: '',
            quantidade_cozinha: '',
            quantidade_banheiro: '',
            quantidade_quintal: '',
            fotoSala: null,
            fotoQuarto: null,
            fotoBanheiro: null,
            fotoCozinha: null,

        };

        this.changeInput = this.changeInput.bind(this)
        this.formataData = this.formataData.bind(this)
        this.obterFotoSala = this.obterFotoSala.bind(this)
        this.obterFotoQuarto = this.obterFotoQuarto.bind(this)
        this.obterFotoBanheiro = this.obterFotoBanheiro.bind(this)
        this.obterFotoCozinha = this.obterFotoCozinha.bind(this)
        this.salvarVistoria = this.salvarVistoria.bind(this)


    }

    obterFotoSala = event => {
        this.setState({
            fotoSala: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoQuarto = event => {
        this.setState({
            fotoQuarto: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoBanheiro = event => {
        this.setState({
            fotoBanheiro: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoCozinha = event => {
        this.setState({
            fotoCozinha: event.target.files[0],
            loaded: 0,
        })
    }

    changeInput(event) {
        let target = event.target
        let index = target.name
        this.setState({
            [index]: target.value
        })
        console.log(target.value)
    }

    formataData(event) {

        let target = event.target
        let index = target.name

        var data = target.value;
        if (event.onKeyPress != 8 && event.onKeyPress != 46) {
            if (data.length == 2) {
                target.value = data += '/';
            } else if (data.length == 5) {
                target.value = data += '/';
            } else
                target.value = data;
        }

        this.setState({
            [index]: target.value
        })
        console.log(target.value)
    }

    salvarVistoria(event) {

        const data = new FormData()
        data.append('nome', this.state.nome)
        data.append('documentosPessoaisImoveis.nome', this.state.nome)
        data.append('documentosPessoaisImoveis.cpf', this.state.cpfCnpj)
        data.append('documentosPessoaisImoveis.dataNascimento', this.state.dataNascimento)
        data.append('documentosPessoaisImoveis.email', this.state.email)
        data.append('documentosPessoaisImoveis.telefone', this.state.telefone)
        data.append('endereco.cep', this.state.cep)
        data.append('endereco.logradouro', this.state.logradouro)
        data.append('endereco.numero', this.state.numero)
        data.append('endereco.complemento', this.state.complemento)
        data.append('endereco.bairro', this.state.bairro)
        data.append('endereco.cidade', this.state.cidade)
        data.append('endereco.uf', this.state.ufEndereco)
        data.append('imovel.fotoSala', this.state.fotoSala)
        data.append('imovel.fotoQuarto', this.state.fotoQuarto)
        data.append('imovel.fotoBanheiro', this.state.fotoBanheiro)
        data.append('imovel.fotoCozinha', this.state.fotoCozinha)
        data.append('imovel.quantidade_quartos', this.state.quantidade_quartos)
        data.append('imovel.quantidade_salas', this.state.quantidade_salas)
        data.append('imovel.quantidade_cozinha', this.state.quantidade_cozinha)
        data.append('imovel.quantidade_quintal', this.state.quantidade_quintal)
        data.append('imovel.quantidade_banheiro', this.state.quantidade_banheiro)

        console.log(data.values())

        axios.post("http://localhost:8000/vistoria_imoveis/", data, { crossDomain: true }, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)
                console.log(res.request)

                this.setState({
                    mensagem: res.statusText,
                })
                alert('Vistoria do imovél realizada com sucesso:\n' + res.status + '-' + res.statusText);
            }).catch(error => {
                alert(error.response.status + '-' + error.response.statusText + ':\n' + error.response.request.response);
                console.log(error.response)
            });
    }

    render() {
        return (
            <div>
                <Menu />
                <section class="container design-process-section vistoria residencial">

                    <ul class="nav nav-tabs process-model more-icon-preocess" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#dados-pessoais" aria-controls="dados-pessoais" role="tab" data-toggle="tab">
                                <span class="border-active">
                                    <span>
                                        <img src="img/icon-dados-pessoais.png" />
                                    </span>
                                </span>
                                <p>Dados pessoais</p>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#dados-veiculos" aria-controls="dados-veiculos" role="tab" data-toggle="tab">
                                <span class="border-active">
                                    <span>
                                        <img src="img/icon-dados-residencia.png" />
                                    </span>
                                </span>
                                <p>Dados da residência</p>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#vistoria" aria-controls="vistoria" role="tab" data-toggle="tab">
                                <span class="border-active">
                                    <span>
                                        <img src="img/icon-vistoria.png" />
                                    </span>
                                </span>
                                <p>Vistoria</p>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">

                        <div role="tabpanel" class="tab-pane active" id="dados-pessoais">

                            <div class="design-process-content bg-blank">
                                <h4>Dados pessoais</h4>

                                <form>

                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-md-8">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="nome" value={this.state.nome} id="nome"></input>
                                                <label htmlFor="nome" className="label-name">
                                                    <span className="content-name">Nome</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-5 col-md-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cpfCnpj" value={this.state.cpfCnpj} id="cpfCnpj"></input>
                                                <label htmlFor="cpfCnpj" className="label-name">
                                                    <span className="content-name">CPF</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-7 col-md-4">
                                            <div className="form">
                                                <input type="email" name="email" autoComplete="off" required="" onChange={this.changeInput} className="form-control" id="email" value={this.state.email} aria-describedby="emailHelp"></input>
                                                <label htmlFor="email" className="label-name">
                                                    <span className="content-name">E-mail</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-3">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="telefone" value={this.state.telefone} id="telefone"></input>
                                                <label htmlFor="telefone" className="label-name">
                                                    <span className="content-name">Telefone</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-5">
                                            <div className="form-group input-group date form_datetime" data-date-format="dd/mm/yyyy" data-link-field="dataNascimento">
                                                <div className="form">
                                                    <input className="form-control date input-date" onChange={this.formataData} size="16" type="text" value={this.state.dataNascimento} maxLength="10" id="dataNascimento" name="dataNascimento" onKeyPress={this.formataData} placeholder="" autoComplete="off" required />
                                                    <label htmlFor="dataNascimento" className="label-name">
                                                        <span className="content-name">
                                                            <span className="icon-doc-calendario icones" aria-hidden="true"></span>
                                                            <span>Data de nascimento</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="buttons-tab">
                                <button type="button" name="button" class="btn btn-primary float-right next" role="tab" data-toggle="tab" aria-controls="negociacao" onclick="">Próximo</button>
                                <div class="clearfix"></div>
                            </div>

                        </div>


                        <div role="tabpanel" class="tab-pane" id="dados-veiculos">
                            <div class="design-process-content bg-blank">
                                <h4>Dados da residência</h4>

                                <form>
                                    <div class="row">
                                        <div class="col-12 col-sm-3 col-md-2 col-lg-2">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cep" value={this.state.cep} id="cep"></input>
                                                <label htmlFor="cep" className="label-name">
                                                    <span className="content-name">CEP</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-9 col-md-8 col-lg-8">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="logradouro" value={this.state.logradouro} id="logradouro"></input>
                                                <label htmlFor="logradouro" className="label-name">
                                                    <span className="content-name">Logradouro</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-2 col-md-2 col-lg-2">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="numero" value={this.state.numero} id="numero"></input>
                                                <label htmlFor="numero" className="label-name">
                                                    <span className="content-name">Nº</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-4 col-md-3 col-lg-2">
                                            <div className="form">
                                                <input type="text" autoComplete="off" required="" onChange={this.changeInput} className="form-control" name="complemento" value={this.state.complemento} id="complemento"></input>
                                                <label htmlFor="complemento" className="label-name">
                                                    <span className="content-name">Complemento</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-9 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="bairro" value={this.state.bairro} id="bairro"></input>
                                                <label htmlFor="bairro" className="label-name">
                                                    <span className="content-name">Bairro</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-10 col-md-10 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cidade" value={this.state.cidade} id="cidade"></input>
                                                <label htmlFor="cidade" className="label-name">
                                                    <span className="content-name">Cidade</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-2 col-md-2 col-lg-2">
                                            <div className="form-select">
                                                <select className="form-control" onChange={this.changeInput} name="ufEndereco" value={this.state.ufEndereco} id="ufEndereco">
                                                    <option>UF</option>
                                                    <option>RJ</option>
                                                    <option>SP</option>
                                                    <option>MG</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>

                            <div class="buttons-tab">
                                <button type="button" name="button" class="btn btn-second float-left prev">Anterior</button>
                                <button type="button" name="button" class="btn btn-primary float-right next">Próximo</button>
                                <div class="clearfix"></div>
                            </div>

                        </div>

                        <div role="tabpanel" class="tab-pane" id="vistoria">
                            <div class="design-process-content bg-blank">
                                <h4>Vistoria</h4>

                                <form>
                                    <div class="row-sub">
                                        <h6>Quantidade de cômodos</h6>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-sm-4">
                                            <div class="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="quantidade_quartos" value={this.state.quantidade_quartos} id="quantidade_quartos"></input>
                                                <label for="quantidade_quartos" class="label-name">
                                                    <span class="content-name">Quarto</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-4">
                                            <div class="form">
                                            <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="quantidade_salas" value={this.state.quantidade_salas} id="quantidade_salas"></input>
                                                <label for="quantidade_salas" class="label-name">
                                                    <span class="content-name">Sala</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-4">
                                            <div class="form">
                                            <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="quantidade_cozinha" value={this.state.quantidade_cozinha} id="quantidade_cozinha"></input>
                                                <label for="quantidade_cozinha" class="label-name">
                                                    <span class="content-name">Cozinha</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-4">
                                            <div class="form">
                                            <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="quantidade_banheiro" value={this.state.quantidade_banheiro} id="quantidade_banheiro"></input>
                                                <label for="quantidade_banheiro" class="label-name">
                                                    <span class="content-name">Banheiro</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-8">
                                            <div class="form">
                                            <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="quantidade_quintal" value={this.state.quantidade_quintal} id="quantidade_quintal"></input>
                                                <label for="quantidade_quintal" class="label-name">
                                                    <span class="content-name">Varanda ou quintal</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 p-0">
                                        <button type="button" name="button" class="btn btn-confirm float-right">Confirmar</button>
                                        <div class="clearfix"></div>
                                    </div>
                                </form>
                                <div class="row-sub">
                                    <h6>Fotos</h6>
                                </div>

                                <div class="row gallery">
                                    <div class="col-sm-6 col-md-6 col-lg-4">
                                        <div class="animation">
                                            <img src="img/sala.png" />
                                            
                                            <h3>Sala</h3>
                                            <form>
                                                <label htmlFor="fotoSala"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoSala" name="fotoSala" onChange={this.obterFotoSala} />
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-4">
                                        <div class="animation">
                                            <img src="img/quarto.png" />
                                            <h3>Quarto</h3>
                                            <form>
                                                <label htmlFor="fotoQuarto"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoQuarto" name="fotoQuarto" onChange={this.obterFotoQuarto} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-4">
                                        <div class="animation">
                                            <img src="img/banheiro.png" />
                                            <h3>Banheiro</h3>
                                            <form>
                                                <label htmlFor="fotoBanheiro"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoBanheiro" name="fotoBanheiro" onChange={this.obterFotoBanheiro} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6 col-lg-4">
                                        <div class="animation">
                                            <img src="img/cozinha.png" />
                                            <h3>Cozinha</h3>
                                            <form>
                                                <label htmlFor="fotoCozinha"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoCozinha" name="fotoCozinha" onChange={this.obterFotoCozinha} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="buttons-tab">
                                <button type="button" name="button" class="btn btn-second float-left prev">Anterior</button>
                                <button type="button" name="button" class="btn btn-final float-right" data-toggle="modal" data-target="#finalizar-vistoria">Finalizar vistoria</button>
                                <div class="clearfix"></div>

                            </div>
                        </div>
                    </div>


                </section>

                <div className="modal fade" id="finalizar-vistoria" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Finalizar vistoria</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <p>Tem certeza que deseja enviar a vistoria?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancelar" data-dismiss="modal">Não</button>
                                <button type="button" onClick={this.salvarVistoria} className="btn btn-final" data-dismiss="modal">Sim, pode enviar!</button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        );
    }
}
