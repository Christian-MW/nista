import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import './Accounts.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
var campo = "";
require('dotenv').config();
class Accounts extends React.Component {

    baseURLGOOGLE = process.env.REACT_APP_BASE_GOOGLE_URL;
    email = process.env.REACT_APP_EMAIL;

    closeModalSave() {
        window.location.reload(true);
    }

    processAccounts = async () => {
        document.getElementById("backdrop").style.display = "block";

        console.log(document.getElementById('linkAccounts').value);
        if (document.getElementById('linkAccounts').value != "") {
            var linkArr = document.getElementById('linkAccounts').value.split("/");
            console.log(linkArr[5]);

            axios.post(this.baseURLGOOGLE + 'processAccounts/Average', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                spreadsheetId: linkArr[5]
            })
                .then(function (response) {
                    document.getElementById("backdrop").style.display = "none";
                    document.getElementById("backdrop2").style.display = "block";

                })
                .catch(function (error) {
                    document.getElementById("backdrop").style.display = "none";
                    campo = "Error al crear la campaña";
                    document.getElementById("backdrop2Err").style.display = "block";
                    console.log(JSON.stringify(error));
                });


        }
        else {
            //FALTA EL LINK DE LA CAMPAÑA
            campo = "Link del archivo de usuarios";
            document.getElementById("backdrop2Err").style.display = "block";
        }

    }


    render() {
        return (
            <>
                <Menu />
                <div class="container">
                    <div id="backdrop" style={{ display: "none" }}>
                        <div class="d-flex justify-content-center">
                            <div class="loader" role="status">
                            </div>
                        </div>
                    </div>
                    <div id="rowMainA" class="row">
                        <main role="main" className="flex-shrink-0 mt-5">
                            <h2>CUENTAS</h2>
                            <div id="divMain" class="col-12 px-3 py-2 border-bottom mb-3">
                                <div class="container d-flex flex-wrap justify-content-center">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <div class="col-12">
                                            <span>Link del archivo:</span>
                                            <input id="linkAccounts" type="text" class="form-control" placeholder="Ingresa el link del archivo..." />
                                        </div>
                                        <br></br>
                                        <div class="text-end">
                                            <button onClick={this.processAccounts} id="createCampaignBTN" type="button" class="btn btn-primary me-2">Procesar</button>
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                                <div id="backdrop2" style={{ display: "none" }}>
                                    <div class="d-flex justify-content-center">
                                        <div id="alertAdd" class="alert alert-success">
                                            <strong>¡Correcto!</strong> El archivo se está procesando correctamente.
                                            <button onClick={this.closeModalSave} type="button" class="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </div>
                                <div id="backdrop2Err" style={{ display: "none" }}>
                                    <div class="d-flex justify-content-center">
                                        <div id="alertError" class="alert alert-danger">
                                            <strong>¡Error!</strong> Falta completar el campo <b>link del archivo</b>.
                                            <button onClick={this.closeModalSave} type="button" class="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div >
                <Footer />
            </>
        )
    }
}

export default Accounts;