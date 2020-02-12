import React, { Component } from 'react';
import $ from 'jquery';

export default props => {

    const vistoria = props.vistoria || '';
    const laudo = vistoria.laudo || '';
    const checklist = laudo.checklist || [];


    {/** Colocar aqui a logica do controle dos campos */ }
    {/** Feito com Jquery, porem o correto é usar o redux */ }
    const controleAceite = (checklist) => {

        if (checklist.comparacaoCamposEnum == "CORRETO") {
            $("#input-vistoriador" + checklist.id).val(checklist.valorIA);
            $("#input-vistoriador" + checklist.id).attr('disabled', true);
            $("#textarea" + checklist.id).attr('disabled', false);
            controleValorVistoriador(checklist);
        }

        checklist.recomendado = true;
    }


    const controleNaoAceite = (checklist) => {

        $("#input-vistoriador" + checklist.id).attr('disabled', false);
        $("#textarea" + checklist.id).attr('disabled', false);

        checklist.recomendado = false;
    }

    const controleValorVistoriador = (checklist) => {
        checklist.valorVistoriador = $("#input-vistoriador" + checklist.id).val();
    }


    const controleObservacao = (checklist) => {
        checklist.observacao = $("#textarea" + checklist.id).val();
    }


    const aprovarLaudo = (checklist) => {
        vistoria.recomendacao = true;
    }

    const recusarLaudo = (checklist) => {
        vistoria.recomendacao = false;
    }


    const documento = () => {

        return (
            checklist.map(checklist => (
                <div>
                    {(() => {
                        if (checklist.tipoCampoEnum == "DOCUMENTO") {
                            return (
                                <div>
                                    <div class="row" className={'margem-laudo'} >
                                        <div class="col-12 col-sm-6 col-md-6 col-lg-12">
                                            <div class="form-group">

                                                <div class="input-group">
                                                    <label for="text" class="col-md-12 col-form-label text-secondary row-sub">{checklist.atributo}:</label>
                                                </div>

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">IA:</label>
                                                    <input type="text" class={"form-control " + (checklist.comparacaoCamposEnum == "CORRETO" ? 'border-success' :
                                                        checklist.comparacaoCamposEnum == "INCORRETO" ? 'border-danger' : checklist.comparacaoCamposEnum == "DIVERGENCIA" ? 'border-warning' : '')} value={checklist.valorIA} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Segurado:</label>
                                                    <input type="text" class={"form-control " + (checklist.comparacaoCamposEnum == "CORRETO" ? 'border-success' :
                                                        checklist.comparacaoCamposEnum == "INCORRETO" ? 'border-danger' : checklist.comparacaoCamposEnum == "DIVERGENCIA" ? 'border-warning' : '')} value={checklist.valorSegurado} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Vistoriador:</label>
                                                    <input type="text" disabled id={"input-vistoriador" + checklist.id} class={"form-control "} value={checklist.valorVistoriador}
                                                        onKeyPress={() => controleValorVistoriador(checklist)} />
                                                </div>



                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Obs:</label>
                                                    <textarea type="text" disabled id={"textarea" + checklist.id} class="form-control" onKeyPress={() => controleObservacao(checklist)} />
                                                </div>

                                                <br />

                                            </div>

                                            <div class="px-md-4 bt-espaco-abaixo">
                                                <ul class="alinhamento">
                                                    <li class="alinhamento-li px-md-2">

                                                        <button type="button" class="bt-checklist bt-success btn-outline-success" onClick={() => controleAceite(checklist)}>Aceite</button>
                                                    </li>
                                                    <li class="alinhamento-li">
                                                        <button type="button" class="bt-checklist bt-danger btn-outline-danger" onClick={() => controleNaoAceite(checklist)}>Recusa</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </div>
            ))

        )
    }

    const veiculo = () => {

        return (

            checklist.map(checklist => (

                <div>

                    {(() => {
                        if (checklist.tipoCampoEnum == "VEICULO") {
                            return (
                                <div>
                                    <div class="row" className={'margem-laudo'} >
                                        <div class="col-12 col-sm-6 col-md-6 col-lg-12">
                                            <div class="form-group">

                                                <div class="input-group">
                                                    <label for="text" class="col-md-12 col-form-label text-secondary row-sub">{checklist.atributo}:</label>
                                                </div>

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary ">IA:</label>
                                                    <input type="text" class={"form-control " + (checklist.comparacaoCamposEnum == "CORRETO" ? 'border-success' :
                                                        checklist.comparacaoCamposEnum == "INCORRETO" ? 'border-danger' : checklist.comparacaoCamposEnum == "DIVERGENCIA" ? 'border-warning' : '')} value={checklist.valorIA} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Segurado:</label>
                                                    <input type="text" class={"form-control " + (checklist.comparacaoCamposEnum == "CORRETO" ? 'border-success' :
                                                        checklist.comparacaoCamposEnum == "INCORRETO" ? 'border-danger' : checklist.comparacaoCamposEnum == "DIVERGENCIA" ? 'border-warning' : '')} value={checklist.valorSegurado} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Vistoriador:</label>
                                                    <input type="text" disabled id={"input-vistoriador" + checklist.id} class={"form-control "} value={checklist.valorVistoriador}
                                                        onKeyPress={() => controleValorVistoriador(checklist)} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Obs:</label>
                                                    <textarea type="text" disabled id={"textarea" + checklist.id} class="form-control" />
                                                </div>

                                                <br />

                                            </div>

                                            <div class="px-md-4 bt-espaco-abaixo">
                                                <ul class="alinhamento">
                                                    <li class="alinhamento-li px-md-2">

                                                        <button type="button" class="bt-checklist bt-success btn-outline-success" onClick={() => controleAceite(checklist)}>Aceite</button>
                                                    </li>
                                                    <li class="alinhamento-li">
                                                        <button type="button" class="bt-checklist bt-danger btn-outline-danger" onClick={() => controleNaoAceite(checklist)}>Recusa</button>
                                                    </li>
                                                </ul>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </div>
            ))

        )
    }


    const uso = () => {

        return (

            checklist.map(checklist => (

                <div>

                    {(() => {
                        if (checklist.tipoCampoEnum == "USO") {
                            return (
                                <div>
                                    <div class="row" className={'margem-laudo'} >
                                        <div class="col-12 col-sm-6 col-md-6 col-lg-12">
                                            <div class="form-group">

                                                <div class="input-group">
                                                    <label for="text" class="col-md-12 col-form-label text-secondary row-sub">{checklist.atributo}:</label>
                                                </div>

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">IA:</label>
                                                    <input type="text" class={"form-control " + (checklist.comparacaoCamposEnum == "CORRETO" ? 'border-success' : 'border-danger')} value={checklist.valorIA} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Segurado:</label>
                                                    <input type="text" class={"form-control " + (checklist.comparacaoCamposEnum == "CORRETO" ? 'border-success' : 'border-danger')} value={checklist.valorSegurado} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Vistoriador:</label>
                                                    <input type="text" disabled id={"input-vistoriador" + checklist.id} class="form-control" value={checklist.valorVistoriador}
                                                        onKeyPress={() => controleValorVistoriador(checklist)} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Obs:</label>
                                                    <textarea type="text" disabled id={"textarea" + checklist.id} class="form-control" />
                                                </div>

                                                <br />

                                            </div>

                                            <div class="px-md-4 bt-espaco-abaixo">
                                                <ul class="alinhamento">
                                                    <li class="alinhamento-li px-md-2">

                                                        <button type="button" class="bt-checklist bt-success btn-outline-success" onClick={() => controleAceite(checklist)}>Aceite</button>
                                                    </li>
                                                    <li class="alinhamento-li">
                                                        <button type="button" class="bt-checklist bt-danger btn-outline-danger" onClick={() => controleNaoAceite(checklist)}>Recusa</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </div>
            ))

        )
    }


    const outros = () => {

        return (

            checklist.map(checklist => (

                <div>

                    {(() => {
                        if (checklist.tipoCampoEnum == "OUTROS") {
                            return (
                                <div>
                                    <div class="row" className={'margem-laudo'} >
                                        <div class="col-12 col-sm-6 col-md-6 col-lg-12">
                                            <div class="form-group">

                                                <div class="input-group">
                                                    <label for="text" class="col-md-12 col-form-label text-secondary row-sub">{checklist.atributo}:</label>
                                                </div>

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">IA:</label>
                                                    <input type="text" class={"form-control border-warning"} value={checklist.valorIA} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Segurado:</label>
                                                    <input type="text" class={"form-control border-warning"} value={checklist.valorSegurado} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Vistoriador:</label>
                                                    <input type="text" disabled id={"input-vistoriador" + checklist.id} class="form-control" value={checklist.valorVistoriador}
                                                        onKeyPress={() => controleValorVistoriador(checklist)} />
                                                </div>

                                                <br />

                                                <div class="input-group">
                                                    <label for="text" class="px-md-2 col-form-label text-secondary">Obs:</label>
                                                    <textarea type="text" disabled id={"textarea" + checklist.id} class="form-control" />
                                                </div>

                                                <br />

                                            </div>

                                            <div class="px-md-4 bt-espaco-abaixo">
                                                <ul class="alinhamento">
                                                    <li class="alinhamento-li px-md-2">

                                                        <button type="button" class="bt-checklist bt-success btn-outline-success" onClick={() => controleAceite(checklist)}>Aceite</button>
                                                    </li>
                                                    <li class="alinhamento-li">
                                                        <button type="button" class="bt-checklist bt-danger btn-outline-danger" onClick={() => controleNaoAceite(checklist)}>Recusa</button>
                                                    </li>
                                                </ul>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </div>
            ))

        )
    }

    const finalizarLaudo = () => {

        return (

            <div>
                <div class="px-md-4 bt-espaco-abaixo">
                    <ul class="alinhamento">
                        <li class="alinhamento-li px-md-2">

                            <button type="button" class="bt-checklist bt-success btn-outline-success" data-toggle="modal" data-target="#aprovar-laudo">Aprovar Vistoria</button>
                        </li>
                        <li class="alinhamento-li">
                            <button type="button" class="bt-checklist bt-danger btn-outline-danger" data-toggle="modal" data-target="#recusar-laudo">Recusar Vistoria</button>
                        </li>
                    </ul>
                </div>

                <div class="modal fade" id="aprovar-laudo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <p>Tem certeza que deseja <b>FINALIZAR</b> o Laudo?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-cancelar" data-dismiss="modal">Não</button>
                                <button type="button" class="btn btn-final" onClick={() => aprovarLaudo(vistoria)} data-dismiss="modal">Sim</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="recusar-laudo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <p>Tem certeza que deseja <b>RECUSAR</b> o Laudo?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-cancelar" data-dismiss="modal">Não</button>
                                <button type="button" class="btn btn-final" onClick={() => recusarLaudo(vistoria)}  data-dismiss="modal" >Sim</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


    return (
        <div role="tabpanel" className={"col-sm-12 house margem-vistoria"} id="dados-veiculos">
            <div class="design-process-content bg-blank">
                <h4>Laudo</h4>
                <form>

                    <div>
                        <div>
                            <div class="row-sub">
                                <h6>Documento</h6>
                            </div>
                            {documento()}

                        </div>

                        <div>
                            <div class="row-sub">
                                <h6>Veículo</h6>
                            </div>
                            {veiculo()}
                        </div>

                        <div>

                            <div class="row-sub">
                                <h6>Uso</h6>
                            </div>
                            {uso()}
                        </div>

                        <div>
                            <div class="row-sub">
                                <h6>Outros</h6>
                            </div>
                            {outros()}
                        </div>

                        <div>
                            <br />
                            <div><h4>Finalizar Laudo</h4></div>
                            <div class="row-sub ">
                                <h6>APROVAÇÂO</h6>
                            </div>
                            {finalizarLaudo()}
                        </div>
                    </div>

                </form>

            </div>
        </div>

    )
}