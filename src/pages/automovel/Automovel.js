import React, { Component } from 'react';
import axios from 'axios';
import './Automovel.css'
import $ from 'jquery';
import LoadingSpinner from './LoadingSpinner';
import Checkimage from './Checkimage';
import * as cookie from 'react-cookies';
import Menu from '../menu/Menu';


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
            equipamentos: '',
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
            loading: false,

            //DocumentosID
            idCNH: 0,
            idCRLV: 0,

            //Fotos nova logica

            fotoDianteiraDireitaURL: '',
            fotoDianteiraEsquerdaURL: '',
            fotoTraseiraDireitaURL: '',
            fotoTraseiraEsquerdaURL: '',
            fotoChassiURL: '',
            fotoMotorURL: '',
            fotoPainelURL: '',
            fotoPortaMalaURL: '',
            fotoChassi: '',
            fotoMotor: '',
            fotoPainel: '',
            fotoPortaMala: '',



            idfotoDianteiraEsquerda: 0,
            idfotoDianteiraDireita: 0,
            idfotoTraseiraEsquerda: 0,
            idfotoTraseiraDireita: 0,
            idfotoChassi: 0,
            idfotoMotor: 0,
            idfotoPainel: 0,
            idfotoPortaMala: 0,
            fotoDianteiraEsquerdaCheck: false,
            fotoDianteiraDireitaCheck: false,
            fotoTraseiraDireitaCheck: false,
            fotoTraseiraEsquerdaCheck: false,
            fotoChassiCheck: false,
            fotoMotorCheck: false,
            fotoPainelCheck: false,
            fotoPortaMalaCheck: false,
            foto: null,
            fotoURL: '',

            //security
            jwt: '',
            user: '',

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
        this.formataData = this.formataData.bind(this)

        this.salvarFotosVeiculo = this.salvarFotosVeiculo.bind(this)

        const user_ = cookie.load('user_login');

        this.state = {
            user: user_.user
        }


    }

    obterFotoRecibo = event => {
        this.setState({
            fotoRecibo: event.target.files[0],
            loading: true,
        })
        const user_login = cookie.load('user_login');
        const data = new FormData()
        data.append('foto', event.target.files[0])

        axios.post("http://"+window.location.hostname+":9093/vistoria/salvar_cnh/", data, { crossDomain: true, headers: {'token':user_login.jwt}}, { // receive two parameter endpoint url ,form data 

        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)

                this.setState({
                    loading: false,
                    cpfCnpj: res.data.cpfCnpj,
                    nome: res.data.nome,
                    logradouro: res.data.logradouro,
                    numero: res.data.numero,
                    cep: res.data.cep,
                    complemento: res.data.complemento,
                    idCNH: res.data.idRegistroDocumento,
                })

            }).catch(error => {

                this.setState({
                    loading: false
                })
                alert(error.response);
                console.log(error.response)
            });
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
            loading: true,
        })
        const user_login = cookie.load('user_login');
        const data = new FormData()
        data.append('foto', event.target.files[0])
        axios.post("http://"+window.location.hostname+":9093/vistoria/salvar_crlv/", data, { crossDomain: true, headers: {'token':user_login.jwt}}, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)

                this.setState({
                    loading: false,
                    placa: res.data.placa,
                    uf: res.data.uf,
                    chassi: res.data.chassi,
                    renavam: res.data.renavam,
                    marcaModelo: res.data.marcaModelo,
                    anoVeiculo: res.data.anoVeiculo,
                    idCRLV: res.data.idRegistroDocumento,
                })

            }).catch(error => {
                this.setState({
                    loading: false
                })
                alert(error);
                console.log(error)
            });
    }

    obterFotoDianteiraDireita = event => {
        this.setState({
            fotoDianteiraDireita: event.target.files[0],
            loaded: 0,
            fotoDianteiraDireitaURL: URL.createObjectURL(event.target.files[0]),
            fotoDianteiraDireitaCheck: true,
        })
        console.log("Chegou")
    }

    obterFotoDianteiraEsquerda = event => {
        this.setState({
            fotoDianteiraEsquerda: event.target.files[0],
            loaded: 0,
            fotoDianteiraEsquerdaURL: URL.createObjectURL(event.target.files[0]),
            fotoDianteiraEsquerdaCheck: true,
        })
    }

    salvarFotosVeiculo = (tipo) => event => {
        this.setState({
            loading: true,
            //foto: event.target.files[0],
            //fotoURL: URL.createObjectURL(event.target.files[0]),
            //fotoDianteiraEsquerda: event.target.files[0],
            //fotoDianteiraEsquerdaURL: URL.createObjectURL(event.target.files[0]),
            
        })

        const user_login = cookie.load('user_login');

        if (tipo==='DIANTEIRAESQUERDA') {
            this.setState({
                fotoDianteiraEsquerda: event.target.files[0],
                fotoDianteiraEsquerdaURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='DIANTEIRADIREITA') {
            this.setState({
            fotoDianteiraDireita: event.target.files[0],
            fotoDianteiraDireitaURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='TRASEIRADIREITA') {
            this.setState({
            fotoTraseiraDireita: event.target.files[0],
            fotoTraseiraDireitaURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='TRASEIRAESQUERDA') {
            this.setState({
            fotoTraseiraEsquerda: event.target.files[0],
            fotoTraseiraEsquerdaURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='CHASSI') {
            this.setState({
            fotoChassi: event.target.files[0],
            fotoChassiURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='MOTOR') {
            this.setState({
            fotoMotor: event.target.files[0],
            fotoMotorURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='PAINEL') {
            this.setState({
            fotoPainel: event.target.files[0],
            fotoPainelURL: URL.createObjectURL(event.target.files[0]),
        })
        }else if (tipo==='PORTAMALA') {
            this.setState({
            fotoPortaMala: event.target.files[0],
            fotoPortaMalaURL: URL.createObjectURL(event.target.files[0]),
        })
        }


        console.log("primneiro lgo: " + this.state.fotoURL);
        console.log("esq lgo: " + this.state.fotoDianteiraEsquerdaURL);
        const data = new FormData()
        data.append('foto', event.target.files[0])
        data.append('tipo', tipo)
        axios.post("http://"+window.location.hostname+":9093/vistoria/salvarFotoVeiculo/", data, { crossDomain: true, headers: {'token':user_login.jwt}}, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data)

                    if (tipo==='DIANTEIRAESQUERDA') {
                        alert(tipo);
                        this.setState({
                        idfotoDianteiraEsquerda: res.data.id,
                        fotoDianteiraEsquerdaCheck: true,
                        //fotoDianteiraEsquerda: this.state.foto,
                        //fotoDianteiraEsquerdaURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='DIANTEIRADIREITA') {
                        alert(tipo);
                        this.setState({
                        idfotoDianteiraDireita: res.data.id,
                        fotoDianteiraDireitaCheck: true,
                        //fotoDianteiraDireita: this.state.foto,
                        //fotoDianteiraDireitaURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='TRASEIRADIREITA') {
                        alert(tipo);
                        this.setState({
                        idfotoTraseiraDireita: res.data.id,
                        fotoTraseiraDireitaCheck: true,
                        //fotoTraseiraDireita: this.state.foto,
                        //fotoTraseiraDireitaURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='TRASEIRAESQUERDA') {
                        alert(tipo);
                        this.setState({
                        idfotoTraseiraEsquerda: res.data.id,
                        fotoTraseiraEsquerdaCheck: true,
                        //fotoTraseiraEsquerda: this.state.foto,
                       // fotoTraseiraEsquerdaURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='CHASSI') {
                        alert(tipo);
                        this.setState({
                        idfotoChassi: res.data.id,
                        fotoChassiCheck: true,
                        //fotoChassi: this.state.foto,
                        //fotoChassiURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='MOTOR') {
                        alert(tipo);
                        this.setState({
                        idfotoMotor: res.data.id,
                        fotoMotorCheck: true,
                        //fotoMotor: this.state.foto,
                        //fotoMotorURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='PAINEL') {
                        alert(tipo);
                        this.setState({
                        idfotoPainel: res.data.id,
                        fotoPainelCheck: true,
                        //fotoPainel: this.state.foto,
                       // fotoPainelURL: this.state.fotoUrl,
                    })
                    }else if (tipo==='PORTAMALA') {
                        alert(tipo);
                        this.setState({
                        idfotoPortaMala: res.data.id,
                        fotoPortaMalaCheck: true,
                        //fotoPortaMala: this.state.foto,
                        //fotoPortaMalaURL: this.state.fotoUrl,
                    })
                    }

                    //this.setState({
                    //    foto: null,
                    //    fotoUrl: null,
                    //})

                this.setState({
                    loading: false,
                    loaded: 0,
                    
                })

            }).catch(error => {
                this.setState({
                    loading: false
                })
                alert(error);
                console.log(error)
            });
    }

    obterFotoTraseiraDireita = event => {
        this.setState({
            fotoTraseiraDireita: event.target.files[0],
            loaded: 0,
            fotoTraseiraDireitaURL: URL.createObjectURL(event.target.files[0]),
            fotoTraseiraDireitaCheck: true,
        })
    }

    obterFotoTraseiraEsquerda = event => {
        this.setState({
            fotoTraseiraEsquerda: event.target.files[0],
            loaded: 0,
            fotoTraseiraEsquerdaURL: URL.createObjectURL(event.target.files[0]),
            fotoTraseiraEsquerdaCheck: true,
        })
    }

    verificarFotoRecibo = () => {
        const data = new FormData()
        data.append('foto', this.state.fotoRecibo)
        const user_login = cookie.load('user_login');
        axios.post("http://"+window.location.hostname+":9093/automovel/verificar_recibo/", data, { crossDomain: true, headers: {'token':user_login.jwt}}, { // receive two parameter endpoint url ,form data 

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

            }).catch(error => {
                alert(error);
                console.log(error)
            });

    }

    verificarFotoCRLV = () => {
        const data = new FormData()
        data.append('foto', this.state.fotoCRLV)
        const user_login = cookie.load('user_login');
        axios.post("http://"+window.location.hostname+":9093/automovel/verificar_crlv/", data, { crossDomain: true, headers: {'token':user_login.jwt} }, { // receive two parameter endpoint url ,form data 
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

            }).catch(error => {
                alert(error);
                console.log(error)
            });

    }

    salvarVistoria(event) {

        var equipamento = []

        equipamento.push({
            id: null,
            nome: this.state.equipamentos
        })

        this.setState({
            loading: true,            
        })

        console.log(JSON.stringify(equipamento))

        const data = new FormData()

        //VISTORIA

        const automovel = {

            'placa': this.state.placa,
            'ufPlaca': this.state.uf,
            'chassi': this.state.chassi,
            'renavam': this.state.renavam,
            'marcaModelo': this.state.marcaModelo,
            'anoModelo': this.state.anoVeiculo,
            'km': this.state.km,
            'cor': this.state.cor,
            'combustivel': this.state.combustivel,
            'tipoVeiculo': this.state.tipoVeiculo,
            'capacidade_passageiros': this.state.capacidadePassageiro,
            'fabricante': this.state.fabricante,
            'regiaoGeografica': null,
            'pais': null,
            'cilindradas': null,
            'anoFabricacao': this.state.anoVeiculo,
            'localizacaoFabrica': null,
            'especie': null,
            'potencia': null,
            'procedencia': null,
            'veiculo_usado_como_taxi': false,
            'restricao_roubo_furto': false,
            'restrito_judicialmente': false,
            'pertence_consulado_autoridades_especiais': false,
            'existe_recall': false

        }

        const endereco = {

            'cep': this.state.cep,
            'logradouro': this.state.logradouro,
            'numero': this.state.numero,
            'complemento': this.state.complemento,
            'bairro': this.state.bairro,
            'cidade': this.state.cidade,
            'uf': this.state.ufEndereco


        }

        const documentosPessoais = {

            'nome': this.state.nome,
            'cpfCnpj': this.state.cpfCnpj,
            'dataNascimento': this.state.dataNascimento,
            'email': this.state.email,
            'telefone': this.state.telefone,
            'endereco': endereco

        }

        const user_login = cookie.load('user_login');

        const usuarioSegurado = {

            
            'id': user_login.user.id

        }

        const vistoria = {

            'nome': this.state.nome,
            'idfotoDianteiraEsquerda': this.state.idfotoDianteiraEsquerda,
            'idfotoDianteiraDireita': this.state.idfotoDianteiraDireita,
            'idfotoTraseiraEsquerda':this.state.idfotoTraseiraEsquerda,
            'idfotoTraseiraDireita': this.state.idfotoTraseiraDireita,
            'idfotoChassi': this.state.idfotoChassi,
            'idfotoMotor': this.state.idfotoMotor,
            'idfotoPainel': this.state.idfotoPainel,
            'idfotoPortaMala': this.state.idfotoPortaMala,
            'automovel': automovel,
            'documentosPessoais': documentosPessoais,
            'usuarioSegurado': usuarioSegurado,
            'idCNH': this.state.idCNH,
            'idCRLV': this.state.idCRLV

        }

        data.append('nome', this.state.nome)
        data.append('idfotoDianteiraEsquerda', this.state.idfotoDianteiraEsquerda)
        data.append('idfotoDianteiraDireita', this.state.idfotoDianteiraDireita)
        data.append('idfotoTraseiraEsquerda', this.state.idfotoTraseiraEsquerda)
        data.append('idfotoTraseiraDireita', this.state.idfotoTraseiraDireita)
        data.append('idfotoChassi', this.state.idfotoChassi)
        data.append('idfotoMotor', this.state.idfotoMotor)
        data.append('idfotoPainel', this.state.idfotoPainel)
        data.append('idfotoPortaMala', this.state.idfotoPortaMala)

        //USUARIO (PROVISORIO PEGAR DO JWT FUTURO)
        data.append('usuarioSegurado.id', 1)

        //DOCUMENTOS PESSOAIS
        data.append('documentosPessoais.fotoRecibo', this.state.fotoRecibo)
        data.append('documentosPessoais.nome', this.state.nome)
        data.append('documentosPessoais.cpfCnpj', this.state.cpfCnpj)
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

        //AUTOMOVEl
        //data.append('automovel.fotoCNH', this.state.fotoCNH)
        //data.append('automovel.fotoCRLV', this.state.fotoCRLV)
        data.append('automovel.placa', this.state.placa)
        data.append('automovel.ufPlaca', this.state.uf)
        data.append('automovel.chassi', this.state.chassi)
        data.append('automovel.renavam', this.state.renavam)
        data.append('automovel.marcaModelo', this.state.marcaModelo)
        data.append('automovel.anoModelo', this.state.anoVeiculo)
        //data.append('automovel.equipamentos', equipamento[0])
        data.append('automovel.km', this.state.km)
        data.append('automovel.cor', this.state.cor)
        data.append('automovel.combustivel', this.state.combustivel)
        data.append('automovel.tipoVeiculo', this.state.tipoVeiculo)
        data.append('automovel.capacidade_passageiros', this.state.capacidadePassageiro)
        data.append('automovel.fabricante', this.state.fabricante)

        data.append('automovel.regiaoGeografica', null)
        data.append('automovel.pais', null)
        data.append('automovel.cilindradas', null)
        data.append('automovel.anoFabricacao', this.state.anoVeiculo)
        data.append('automovel.localizacaoFabrica', null)
        data.append('automovel.especie', null)
        data.append('automovel.potencia', null)
        data.append('automovel.procedencia', null)
        data.append('automovel.veiculo_usado_como_taxi', false)
        data.append('automovel.restricao_roubo_furto', false)
        data.append('automovel.restrito_judicialmente', false)
        data.append('automovel.pertence_consulado_autoridades_especiais', false)
        data.append('automovel.existe_recall', false)

        console.log(vistoria);

        axios.post("http://"+window.location.hostname+":9093/vistoria/", vistoria, { crossDomain: true, headers: {'token':user_login.jwt}}, { // receive two parameter endpoint url ,form data 

        })
            .then(res => { // then print response status

                if(res.status===201){

                this.setState({
                    mensagem: res,
                    loading: false,
                    loaded: 0,
                })

                alert('Vistoria realizada com sucesso:\n' + res.status);
            }else{
                alert('Ocorreu um erro ao realizar a vistoria:\n' + res.status);
                this.setState({
                    loading: false,
                    loaded: 0,
                })
            }
            }).catch(error => {
                alert(error);
                console.log(error);
                this.setState({
                    loading: false
                })
            });
    }



    componentDidMount() {
        $("#salvarVistoria").click(function () {

            var data = new FormData();

            var equipamento = {
                id: null,
                nome: $("#equipamentos").val()
            }

            var automovel = {
                id: null,
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
                url: "http://"+window.location.hostname+":9093/vistoria/",
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

        $("#abel").click(function () {
            alert("abel");
        });

        $("#simpleCall").click(function () {

            alert("chegou");

            var formData = new FormData();

            formData.append('foto', $("#fotoRecibo")[0].files[0])


            $.ajax({
                type: "POST",
                url: "http://"+window.location.hostname+":9093/documentosPessoais/verificar_recibo/",
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

    render() {
        return (
            <div>
                <Menu />
                <section className="container design-process-section vistoria automovel">

                    <ul className="nav nav-tabs process-model more-icon-preocess" role="tablist">
                        <li role="presentation" className="active">
                            <a href="#dados-pessoais" aria-controls="dados-pessoais" role="tab" data-toggle="tab">
                                <span className="border-active">
                                    <span>
                                        <img src="img/icon-dados-pessoais.png" />
                                    </span>
                                </span>
                                <p>Dados pessoais</p>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#dados-veiculos" aria-controls="dados-veiculos" role="tab" data-toggle="tab">
                                <span className="border-active">
                                    <span>
                                        <img src="img/icon-dados-veiculos.png" />
                                    </span>
                                </span>
                                <p>Dados do veículo</p>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#vistoria" aria-controls="vistoria" role="tab" data-toggle="tab">
                                <span className="border-active">
                                    <span>
                                        <img src="img/icon-vistoria.png" />
                                    </span>
                                </span>
                                <p>Vistoria</p>
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        {/* <!-- DADOS PESSOAIS --> */}
                        <div role="tabpanel" className="tab-pane active" id="dados-pessoais">
                            <div className="design-process-content bg-blank">
                                <h4>Dados pessoais</h4>
                                <form>
                                    <div className="row-sub doc">
                                        <h6>Documentos</h6>
                                        <p className="tip">Faça upload da foto do recibo do seu veículo e agilize o preenchimento dos campos!</p>
                                    </div>


                                    <div className="row">
                                        <div className="col-5 col-sm-5 col-md-4 col-lg-3">
                                            <div className="form-group">
                                                <label htmlFor="fotoRecibo" className="especial">
                                                    <div id="carregarImgRecibo" className="bt-upload blue">
                                                        <span>CNH</span>
                                                    </div>
                                                </label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoRecibo" name="fotoRecibo" onChange={this.obterFotoRecibo} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-sub">
                                        <h6>Dados</h6>
                                    </div>
                                    <div className="row">

                                        <div className="col-12 col-sm-12 col-md-8">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="nome" value={this.state.nome} id="nome"></input>
                                                <label htmlFor="nome" className="label-name">
                                                    <span className="content-name">Nome</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-5 col-md-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cpfCnpj" value={this.state.cpfCnpj} id="cpfCnpj"></input>
                                                <label htmlFor="cpfCnpj" className="label-name">
                                                    <span className="content-name">CPF</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-7 col-md-4">
                                            <div className="form">
                                                <input type="email" name="email" autoComplete="off" required="" onChange={this.changeInput} className="form-control" id="email" value={this.state.email} aria-describedby="emailHelp"></input>
                                                <label htmlFor="email" className="label-name">
                                                    <span className="content-name">E-mail</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-3">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="telefone" value={this.state.telefone} id="telefone"></input>
                                                <label htmlFor="telefone" className="label-name">
                                                    <span className="content-name">Telefone</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-5">
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
                                    <div className="row-sub">
                                        <h6>Endereço</h6>
                                    </div>
                                    <div className="row">

                                        <div className="col-12 col-sm-3 col-md-2 col-lg-2">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cep" value={this.state.cep} id="cep"></input>
                                                <label htmlFor="cep" className="label-name">
                                                    <span className="content-name">CEP</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-9 col-md-8 col-lg-8">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="logradouro" value={this.state.logradouro} id="logradouro"></input>
                                                <label htmlFor="logradouro" className="label-name">
                                                    <span className="content-name">Logradouro</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-2 col-md-2 col-lg-2">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="numero" value={this.state.numero} id="numero"></input>
                                                <label htmlFor="numero" className="label-name">
                                                    <span className="content-name">Nº</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-4 col-md-3 col-lg-2">
                                            <div className="form">
                                                <input type="text" autoComplete="off" required="" onChange={this.changeInput} className="form-control" name="complemento" value={this.state.complemento} id="complemento"></input>
                                                <label htmlFor="complemento" className="label-name">
                                                    <span className="content-name">Complemento</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-9 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="bairro" value={this.state.bairro} id="bairro"></input>
                                                <label htmlFor="bairro" className="label-name">
                                                    <span className="content-name">Bairro</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-10 col-md-10 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cidade" value={this.state.cidade} id="cidade"></input>
                                                <label htmlFor="cidade" className="label-name">
                                                    <span className="content-name">Cidade</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-2 col-md-2 col-lg-2">
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

                            <div className="buttons-tab">
                                <button type="button" name="button" className="btn btn-primary float-right next" role="tab" data-toggle="tab" aria-controls="negociacao">Próximo</button>
                                <div className="clearfix"></div>
                            </div>

                        </div>

                        <div role="tabpanel" className="tab-pane" id="dados-veiculos">
                            <div className="design-process-content bg-blank">
                                <h4>Dados do veículo</h4>
                                <form>
                                    <div className="row-sub">
                                        <h6>Documentos</h6>
                                    </div>
                                    <div className="row">

                                      {/**  <div className="col-5 col-sm-5 col-md-4 col-lg-3">
                                            <div className="form-group">
                                                <label className="especial" htmlFor="fotoCNH">
                                                    <div id="carregarImgCNH" className="bt-upload blue">
                                                        <span>CNH</span>
                                                    </div>
                                                </label>
                                                <div className="classDaFoto">
                                                    <input hidden type="file" id="fotoCNH" name="fotoCNH" onChange={this.obterFotoCNH} />
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="col-5 col-sm-5 col-md-4 col-lg-3">
                                            <div className="form-group">
                                                <label htmlFor="fotoCRLV" className="especial">
                                                    <div id="carregarImg" className="bt-upload blue">
                                                        <span>CRLV</span>
                                                    </div>
                                                </label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoCRLV" name="fotoCRLV" onChange={this.obterFotoCRLV} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row-sub">
                                        <h6>Informações básicas do automóvel</h6>
                                    </div>

                                    <div className="row">

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="placa" value={this.state.placa} id="placa"></input>
                                                <label htmlFor="placa" className="label-name">
                                                    <span className="content-name">Placa</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                                            <div className="form-select">
                                                <select className="form-control" onChange={this.changeInput} name="uf" value={this.state.uf} id="uf">
                                                    <option>UF da placa</option>
                                                    <option>RJ</option>
                                                    <option>SP</option>
                                                    <option>MG</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="chassi" value={this.state.chassi} id="chassi"></input>
                                                <label htmlFor="chassi" className="label-name">
                                                    <span className="content-name">Chassi</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="renavam" value={this.state.renavam} id="renavam"></input>
                                                <label htmlFor="renavam" className="label-name">
                                                    <span className="content-name">Renavam</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="marcaModelo" value={this.state.marcaModelo} id="marcaModelo"></input>
                                                <label htmlFor="marcaModelo" className="label-name">
                                                    <span className="content-name">Marca/Modelo</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                                            <div className="form-group input-group date form_datetime" data-date-format="dd/mm/yyyy" data-link-field="dtp_input1">
                                                <div className="form">
                                                    <input className="form-control date input-date" onChange={this.changeInput} size="16" type="text" name="anoVeiculo" value={this.state.anoVeiculo} id="anoVeiculo" maxLength="4" placeholder="" autoComplete="off" required />
                                                    <label htmlFor="anoVeiculo" className="label-name">
                                                        <span className="content-name">
                                                            <span className="icon-doc-calendario icones" aria-hidden="true"></span>
                                                            <span>Ano do veículo</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-sub">
                                        <h6>Equipamentos</h6>
                                    </div>
                                    <div className="row mt-4">

                                        <div className="stld-fields col-11">
                                            <select onChange={this.changeInput} multiple={false} className="form-control" name="equipamentos" value={this.state.equipamentos} id="equipamentos">
                                                <option value="">Selecione</option>
                                                <option value="1">Vidro elétrico</option>
                                                <option value="2">Trava elétrico</option>
                                                <option value="3">Retrovisor elétrico</option>
                                                <option value="4">Ar-condicionado</option>
                                            </select>
                                        </div>

                                        <div className="col-1">
                                            <div id="add" data-ms="add" className="add-mais enty ms-actn">+</div>
                                        </div>

                                        <div className="col-12 col-sm-12">
                                            <div className="box-item display-none-box">
                                                <div id="box" className="sltd-box">
                                                    <span className="sltd-item sample">
                                                        <span data-ms="remove" className="stld-action ms-actn icon-residencial-lixeira"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row-sub">
                                        <h6>Informações complementares do automóvel</h6>
                                    </div>
                                    <div className="row">

                                        <div className="col-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="km" value={this.state.km} id="km"></input>
                                                <label htmlFor="km" className="label-name">
                                                    <span className="content-name">KM</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-9 col-md-9 col-lg-3">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="cor" value={this.state.cor} id="cor"></input>
                                                <label htmlFor="cor" className="label-name">
                                                    <span className="content-name">Cor</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                            <div className="form-select">
                                                <select onChange={this.changeInput} className="form-control" name="combustivel" value={this.state.combustivel} id="combustivel">
                                                    <option>Combustível</option>
                                                    <option value="GASOLINA">Gasolina</option>
                                                    <option value="ALCOOL">Álcool</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                            <div className="form-select">
                                                <select onChange={this.changeInput} className="form-control" name="tipoVeiculo" value={this.state.tipoVeiculo} id="tipoVeiculo">
                                                    <option value="">Tipo de veículo</option>
                                                    <option value="AUTOMOVEL">Automóvel</option>
                                                    <option value="MOTOCICLO">Motociclo</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="capacidadePassageiro" value={this.state.capacidadePassageiro} id="capacidadePassageiro"></input>
                                                <label htmlFor="capacidadePassageiro" className="label-name">
                                                    <span className="content-name">Capacidade de passageiros</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form">
                                                <input type="text" onChange={this.changeInput} autoComplete="off" required="" className="form-control" name="fabricante" value={this.state.fabricante} id="fabricante"></input>
                                                <label htmlFor="fabricante" className="label-name">
                                                    <span className="content-name">Fabricante</span>
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                </form>
                            </div>

                            <div className="buttons-tab">
                                <button type="button" name="button" className="btn btn-second float-left prev">Anterior</button>
                                <button type="button" name="button" className="btn btn-primary float-right next">Próximo</button>
                                <div className="clearfix"></div>
                            </div>

                        </div>


                        <div role="tabpanel" className="tab-pane" id="vistoria">
                            <div className="design-process-content bg-blank">
                                <h4>Vistoria</h4>
                                <div className="row gallery">

                                    <div className="col-sm-6 col-md-6 col-lg-4">
                                        <div className={this.state.fotoDianteiraEsquerdaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoDianteiraEsquerdaCheck ? <img src={this.state.fotoDianteiraEsquerdaURL} alt="" /> : <img src="/img/dianteira-esq-active.png" alt="" />}
                                            {this.state.fotoDianteiraEsquerdaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Dianteira esquerda</h3>

                                            <form>
                                                <label htmlFor="fotoDianteiraEsquerda"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                     <input type="file" hidden id="fotoDianteiraEsquerda" name="fotoDianteiraEsquerda" onChange={this.salvarFotosVeiculo("DIANTEIRAESQUERDA")} />
                                                </div>
                                            </form>
                                        </div>

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">

                                    <div className={this.state.fotoDianteiraDireitaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoDianteiraDireitaCheck ? <img src={this.state.fotoDianteiraDireitaURL} alt="" /> : <img src="img/dianteira-dir.png" alt="" />}
                                            {this.state.fotoDianteiraDireitaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Dianteira direita</h3>

                                            <form>
                                                <label htmlFor="fotoDianteiraDireita"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                     <input type="file" hidden id="fotoDianteiraDireita" name="fotoDianteiraDireita" onChange={this.salvarFotosVeiculo("DIANTEIRADIREITA")} />
                                                </div>
                                            </form>
                                        </div>

                                   {/*      <div className={this.state.fotoDianteiraDireitaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoDianteiraDireitaCheck ? <img src={this.state.fotoDianteiraDireitaURL} alt="" /> : <img src="img/dianteira-dir.png" />}
                                            {this.state.fotoDianteiraDireitaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Dianteira direita</h3>
                                            <form>
                                                <label htmlFor="fotoDianteiraDireita"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoDianteiraDireita" alt="" name="fotoDianteiraDireita" onChange={this.obterFotoDianteiraDireita} />
                                                </div>
                                            </form>
                                        </div> */}

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">
                                        <div className={this.state.fotoTraseiraEsquerdaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoTraseiraEsquerdaCheck ? <img src={this.state.fotoTraseiraEsquerdaURL} alt="" /> : <img src="/img/traseira-esq.png" alt="" />}
                                            {this.state.fotoTraseiraEsquerdaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Traseira esquerda</h3>

                                            <form>
                                                <label htmlFor="fotoTraseiraEsquerda"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoTraseiraEsquerda" name="fotoTraseiraEsquerda" onChange={this.salvarFotosVeiculo("TRASEIRAESQUERDA")} />
                                                </div>
                                            </form>
                                        </div>

                                    {/*}    <div className={this.state.fotoTraseiraEsquerdaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoTraseiraEsquerdaCheck ? <img src={this.state.fotoTraseiraEsquerdaURL} alt="" /> : <img src="/img/traseira-esq.png" alt="" />}
                                            {this.state.fotoTraseiraEsquerdaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Traseira esquerda</h3>

                                            <form>
                                                <label htmlFor="fotoTraseiraEsquerda"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoTraseiraEsquerda" name="fotoTraseiraEsquerda" onChange={this.obterFotoTraseiraEsquerda} />
                                                </div>
                                            </form>
                                    </div> */}

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">
                                        <div className={this.state.fotoTraseiraDireitaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoTraseiraDireitaCheck ? <img src={this.state.fotoTraseiraDireitaURL} alt="" /> : <img src="/img/traseira-dir.png" alt="" />}
                                            {this.state.fotoTraseiraDireitaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Traseira direita</h3>

                                            <form>
                                                <label htmlFor="fotoTraseiraDireita"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoTraseiraDireita" name="fotoTraseiraDireita" onChange={this.salvarFotosVeiculo("TRASEIRADIREITA")} />
                                                </div>
                                            </form>
                                        </div>

                                      {/*   <div className={this.state.fotoTraseiraDireitaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoTraseiraDireitaCheck ? <img src={this.state.fotoTraseiraDireitaURL} alt="" /> : <img src="/img/traseira-dir.png" alt="" />}
                                            {this.state.fotoTraseiraDireitaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Traseira direita</h3>

                                            <form>
                                                <label htmlFor="fotoTraseiraDireita"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoTraseiraDireita" name="fotoTraseiraDireita" onChange={this.obterFotoTraseiraDireita} />
                                                </div>
                                            </form>
                                        </div>*/}

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">


                                    <div className={this.state.fotoPortaMalaCheck ? "animation active" : "animation"}>
                                            {this.state.fotoPortaMalaCheck ? <img src={this.state.fotoPortaMalaURL} alt="" /> : <img src="/img/porta-mala.png" alt="" />}
                                            {this.state.fotoPortaMalaCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Porta Mala</h3>

                                            <form>
                                                <label htmlFor="fotoPortaMala"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoPortaMala" name="fotoPortaMala" onChange={this.salvarFotosVeiculo("PORTAMALA")} />
                                                </div>
                                            </form>
                                        </div>


                                      {/*}  <div className="animation">
                                            <img src="/img/porta-mala.png" alt=""></img>
                                            <img src="/img/check.png" className="check" alt=""></img>
                                            <h3>Porta-mala</h3>

                                            <form>
                                                <div id="carregarImg"><img src="/img/camera.png" alt="" /></div>
                                                <div className="classDaFoto">
                                                </div>
                                            </form>
                                    </div> */}

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">

                                    <div className={this.state.fotoPainelCheck ? "animation active" : "animation"}>
                                            {this.state.fotoPainelCheck ? <img src={this.state.fotoPainelURL} alt="" /> : <img src="/img/painel.png" alt="" />}
                                            {this.state.fotoPainelCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Painel</h3>

                                            <form>
                                                <label htmlFor="fotoPainel"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoPainel" name="fotoPainel" onChange={this.salvarFotosVeiculo("PAINEL")} />
                                                </div>
                                            </form>
                                        </div>

                                 {/**     <div className="animation">
                                            <img src="/img/painel.png" alt=""></img>
                                            <img src="/img/check.png" className="check" alt=""></img>
                                            <h3>Painel</h3>

                                            <form>
                                                <div id="carregarImg"><img src="/img/camera.png" alt="" /></div>
                                                <div className="classDaFoto">
                                                </div>
                                            </form>
                                        </div> */}  

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">

                                    <div className={this.state.fotoMotorCheck ? "animation active" : "animation"}>
                                            {this.state.fotoMotorCheck ? <img src={this.state.fotoMotorURL} alt="" /> : <img src="/img/motor.png" alt="" />}
                                            {this.state.fotoMotorCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Motor</h3>

                                            <form>
                                                <label htmlFor="fotoMotor"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoMotor" name="fotoMotor" onChange={this.salvarFotosVeiculo("MOTOR")} />
                                                </div>
                                            </form>
                                        </div>


                                      {/**  <div className="animation">
                                            <img src="/img/motor.png" alt=""></img>
                                            <img src="/img/check.png" className="check" alt=""></img>
                                            <h3>Motor</h3>

                                            <form>
                                                <div id="carregarImg"><img src="/img/camera.png" alt="" /></div>
                                                <div className="classDaFoto">
                                                </div>
                                            </form>
                                        </div> */}

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-4">


                                    <div className={this.state.fotoChassiCheck ? "animation active" : "animation"}>
                                            {this.state.fotoChassiCheck ? <img src={this.state.fotoChassiURL} alt="" /> : <img src="/img/chassi.png" alt="" />}
                                            {this.state.fotoChassiCheck ? <Checkimage /> : console.log('sem imagem')}
                                            <h3>Chassi</h3>

                                            <form>
                                                <label htmlFor="fotoChassi"><div id="carregarImg"><img src="/img/camera.png" alt="" /></div></label>
                                                <div className="classDaFoto">
                                                    <input type="file" hidden id="fotoChassi" name="fotoChassi" onChange={this.salvarFotosVeiculo("CHASSI")} />
                                                </div>
                                            </form>
                                        </div>


                                  {/**  <div className="animation">
                                            <img src="/img/chassi.png" alt=""></img>
                                            <img src="/img/check.png" className="check" alt=""></img>
                                            <h3>Chassi</h3>

                                            <form>
                                                <div id="carregarImg"><img src="/img/camera.png" alt="" /></div>
                                                <div className="classDaFoto">
                                                </div>
                                            </form>
                                        </div> */}    

                                    </div>

                                </div>


                                <div className="buttons-tab">
                                    <button type="button" name="button" className="btn btn-second float-left prev">Anterior</button>
                                    <button type="button" name="button" className="btn btn-final float-right" data-toggle="modal" data-target="#finalizar-vistoria">Finalizar vistoria</button>
                                    <div className="clearfix"></div>
                                </div>

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

                {this.state.loading ? <LoadingSpinner /> : console.log("Sem load")}

            </div>
            // <div className="linhasup">

            //     <form>
            //     <h2>{this.state.mensagem}</h2>
            //     <h2>Dados Pessoais</h2>
            //         <div className="form-group">
            //             <label htmlFor="fotoRecibo">Recibo</label>
            //             <input type="file" id="fotoRecibo" name="fotoRecibo" onChange={this.obterFotoRecibo} />
            //             <button type="button" onClick={this.verificarFotoRecibo} className="btn btn-success btn-block" >Verificar recibo</button>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="nome">Nome</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="nome" value={this.state.nome} id="nome" placeholder="Nome"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="cpf">Cpf/Cnpj</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="cpfCnpj" value={this.state.cpfCnpj} id="cpfCnpj" placeholder="CPF/CNPJ"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="email">E-mail</label>
            //             <input type="email" name="email" onChange={this.changeInput} className="form-control" id="email" value={this.state.email} aria-describedby="emailHelp" placeholder="Enter email"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="telefone">Telefone</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="telefone" value={this.state.telefone} id="telefone" placeholder="Telefone"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="dataNascimento">Data Nascimento</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="dataNascimento" value={this.state.dataNascimento} id="dataNascimento" placeholder="Data Nascimento"></input>
            //         </div>

            //         <h2>Endereço</h2>

            //         <div className="form-group">
            //             <label htmlFor="cep">CEP</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="cep" value={this.state.cep} id="cep" placeholder="CEP"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="logradouro">Logradouro</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="logradouro" value={this.state.logradouro} id="logradouro" placeholder="Logradouro"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="numero">Numero</label>
            //                 <input type="text" onChange={this.changeInput} className="form-control" name="numero" value={this.state.numero} id="numero" placeholder="Numero"></input>
            //         </div>


            //         <div className="form-group">
            //             <label htmlFor="complemento">Complemento</label>
            //                 <input type="text" onChange={this.changeInput} className="form-control" name="complemento" value={this.state.complemento} id="complemento" placeholder="Complemento"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="bairro">Bairro</label>
            //                 <input type="text" onChange={this.changeInput} className="form-control" name="bairro" value={this.state.bairro} id="bairro" placeholder="Bairro"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="cidade">Cidade</label>
            //                 <input type="text" onChange={this.changeInput} className="form-control" name="cidade" value={this.state.cidade} id="cidade" placeholder="Cidade"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="ufEndereco">Uf</label>
            //                 <input type="text" onChange={this.changeInput} className="form-control" name="ufEndereco" value={this.state.ufEndereco} id="ufEndereco" placeholder="ufEndereco"></input>
            //         </div>


            //         <h2>Dados do automovel</h2>
            //         <div className="form-group">
            //             <label htmlFor="fotoCNH">CNH</label>
            //             <input type="file" id="fotoCNH" name="fotoCNH" onChange={this.obterFotoCNH}/>
            //             <label htmlFor="fotoCRLV">CRLV</label>
            //             <input type="file" id="fotoCRLV" name="fotoCRLV" onChange={this.obterFotoCRLV} />
            //             <button type="button" className="btn btn-success btn-block" onClick={this.verificarFotoCRLV}>Verificar recibo</button>
            //         </div>

            //         <h2>Informacoes basicas do Automovel</h2>

            //         <div className="form-group">
            //             <label htmlFor="placa">Placa</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="placa" value={this.state.placa} id="placa" placeholder="Placa"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="uf">Uf</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="uf" value={this.state.uf} id="uf" placeholder="Uf"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="chassi">Chassi</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="chassi" value={this.state.chassi} id="chassi" placeholder="Chassi"></input>
            //         </div>


            //         <div className="form-group">
            //             <label htmlFor="chassi">Renavam</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="renavam" value={this.state.renavam} id="renavam" placeholder="Renavam"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="chassi">Marca/Modelo</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="marcaModelo" value={this.state.marcaModelo} id="marcaModelo" placeholder="Marca/Modelo"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="chassi">Ano do Veiculo</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="anoVeiculo" value={this.state.anoVeiculo} id="anoVeiculo" placeholder="Ano"></input>
            //         </div>

            //         <h2>Equipamentos</h2>

            //         <div className="form-group">
            //             <label htmlFor="equipamentos">Equipamentos</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="equipamentos" value={this.state.equipamentos} id="equipamentos" placeholder="Equipamentos"></input>
            //         </div>

            //         <h2>Informações complementares do automovel</h2>

            //         <div className="form-group">
            //             <label htmlFor="km">Km</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="km" value={this.state.km} id="km" placeholder="km"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="cor">Cor</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="cor" value={this.state.cor} id="cor" placeholder="cor"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="combustivel">Combustivel</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="combustivel" value={this.state.combustivel} id="combustivel" placeholder="combustivel"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="tipoVeiculo">Tipo de Veiculo</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="tipoVeiculo" value={this.state.tipoVeiculo} id="tipoVeiculo" placeholder="tipoVeiculo"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="capacidadePassageiro">Capacidade de Passageiro</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="capacidadePassageiro" value={this.state.capacidadePassageiro} id="capacidadePassageiro" placeholder="capacidadePassageiro"></input>
            //         </div>

            //         <div className="form-group">
            //             <label htmlFor="fabricante">Fabricante</label>
            //             <input type="text" onChange={this.changeInput} className="form-control" name="fabricante" value={this.state.fabricante} id="fabricante" placeholder="fabricante"></input>
            //         </div>

            //         <h2>Fotos Adicionadas</h2>
            //         <div className="form-group">
            //             <label htmlFor="fotoDianteiraDireita">Dianteira Direita</label>
            //             <input type="file" id="fotoDianteiraDireita" name="fotoDianteiraDireita" onChange={this.obterFotoDianteiraDireita} />
            //             <label htmlFor="fotoDianteiraEsquerda">Dianteira Esquerda</label>
            //             <input type="file" id="fotoDianteiraEsquerda" name="fotoDianteiraEsquerda" onChange={this.obterFotoDianteiraEsquerda} />
            //             <label htmlFor="fotoTraseiraDireita">Traseira Direita</label>
            //             <input type="file" id="fotoTraseiraDireita" name="fotoTraseiraDireita" onChange={this.obterFotoTraseiraDireita} />
            //             <label htmlFor="fotoTraseiraEsquerda">Traseira Esquerda</label>
            //             <input type="file" id="fotoTraseiraEsquerda" name="fotoTraseiraEsquerda" onChange={this.obterFotoTraseiraEsquerda} />
            //         </div>                 

            //         <a type="button" className="btn btn-success btn-block" onClick={this.salvarVistoria} >Enviar Vistoria</a>

            //     </form>
            // </div>
        );
    }
}
