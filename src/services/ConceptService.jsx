import axios from "axios";
import React, { Component } from 'react';

require('dotenv').config();
export class ConceptService extends React.Component {
    
    baseURL = process.env.REACT_APP_BASE_URL;
    email = process.env.REACT_APP_EMAIL;

    async getConcepts() {
        //console.log(this.email);
        //console.log(this.baseURL);
        return await axios.get(this.baseURL + "topic/get")
            .then(res => res.data)
    }



    async addConcept(nameNewCon) {
        //console.log("####__addConcept___####")
        await axios.post(this.baseURL +'topic/add', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            email: this.email,
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            description: nameNewCon,
            status: true
        })
            .then(function (response) {
                //console.log("SERVICE POST /api/topic/add: " + JSON.stringify(response.data));
                //alert("AGREGADO EXITOSAMENTE")
                //this.getConcepts();
                window.location.reload(true);
                return response;
            })
            .catch(function (error) {
                if(error.response.status == 409){


                    document.getElementById("alertCN").style.display = "block";
                    
                }
                console.log("ERROR AL AGREGAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                //alert(JSON.stringify(error))
            });
    }

    async addConceptToHashtag(hashtagId, topicId){
        console.log("####__addConceptToHashtag___####")
        await axios.post(this.baseURL +'hashtag/add/topic', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            email: this.email,
            hashtagId: hashtagId,
            topicId: topicId
        })
            .then(function (response) {
                console.log("SERVICE POST /hashtag/add/topic: " + JSON.stringify(response.data));
                //alert("AGREGADO EXITOSAMENTE")
                //this.getConcepts();
                return response;
            })
            .catch(function (error) {
                console.log("ERROR AL RELACIONAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                //alert(JSON.stringify(error))
            });
    }


    async deleteConceptToHashtag(hashtagId, topicId){
        console.log("####__deleteConceptToHashtag___####")
        await axios.post(this.baseURL +'hashtag/remove/topic', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            email: this.email,
            hashtagId: hashtagId,
            topicId: topicId
        })
            .then(function (response) {
                console.log("SERVICE POST /hashtag/remove/topic: " + JSON.stringify(response.data));
                //alert("AGREGADO EXITOSAMENTE")
                //this.getConcepts();
                return response;
            })
            .catch(function (error) {
                console.log("ERROR AL RELACIONAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                //alert(JSON.stringify(error))
            });
    }

}