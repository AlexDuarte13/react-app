import React, { Component } from 'react';
import Menu from '../menu/Menu';

export default class Vistoria extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

          <div>
          <Menu />
        <noscript>You need to enable JavaScript to run this app.</noscript>


            <div className="linhasup">
        <section className="container-fluid home">
          <div className="row">
            <div className="col-sm-6 car">
              <a href="/automovel" className="box">
                <div className="bg-car"></div>
                <h2>Automóvel</h2>
                <img src="img/icon-car.png" alt=""></img>
              </a>
              <div className="clearfix"></div>
            </div>
            <div className="col-sm-6 house">
              <a href="/residencial" className="box">
                <div className="bg-house"></div>
                <h2>Residencial</h2>
                <img src="img/icon-house.png" alt=""></img>
              </a>
              <div className="clearfix"></div>
            </div>
          </div>
        </section>
            </div>
            </div>
        );
    }
}
