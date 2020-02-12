import React from 'react'
import * as cookie from 'react-cookies'
import 'react-sliding-pane/dist/react-sliding-pane.css';

export default props => {

    const openPanel = false;



    const fotoVeiculo = () => {

        const listFotoVeiculo = props.fotoVeiculo || []

        const user_login = cookie.load('user_login')


        return (
            listFotoVeiculo.map(veiculo => (
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="animationtst active">
                        <img src={"http://" + window.location.hostname + ":9093/vistoria/image/" + user_login.jwt + "/" + veiculo.name} />
                        {/**<img src={`data:image/jpeg;base64,${veiculo.imagemByteArray}`} /> */}
                        <h3>{veiculo.tipoFoto}</h3>
                    </div>
                </div>
            ))
        )
    }

    const isOpen = (openPanel) => {
        let open = openPanel
    }


    return (

        <div role="tabpanel" className={"col-sm-12 car margem-vistoria"} id="vistoria">
            <div className="design-process-content bg-blank">
                <h4>Vistoria</h4>
                <div className="row gallery">
                    {fotoVeiculo()}
                </div>
            </div>

        </div>


    )
}