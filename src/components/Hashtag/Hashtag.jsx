import React, { Component } from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import "./Hashtag.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalConcepts from '../Modals/ModalConceps';
import ModalHashtag from '../Modals/ModalHashtag';
import { ConceptService } from '../../services/ConceptService';
import HashtagSelect from './HashtagSelect';

class Hashtag extends React.Component {

    constructor() {
        super();
        this.state = {
            objConcepts: [],
            objConceptsOr: [],
            textBuscar: "",
            text: "",
            idHashtag: ""
        };
        this.conceptService = new ConceptService();
    }


    componentDidMount() {
        this.conceptService.getConcepts().then(data => {
            console.log(data)
            this.setState({ objConcepts: data.result });
            this.setState({ objConceptsOr: data.result });
        });
        console.log();
    }
    printConcepts(idHash, hashArr) {
        //alert(idHash);
        this.setState({ idHashtag: idHash });
        document.getElementById('divIDHash').innerHTML = idHash;
        //this.idHashtag= idHash;
        //this.setState.idHash = idHash;
        this.conceptService.getConcepts().then(data => {
            console.log(data)
            this.clearConcepts(data.result);
            data.result.forEach((itemCon) => {
                console.log(itemCon)
                if (hashArr.topics.length > 0) {
                    hashArr.topics.forEach((itemHashTop) => {
                        if (itemCon.id == itemHashTop.id) {
                            document.getElementById(itemHashTop.id).checked = true;
                        }
                    })
                }
            })
        });
    }

    addConceptToHashtag(hashtagID, conceptID) {
        this.conceptService.addConceptToHashtag(hashtagID, conceptID).then(data => {
            console.log(data)
            //window.location.reload(true);
        });
    }
    deleteConceptToHashtag(hashtagID, conceptID) {
        this.conceptService.deleteConceptToHashtag(hashtagID, conceptID).then(data => {
            console.log(data)
            //window.location.reload(true);
        });
    }

    clearConcepts(data) {
        data.forEach((itemCon) => {
            document.getElementById(itemCon.id).checked = false;
        })
    }

    changeConcept(ev) {
        var checkBox = document.getElementById(ev.target.id);
        var hashID = document.getElementById('divIDHash').innerText;
        if (checkBox.checked == true) {
            //alert("Activar")
            this.addConceptToHashtag(hashID, ev.target.id)
        } else {
            //alert("DESActivar")
            this.deleteConceptToHashtag(hashID, ev.target.id);
        }
    }


    filter(ev) {
        console.log(ev.target.value)

        var text = ev.target.value
        const data = this.state.objConceptsOr;
        const newData = data.filter(function (item) {
            const itemData = item.description.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            objConcepts: newData,
            text: text,
        })
    }

    render() {
        return (
            <>
                <Menu />
                <div class="container">
                    <div id="rowMain" class="row">
                        <main role="main" className="flex-shrink-0 mt-5">
                            <h2>HASHTAG</h2><div style={{ display: "none" }} id="divIDHash"></div>
                            <div id="divMain" class="px-3 py-2 border-bottom mb-3">
                                <HashtagSelect />
                                <div id="cont-btns-hash" class="container d-flex flex-wrap justify-content-center">
                                    <div class="col-8">
                                        {/*<form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="search">
                                            <input id="nameHashtag" type="search" class="form-control" placeholder='Agregar' aria-label="Search" />
                                        </form>*/}
                                    </div>
                                    <div class="col-2">
                                        <ModalHashtag />
                                    </div>
                                    <div class="col-2">
                                    <ModalConcepts />
                                    </div>

                                    {/*<div class="text-end">
                                        <button id="hashtagBTN" type="button" class="btn btn-light text-dark me-2">Crear Hashtag</button>
                                    </div>*/}
                                </div>
                                <div class="row col-12 col-md-12 divCon">
                                    {/*<div>
                                {`Items checked are: ${checkedItems}`}
        </div>*/}
                                    <div class="col-6 col-md-6">
                                        <h3>Conceptos</h3>
                                        {/*<input class="form-control" onChange={(e) => this.filter(e)} />*/}
                                        <ul class="list-group">
                                            {this.state.objConcepts.map((x, i) => <li key={i} class="list-group-item">
                                                <input onChange={(text) => this.changeConcept(text)} id={x.id} class="form-check-input me-1" type="checkbox" value={x.description} aria-label="..." />
                                                <label for={x.id}>{x.description}</label>
                                            </li>)}
                                        </ul>
                                    </div>
                                    <div class="col-6 col-md-6">
                                        
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
export default Hashtag;