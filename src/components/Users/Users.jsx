import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import './Users.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ConceptService } from '../../services/ConceptService'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
var itemsALL = [];
var concServ = 0;
var itemsSearch = [];
var date_Start = "";
var date_End = "";
var statusMod = true;
var campo = "";
var currentDate = "";
var endCurrentDate = "";
require('dotenv').config();
class Users extends React.Component {
    baseURLGOOGLE = process.env.REACT_APP_BASE_GOOGLE_URL;
    baseURLSTREAM = process.env.REACT_APP_BASE_URL;
    emailAcc = process.env.REACT_APP_EMAIL;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            nameCampaign: ""
        }
        this.conceptService = new ConceptService();
        this.closeModalSave = this.closeModalSave.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleClose() {
        this.setState({ show: false });
    }
    closeModalSave() {
        window.location.reload(true);
        //this.setState({ show:false });
        //statusMod = false;
    }
    //consumir servicio para traer Hashtags
    componentDidMount() {
        concServ++;

        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

            currentDate = [year, month, day].join('-');
            endCurrentDate = currentDate;

        if (concServ == 2) {
            this.conceptService.getConcepts().then(data => {
                //console.log(data);

                this.setState({ objConcepts: data.result });
                data.result.forEach((itemCon) => {
                    var concepttem = {
                        id: itemCon.id,
                        text: itemCon.description,
                        type: "topic",
                        value: itemCon.id,
                        label: itemCon.description
                    }
                    itemsALL.push(concepttem);
                })
                //console.log(itemsALL)
            });
        }
    }

    sendSearch(e) {
        //console.log(e);
        itemsSearch = e;
        /*if (e.length == 0) {
          document.getElementById("downBTN").style.display = "none";
          document.getElementById("tittleSearch").style.display = "none";
        }*/
    }
    FdateStart(e) {
        endCurrentDate = e;
        var ds = e.split("-");
        date_Start = ds[2] + "/" + ds[1] + "/" + ds[0];
        //console.log();
    }
    FdateEnd(e) {
        var de = e.split("-");
        date_End = de[2] + "/" + de[1] + "/" + de[0];
        //console.log();
    }
    createCampaign = async () => {
        document.getElementById("backdrop").style.display = "block";
        var arrayConcepts = [];
        this.setState({ nameCampaign: document.getElementById('nameCampaign').value });

        if (document.getElementById('nameCampaign').value != "") {
            if (document.getElementById('nameHashtag').value != "") {
                if (document.getElementById('linkCampaign').value != "") {
                    if (date_End != "" && date_Start != "") {
                        if (itemsSearch.length > 0) {
                            var linkArr = document.getElementById('linkCampaign').value.split("/");

                            itemsSearch.forEach((itemCon) => {
                                arrayConcepts.push(itemCon.text);
                            });
                            //this.clearForm();
                            var camp = document.getElementById('nameCampaign').value;
                            var URL = linkArr[5];
                            var rang = "Campañas";
                            var ser = document.getElementById('nameHashtag').value;
                            var upd = "false";
                            console.log(this.baseURLSTREAM + 'hashtag/extension/add')
                            console.log();

                            axios.post(this.baseURLSTREAM + 'hashtag/extension/add', {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                },
                                email: this.emailAcc,
                                hashtag: ser,
                                topics: arrayConcepts
                            })
                                .then(function (response) {
                                    console.log(JSON.stringify(response));
                                    var urlGoogle = process.env.REACT_APP_BASE_GOOGLE_URL;
                                    console.log(urlGoogle + 'campaign/addcampaign')
                                    console.log();
                                    setTimeout(() => {
                                        axios.post(urlGoogle + 'campaign/addcampaign', {
                                            headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                            },
                                            campaign: camp,
                                            spreadsheet_id: URL,
                                            range: rang,
                                            search: ser,
                                            date_start: date_Start,
                                            date_end: date_End,
                                            update: upd,
                                            tags: arrayConcepts
                                        })
                                            .then(function (response) {
                                                console.log(JSON.stringify(response));
                                                document.getElementById("backdrop").style.display = "none";
                                                document.getElementById("backdrop2").style.display = "block";
                                                //document.getElementById("modalAddC").style.display = "block";
                                            })
                                            .catch(function (error) {
                                                //document.getElementById("loader").style.display = "none";
                                                document.getElementById("backdrop").style.display = "none";
                                                console.log("ERROR AL CREAR UNA CAMPAÑA");
                                                console.log(JSON.stringify(error));
                                            });
                                    }, "1000");

                                })
                                .catch(function (error) {
                                    //document.getElementById("loader").style.display = "none";
                                    document.getElementById("backdrop").style.display = "none";
                                    campo = "Error al crear la campaña";
                                    document.getElementById("backdrop2Err").style.display = "block";
                                    console.log("ERROR AL CREAR UNA CAMPAÑA");
                                    console.log(JSON.stringify(error));
                                });
                        }
                        else {
                            document.getElementById("backdrop").style.display = "none";
                        }
                    }
                    else {
                        campo = "Fecha inicio o Fecha fin";
                        document.getElementById("backdrop2Err").style.display = "block";
                        //FALTA LLENAR LAS FECHAS
                    }
                }
                else {
                    campo = "Link del archivo de campaña";
                    document.getElementById("backdrop2Err").style.display = "block";
                    //FALTA EL LINK DE LA CAMPAÑA
                }
            }
            else {
                campo = "Hashtag";
                document.getElementById("backdrop2Err").style.display = "block";
                //ALERT FALTA EL HASHTAG DE LA CAMPAÑA
            }
        }
        else {
            campo = "Nombre de campaña";
            document.getElementById("backdrop2Err").style.display = "block";
            //ALERTA FALTA EL NOMBRE DE LA CAMPAÑA
        }
    }



    clearForm() {
        document.getElementById('nameCampaign').value = "";
        document.getElementById('nameHashtag').value = "";
        document.getElementById('linkCampaign').value = "";
        document.getElementById('dobStart').value = "";
        document.getElementById('dobEnd').value = "";
        document.getElementById('selectSearch').value = "";
        document.getElementById('selectSearch').value = null;
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
                    <div id="rowMainU" class="row">
                        <main role="main" className="flex-shrink-0 mt-5">
                            <h2>CAMPAÑA</h2>
                            <div id="divMain" class="col-12 px-3 py-2 border-bottom mb-3">

                                <div class="container d-flex flex-wrap justify-content-center">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <form class="mb-2 mb-lg-0 me-lg-auto" role="text" id="formCampaign">
                                            <div class="col-12">
                                                <span>Nombre de la campaña:</span>
                                                <input id="nameCampaign" type="text" class="form-control" placeholder="Ingresa el nombre de la campaña..." />
                                            </div>
                                            <br />
                                            <div class="col-12">
                                                <span>#Hashtag o búsqueda:</span>
                                                <input id="nameHashtag" type="text" class="form-control" placeholder="Ingresa el texto..." />
                                            </div>
                                            <br />
                                            <div class="col-12">
                                                <span>Link del archivo:</span>
                                                <input id="linkCampaign" type="text" class="form-control" placeholder="Ingresa el link del archivo..." />
                                            </div>
                                            <br />
                                            <div class="col-12">
                                                <span>Selecciona los conceptos:</span>
                                                <Select id="selectSearch"
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    placeholder={'Ingresa uno o varios conceptos...'}
                                                    isMulti
                                                    options={itemsALL}
                                                    noOptionsMessage={() => 'Elemento no encotrado'}
                                                    onChange={e => this.sendSearch(e)}
                                                />
                                            </div>
                                            <br />
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <Form.Group controlId="dobStart">
                                                            <Form.Label>Fecha de inicio:</Form.Label>
                                                            <Form.Control type="date" name="dobStart"
                                                                min={currentDate}
                                                                onChange={(e) => this.FdateStart(e.target.value)}
                                                                placeholder="Fecha de inicio" />
                                                        </Form.Group>
                                                    </div>
                                                    <div class="col-6">
                                                        <Form.Group controlId="dobEnd">
                                                            <Form.Label>Fecha fin:</Form.Label>
                                                            <Form.Control type="date" name="dobEnd"
                                                            min={endCurrentDate}
                                                                onChange={(e) => this.FdateEnd(e.target.value)}
                                                                placeholder="Fecha fin" />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <br /><br />
                                        <div class="text-end">
                                            <button onClick={this.createCampaign} id="createCampaignBTN" type="button" class="btn btn-primary me-2">Crear</button>
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                                {/*<Modal 
                                    show={this.state.show}
                                    onHide={this.state.handleClose}
                                    backdrop="static"
                                    keyboard={false}
                                    id="modalAddC"
                                >
                                    <Modal.Header >
                                        <Modal.Title>La campaña {this.state.nameCampaign} se ha creado con éxito</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Footer>
                                        <Button onClick={this.closeModalSave} variant="primary">Ok!</Button>
                                    </Modal.Footer>
                                </Modal>*/}
                                <div id="backdrop2" style={{ display: "none" }}>
                                    <div class="d-flex justify-content-center">
                                        <div id="alertAdd" class="alert alert-success">
                                            <strong>¡Correcto!</strong> La campaña <b>{this.state.nameCampaign}</b>, se ha creado correctamente.
                                            <button onClick={this.closeModalSave} type="button" class="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </div>

                                <div id="backdrop2Err" style={{ display: "none" }}>
                                    <div class="d-flex justify-content-center">
                                        <div id="alertError" class="alert alert-danger">
                                            <strong>¡Error!</strong> Falta completar el campo <b>{campo}</b>.
                                            <button onClick={this.closeModalSave} type="button" class="btn-close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Users;