import axios from "axios";
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();
export class HashtagService extends React.Component {

    baseURL = process.env.REACT_APP_BASE_URL;
    email = process.env.REACT_APP_EMAIL;

    getHashtags() {
        return axios.get(this.baseURL + "hashtag/get")
            .then(res => res.data.result)
    }

    async getHashtagByID(hashtagID) {
        console.log("############___getHashtagByID__");
        await axios.get(this.baseURL + "hashtag/" + hashtagID)
            .then(function (response) {
                console.log(response.data);
                return response.data.result;
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    async addHashtag(conceptsToAdd, nameNewCon) {
        console.log("####__addHashtag___####")
        var conceptsALL = [];

        conceptsToAdd.forEach((itemCon) => {
            var conceptItem = {
                email: this.email,
                id: "",
                description: "",
                status: true
            }
            conceptItem.id = itemCon;
            conceptsALL.push(conceptItem);
        })
        console.log();

        await axios.post(this.baseURL + 'hashtag/add', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            email: this.email,
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            hashtag: nameNewCon,
            status: true,
            topics: conceptsALL
        })
            .then(function (response) {
                console.log("SERVICE POST /hashtag/add: " + JSON.stringify(response.data));
                //alert("AGREGADO EXITOSAMENTE")
                //this.getConcepts();
                window.location.reload(true);
                return response;
            })
            .catch(function (error) {
                if (error.response.status == 409) {


                    document.getElementById("alertEx").style.display = "block";

                }
                console.log("ERROR AL RELACIONAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                //alert(JSON.stringify(error))
            });
    }



}