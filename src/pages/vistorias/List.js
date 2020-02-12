import React from 'react'
import { Link } from 'react-router-dom';

export default props => {

    const rows = () => {

        const list = props.list || []

        return (
            list.map(vistoria => (
                <tr>
                    <td scope="row">{vistoria.id}</td>
                    <td>{vistoria.nome}</td>
                    <td>{vistoria.data}</td>
                    <td>{vistoria.automovel.placa}</td>
                    <td>{vistoria.documentosPessoais.nome}</td>
                    <td>{vistoria.documentosPessoais.cpfCnpj}</td>
                    <td>{vistoria.documentosPessoais.email}</td>
                    <td><Link to={{ pathname: '/checklist', state: { id: vistoria.id } }} class="btn btn-primary bt-vistorias" role="button" aria-pressed="true" >Ver</Link></td>
                </tr>
            ))
        )
    }


    return (
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">VISTORIA</th>
                        <th scope="col">DATA</th>
                        <th scope="col">PLACA</th>
                        <th scope="col">NOME</th>
                        <th scope="col">CPF/CNPJ</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">VISUALIZAR</th>
                    </tr>
                </thead>
                <tbody>
                    {rows()}
                </tbody>
            </table>
        </div>

    )
}