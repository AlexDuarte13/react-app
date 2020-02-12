import React, { Component } from 'react';
import axios from 'axios';
import * as cookie from 'react-cookies';
import List from './List';
import './Vistorias.css'
import ReactPaginate from 'react-paginate';
import Menu from '../menu/Menu';

const URL = "http://"+window.location.hostname+":9093/vistoria?status=CONCLUIDA&page="

export default class Vistoriador extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], pages: '', pageable: '' };
    this.get()
  }

  get = (page) => {

    let pagina

    if (page == undefined) {
      pagina = 0
    } else {
      pagina = page.selected
    }

    const user_login = cookie.load('user_login');

    axios.get(URL.concat(pagina) + "&size=10", { crossDomain: true, headers: {'token':user_login.jwt}}).then(resp => this.setState({
      ...this.state, list: resp.data.content, pages: resp.data.totalPages,
      pageable: resp.data.pageable
    }))

  }

  render() {
    return (

      <div>
        <Menu />

        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div className="linhasup">
          <section className="container-fluid home">
          {
              this.state.list && this.state.list.length ?
                  (<div className="row"> 
                    <div>
                      <List list={this.state.list} />
                    </div>
                    <div class="float-right">
                      <ReactPaginate
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        pageCount={this.state.pages}
                        pageRangeDisplayed={this.state.pages}
                        onPageChange={this.get}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                  </div>)
                  : (<div className="row">
                        <div className="col-md-12">
                            <h5 className="mensagem-resultado-vazio text-center">Não existem vistorias para avaliação.</h5>
                        </div>
                  </div>)
            }
          </section>
        </div>
      </div>
    );
  }
}
