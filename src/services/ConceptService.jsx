import axios from "axios";
import React, { Component } from 'react';

export class ConceptService extends React.Component {
    baseURL = "http://3.138.108.174:9091/apolo/api/topic/";


    getConcepts() {
        return axios.get(this.baseURL + "get")
            .then(res => res.data)
    }



    async addConcept(nameNewCon) {
        await axios.post('http://3.138.108.174:9091/apolo/api/topic/add', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            email: "christian.garcia@mwgroup.com.mx",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            description: nameNewCon,
            status: true
        })
            .then(function (response) {
                console.log("SERVICE POST /api/topic/add: " + JSON.stringify(response.data));
                //alert("AGREGADO EXITOSAMENTE")
                //this.getConcepts();
                return response;
            })
            .catch(function (error) {
                console.log("ERROR AL AGREGAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                //alert(JSON.stringify(error))
            });
    }

}