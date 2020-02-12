import React, { Component } from 'react';
import axios from 'axios';
import './Automovel.css'
import $ from 'jquery';

export default class Automovel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fotoRecibo: null,
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
            fotoCNH: null,
            fotoCRLV: null,
            placa: '',
            uf: '',
            chassi: '',
            renavam: '',
            marcaModelo: '',
            anoVeiculo: '',
            equipamentos: [],
            km: '',
            cor: '',
            combustivel: '',
            tipoVeiculo: '',
            capacidadePassageiro: '',
            fabricante: '',
            fotoDianteiraDireita: null,
            fotoDianteiraEsquerda: null,
            fotoTraseiraDireita: null,
            fotoTraseiraEsquerda: null,
            mensagem: '',

        };

        this.changeInput = this.changeInput.bind(this)
        this.salvarVistoria = this.salvarVistoria.bind(this)
        this.obterFotoRecibo = this.obterFotoRecibo.bind(this)
        this.obterFotoCNH = this.obterFotoCNH.bind(this)
        this.obterFotoCRLV = this.obterFotoCRLV.bind(this)
        this.verificarFotoRecibo = this.verificarFotoRecibo.bind(this)
        this.verificarFotoCRLV = this.verificarFotoCRLV.bind(this)
        this.obterFotoDianteiraDireita = this.obterFotoDianteiraDireita.bind(this)
        this.obterFotoDianteiraEsquerda = this.obterFotoDianteiraEsquerda.bind(this)
        this.obterFotoTraseiraDireita = this.obterFotoTraseiraDireita.bind(this)
        this.obterFotoTraseiraEsquerda = this.obterFotoTraseiraEsquerda.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        
        
    }

    obterFotoRecibo = event => {
        this.setState({
            fotoRecibo: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoCNH = event => {
        this.setState({
            fotoCNH: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoCRLV = event => {
        this.setState({
            fotoCRLV: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoDianteiraDireita = event => {
        this.setState({
            fotoDianteiraDireita: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoDianteiraEsquerda = event => {
        this.setState({
            fotoDianteiraEsquerda: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoTraseiraDireita = event => {
        this.setState({
            fotoTraseiraDireita: event.target.files[0],
            loaded: 0,
        })
    }

    obterFotoTraseiraEsquerda = event => {
        this.setState({
            fotoTraseiraEsquerda: event.target.files[0],
            loaded: 0,
        })
    }

    verificarFotoRecibo = () => {
        const data = new FormData()
        data.append('foto', this.state.fotoRecibo)

        axios.post("http://localhost:8000/documentosPessoais/verificar_recibo/", data, { crossDomain: true }, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)

                this.setState({
                    cpfCnpj: res.data.cpfCnpj,
                    nome: res.data.nome,
                    logradouro: res.data.logradouro,
                    numero: res.data.numero,
                    cep: res.data.cep,
                    complemento: res.data.complemento,
                })

            })

    }

    verificarFotoCRLV = () => {
        const data = new FormData()
        data.append('foto', this.state.fotoCRLV)

        axios.post("http://localhost:8000/automovel/verificar_crlv/", data, { crossDomain: true }, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)

                this.setState({
                    placa: res.data.placa,
                    uf: res.data.uf,
                    chassi: res.data.chassi,
                    renavam: res.data.renavam,
                    marcaModelo: res.data.marcaModelo,
                    anoVeiculo: res.data.anoVeiculo,
                })

            })

    }

    salvarVistoria(event){

        var equipamentos = []
        
        equipamentos.push({
            id: null,
            nome: this.state.equipamentos
        })
        
        console.log(JSON.stringify(equipamentos))

        const data = new FormData()
        data.append('nome', this.state.nome)
        data.append('documentosPessoais.fotoRecibo', this.state.fotoRecibo)
        data.append('documentosPessoais.nome', this.state.nome)
        data.append('documentosPessoais.cpf', this.state.cpfCnpj)
        data.append('documentosPessoais.dataNascimento', this.state.dataNascimento)
        data.append('documentosPessoais.email', this.state.email)
        data.append('documentosPessoais.telefone', this.state.telefone)
        data.append('documentosPessoais.endereco.cep', this.state.cep)
        data.append('documentosPessoais.endereco.logradouro', this.state.logradouro)
        data.append('documentosPessoais.endereco.numero', this.state.numero)
        data.append('documentosPessoais.endereco.complemento', this.state.complemento)
        data.append('documentosPessoais.endereco.bairro', this.state.bairro)
        data.append('documentosPessoais.endereco.cidade', this.state.cidade)
        data.append('documentosPessoais.endereco.uf', this.state.ufEndereco)
        data.append('automovel.fotoCNH', this.state.fotoCNH)
        data.append('automovel.fotoCRLV', this.state.fotoCRLV)
        data.append('automovel.placa', this.state.placa)
        data.append('automovel.ufPlaca', this.state.uf)
        data.append('automovel.chassi', this.state.chassi)
        data.append('automovel.renavam', this.state.renavam)
        data.append('automovel.marcaModelo', this.state.marcaModelo)
        data.append('automovel.anoDoVeiculo', this.state.anoVeiculo)
        data.append('automovel.equipamentos', equipamentos)
        data.append('automovel.km', this.state.km)
        data.append('automovel.cor', this.state.cor)
        data.append('automovel.combustivel', this.state.combustivel)
        data.append('automovel.tipoVeiculo', this.state.tipoVeiculo)
        data.append('automovel.capacidadePassageiros', this.state.capacidadePassageiro)
        data.append('automovel.fabricante', this.state.fabricante)
        data.append('automovel.fotoDianteiraDireita', this.state.fotoDianteiraDireita)
        data.append('automovel.fotoDianteiraEsquerda', this.state.fotoDianteiraEsquerda)
        data.append('automovel.fotoTraseiraDireita', this.state.fotoTraseiraDireita)
        data.append('automovel.fotoTraseiraEsquerda', this.state.fotoTraseiraEsquerda)

        console.log(data.values())

        axios.post("http://localhost:8000/vistoria/", data, { crossDomain: true }, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)
                console.log(res.request)

                this.setState({
                    mensagem: res.statusText,
                })

            }).catch(error => {
                console.log(error.response)
            });
    }

    

    componentDidMount() {
        $("#salvarVistoria").click(function(){
            
            var data = new FormData();

            var equipamento = {
                id: null,
                nome: $("#equipamentos").val()
            }

            var automovel = {
                id: null,
                equipamentos: [equipamento],
                fotoCNH: $("#fotoCNH")[0].files[0],
                fotoCRLV: $("#fotoCRLV")[0].files[0],
                placa: $("#placa").val(),
                uf: $("#uf").val(),
                chassi: $("#chassi").val(),
                renavam: $("#renavam").val(),
                marcaModelo: $("#marcaModelo").val(),
                anoVeiculo: $("#anoVeiculo").val(),
                equipamentos: [equipamento],
                km: $("#km").val(),
                cor: $("#cor").val(),
                combustivel: $("#combustivel").val(),
                tipoVeiculo: $("#tipoVeiculo").val(),
                capacidadePassageiro: $("#capacidadePassageiro").val(),
                fabricante: $("#fabricante").val(),
                fotoDianteiraDireita: $("#fotoDianteiraDireita")[0].files[0],
                fotoDianteiraEsquerda: $("#fotoDianteiraEsquerda")[0].files[0],
                fotoTraseiraDireita: $("#fotoTraseiraDireita")[0].files[0],
                fotoTraseiraEsquerda: $("#fotoTraseiraEsquerda")[0].files[0],
            }

            var endereco = {
                id: null,
                cep: $("#cep").val(),
                logradouro: $("#logradouro").val(),
                numero: $("#numero").val(),
                complemento: $("#complemento").val(),
                bairro: $("#bairro").val(),
                cidade: $("#cidade").val(),
                uf: $("#ufEndereco").val(),
            }

            var documentosPessoais = {
                id: null,
                endereco: endereco,
                fotoRecibo: $("#fotoRecibo")[0].files[0],
                nome: $("#nome").val(),
                cpf: $("#cpfCnpj").val(),
                email: $("#email").val(),
                telefone: $("#telefone").val(),
                dataNascimento: $("#dataNascimento").val(),
            }

            var data = {
                id: null,
                nome: $("#nome").val(),
                automovel: automovel,
                documentosPessoais: documentosPessoais
            }

            console.log(JSON.stringify(data))

            $.ajax({
                type: "POST",
                url: "http://localhost:8000/vistoria/",
                data: data,// now data come in this function
                contentType: "application/x-www-form-urlencoded",
                processData: false,
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR) {
   
                    alert("success");// write success in " "
                },
   
                error: function (error, status) {
                    // error handler
                    console.log(error);
                    alert('fail' + status.code);
                }
             });

        });

        $("#abel").click(function(){
            alert("abel");
        });

        $("#simpleCall").click(function(){

            alert("chegou");

            var formData = new FormData();

            formData.append('foto', $("#fotoRecibo")[0].files[0])


            $.ajax({
                type: "POST",
                url: "http://localhost:8000/documentosPessoais/verificar_recibo/",
                data: formData,// now data come in this function
                processData: false,
                contentType: false,
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR) {
   
                    alert("success");// write success in " "
                },
   
                error: function (error, status) {
                    // error handler
                    console.log(error);
                    alert('fail' + status.code);
                }
             });

        });

    }





    changeInput(event){
        let target = event.target
        let index = target.name
        this.setState({
            [index]:target.value
        })
    }

    render() {



        return (
            <div className="linhasup">

                <form>
                <h2>{this.state.mensagem}</h2>
                <h2>Dados Pessoais</h2>
                    <div class="form-group">
                        <label for="fotoRecibo">Recibo</label>
                        <input type="file" id="fotoRecibo" name="fotoRecibo" onChange={this.obterFotoRecibo} />
                        <button type="button" onClick={this.verificarFotoRecibo} class="btn btn-success btn-block" >Verificar recibo</button>
                    </div>

                    <div class="form-group">
                        <label for="nome">Nome</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="nome" value={this.state.nome} id="nome" placeholder="Nome"></input>
                    </div>

                    <div class="form-group">
                        <label for="cpf">Cpf/Cnpj</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="cpfCnpj" value={this.state.cpfCnpj} id="cpfCnpj" placeholder="CPF/CNPJ"></input>
                    </div>

                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" onChange={this.changeInput} class="form-control" id="email" value={this.state.email} aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>

                    <div class="form-group">
                        <label for="telefone">Telefone</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="telefone" value={this.state.telefone} id="telefone" placeholder="Telefone"></input>
                    </div>

                    <div class="form-group">
                        <label for="dataNascimento">Data Nascimento</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="dataNascimento" value={this.state.dataNascimento} id="dataNascimento" placeholder="Data Nascimento"></input>
                    </div>

                    <h2>Endereço</h2>

                    <div class="form-group">
                        <label for="cep">CEP</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="cep" value={this.state.cep} id="cep" placeholder="CEP"></input>
                    </div>

                    <div class="form-group">
                        <label for="logradouro">Logradouro</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="logradouro" value={this.state.logradouro} id="logradouro" placeholder="Logradouro"></input>
                    </div>

                    <div class="form-group">
                        <label for="numero">Numero</label>
                            <input type="text" onChange={this.changeInput} class="form-control" name="numero" value={this.state.numero} id="numero" placeholder="Numero"></input>
                    </div>


                    <div class="form-group">
                        <label for="complemento">Complemento</label>
                            <input type="text" onChange={this.changeInput} class="form-control" name="complemento" value={this.state.complemento} id="complemento" placeholder="Complemento"></input>
                    </div>

                    <div class="form-group">
                        <label for="bairro">Bairro</label>
                            <input type="text" onChange={this.changeInput} class="form-control" name="bairro" value={this.state.bairro} id="bairro" placeholder="Bairro"></input>
                    </div>

                    <div class="form-group">
                        <label for="cidade">Cidade</label>
                            <input type="text" onChange={this.changeInput} class="form-control" name="cidade" value={this.state.cidade} id="cidade" placeholder="Cidade"></input>
                    </div>

                    <div class="form-group">
                        <label for="ufEndereco">Uf</label>
                            <input type="text" onChange={this.changeInput} class="form-control" name="ufEndereco" value={this.state.ufEndereco} id="ufEndereco" placeholder="ufEndereco"></input>
                    </div>


                    <h2>Dados do automovel</h2>
                    <div class="form-group">
                        <label for="fotoCNH">CNH</label>
                        <input type="file" id="fotoCNH" name="fotoCNH" onChange={this.obterFotoCNH}/>
                        <label for="fotoCRLV">CRLV</label>
                        <input type="file" id="fotoCRLV" name="fotoCRLV" onChange={this.obterFotoCRLV} />
                        <button type="button" class="btn btn-success btn-block" onClick={this.verificarFotoCRLV}>Verificar recibo</button>
                    </div>

                    <h2>Informacoes basicas do Automovel</h2>

                    <div class="form-group">
                        <label for="placa">Placa</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="placa" value={this.state.placa} id="placa" placeholder="Placa"></input>
                    </div>

                    <div class="form-group">
                        <label for="uf">Uf</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="uf" value={this.state.uf} id="uf" placeholder="Uf"></input>
                    </div>

                    <div class="form-group">
                        <label for="chassi">Chassi</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="chassi" value={this.state.chassi} id="chassi" placeholder="Chassi"></input>
                    </div>


                    <div class="form-group">
                        <label for="chassi">Renavam</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="renavam" value={this.state.renavam} id="renavam" placeholder="Renavam"></input>
                    </div>

                    <div class="form-group">
                        <label for="chassi">Marca/Modelo</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="marcaModelo" value={this.state.marcaModelo} id="marcaModelo" placeholder="Marca/Modelo"></input>
                    </div>

                    <div class="form-group">
                        <label for="chassi">Ano do Veiculo</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="anoVeiculo" value={this.state.anoVeiculo} id="anoVeiculo" placeholder="Ano"></input>
                    </div>

                    <h2>Equipamentos</h2>

                    <div class="form-group">
                        <label for="equipamentos">Equipamentos</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="equipamentos" value={this.state.equipamentos} id="equipamentos" placeholder="Equipamentos"></input>
                    </div>

                    <h2>Informações complementares do automovel</h2>

                    <div class="form-group">
                        <label for="km">Km</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="km" value={this.state.km} id="km" placeholder="km"></input>
                    </div>

                    <div class="form-group">
                        <label for="cor">Cor</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="cor" value={this.state.cor} id="cor" placeholder="cor"></input>
                    </div>

                    <div class="form-group">
                        <label for="combustivel">Combustivel</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="combustivel" value={this.state.combustivel} id="combustivel" placeholder="combustivel"></input>
                    </div>

                    <div class="form-group">
                        <label for="tipoVeiculo">Tipo de Veiculo</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="tipoVeiculo" value={this.state.tipoVeiculo} id="tipoVeiculo" placeholder="tipoVeiculo"></input>
                    </div>

                    <div class="form-group">
                        <label for="capacidadePassageiro">Capacidade de Passageiro</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="capacidadePassageiro" value={this.state.capacidadePassageiro} id="capacidadePassageiro" placeholder="capacidadePassageiro"></input>
                    </div>

                    <div class="form-group">
                        <label for="fabricante">Fabricante</label>
                        <input type="text" onChange={this.changeInput} class="form-control" name="fabricante" value={this.state.fabricante} id="fabricante" placeholder="fabricante"></input>
                    </div>

                    <h2>Fotos Adicionadas</h2>
                    <div class="form-group">
                        <label for="fotoDianteiraDireita">Dianteira Direita</label>
                        <input type="file" id="fotoDianteiraDireita" name="fotoDianteiraDireita" onChange={this.obterFotoDianteiraDireita} />
                        <label for="fotoDianteiraEsquerda">Dianteira Esquerda</label>
                        <input type="file" id="fotoDianteiraEsquerda" name="fotoDianteiraEsquerda" onChange={this.obterFotoDianteiraEsquerda} />
                        <label for="fotoTraseiraDireita">Traseira Direita</label>
                        <input type="file" id="fotoTraseiraDireita" name="fotoTraseiraDireita" onChange={this.obterFotoTraseiraDireita} />
                        <label for="fotoTraseiraEsquerda">Traseira Esquerda</label>
                        <input type="file" id="fotoTraseiraEsquerda" name="fotoTraseiraEsquerda" onChange={this.obterFotoTraseiraEsquerda} />
                    </div>                 

                    <a type="button" class="btn btn-success btn-block" onClick={this.salvarVistoria} >Enviar Vistoria</a>

                </form>
            </div>
        );
    }
}
