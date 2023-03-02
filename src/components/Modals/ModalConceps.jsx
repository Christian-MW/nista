import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function ModalConcepts() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function saveConcept() {
        const nameNewCon = document.getElementById('nameNConcept').value;
        
        
        axios.post('http://3.138.108.174:9091/apolo/api/topic/add', {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
            email: "christian.garcia@mwgroup.com.mx",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            description: nameNewCon,
            status: true
        })
            .then(function (response) {
                console.log("SERVICE POST /api/topic/add: " + JSON.stringify(response.data));
                alert("AGREGADO EXITOSAMENTE")
            })
            .catch(function (error) {
                console.log("ERROR AL AGREGAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                alert(JSON.stringify(error))
            });
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
