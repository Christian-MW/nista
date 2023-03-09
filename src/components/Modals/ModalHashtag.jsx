import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ConceptService } from '../../services/ConceptService';
import { HashtagService } from "../../services/HashtagService";


export default function ModalHashtag() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const [objConcepts, setObjConcepts] = useState([]);
    const [conceptsToAdd, setConceptsToAdd] = useState([]);
    const hashtagService = new HashtagService();
    const conceptService = new ConceptService();

    function handleShow() {
        setShow(true);
        getConcepts();
    }

    function saveHashtag() {
        const nameNewCon = document.getElementById('nameNHashtag').value;
        objConcepts.forEach((itemCon)=>{
            var checkBox = document.getElementById('_'+itemCon.id);
            if (checkBox.checked == true) {
                conceptsToAdd.push(itemCon.id);
            }
        })
        hashtagService.addHashtag(conceptsToAdd, nameNewCon).then(data => {
            //conceptServices.getConcepts();
            //handleClose();
            window.location.reload(true);
        });
        console.log();
    }

    function getConcepts() {
        console.log("CONCEPTOS EN MODAL_HASHTAG")
        conceptService.getConcepts().then(data => {
            console.log(data)
            setObjConcepts(data.result);
            //this.setState({ objConcepts: data.result });
        });
        console.log();
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Crear Hashtag
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Hashtag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Escribe el nombre del Hashtag y selecciona los Conceptos a agregar: <br></br><br></br>
                    <form class="col-12 mb-2 mb-lg-0 me-lg-auto" role="addHashtag">
                        <input id="nameNHashtag" type="addHashtag" class="form-control" placeholder='Escribir Hashtag...' aria-label="Search" />
                    </form>
                    <div class="col-12 col-md-12">
                        <h3>Conceptos</h3>
                        <ul class="list-group">
                            {objConcepts.map((x, i) => <li key={i} class="list-group-item">
                                <input id={'_'+x.id} class="form-check-input me-1" type="checkbox" value={x.description} aria-label="..." />
                                <label for={x.id}>{x.description}</label>
                            </li>)}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={saveHashtag} variant="primary">Crear</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}