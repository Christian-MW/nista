import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ConceptService } from '../../services/ConceptService';

export default function ModalConcepts() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const conceptServices = new ConceptService();

    function saveConcept() {
        const nameNewCon = document.getElementById('nameNConcept').value;
        conceptServices.addConcept(nameNewCon).then(data => {
            conceptServices.getConcepts();
            //handleClose();
            //window.location.reload(true);
        });
        console.log();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Agregar Concepto
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Concepto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Escribe el nombre del concepto a crear: <br></br><br></br>
                    <form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="addConcept">
                        <input id="nameNConcept" type="addConcept" class="form-control" placeholder='Escribir concepto...' aria-label="Search" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={saveConcept} variant="primary">Crear</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
