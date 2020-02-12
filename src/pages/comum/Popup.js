import React, { Component } from 'react';
import './Popup.css';
import $ from 'jquery';

class Popup extends Component {

    constructor(props) {
        super(props);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    handleClosePopup() {
        typeof this.props.closePopup ===  'function' ?  this.props.closePopup() : $('#id01').css('display', 'none');
    }

    componentWillUpdate() {

    }

    componentDidMount() {  

        if(this.props.size) {
            $('#div-popup-modal').addClass('popup-modal-' + this.props.size);
        } 

        if(this.props.type) {
            $('#div-popup-modal').addClass('popup-type-' + this.props.type);
        }
    }

    render() {
        return (
            <div>
                <div id="id01" className="popup-modal">
                    <div id="div-popup-modal" className="popup-modal-content popup-animate-top popup-card-4">
                        <header className="popup-container popup-display-container"> 
                        <span id="btn-popup-close" className="popup-button popup-xlarge popup-display-topright popup-hover-opacity" onClick={this.handleClosePopup}>x</span>
                        { 
                            this.props.title ?
                                    <h2>{this.props.title}</h2>
                                    : <h2>&nbsp;</h2>
                        }
                        </header> 
                        <div className="popup-container">
                            {
                                   typeof(this.props.content) === 'object'? 
                                        this.props.content.map((value, key) => {
                                            return <p key={key}>{value}</p>
                                        })
                                    : <p>{this.props.content}</p>
                            }
                        </div>
                        {
                            this.props.footerText ? 
                                <footer className="popup-container">
                                    <p>{this.props.footer}</p>
                                </footer>
                            : ''
                        }

                    </div>
                </div>
            </div> 
            
        )
    }

}

export default Popup;