import axios from "axios";
import React, { Component } from 'react';

require('dotenv').config();
export class SearchService extends React.Component {
    baseURL = process.env.REACT_APP_BASE_URL;
    email = process.env.REACT_APP_EMAIL;



    async searchUsers(objSearch, type){
        console.log("############___SEARCH_USERS__");

        await axios.post(this.baseURL + 'search/simple', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            email: this.email,
            type: type,
            filters: objSearch
        })
            .then(function (response) {
                console.log("SERVICE POST /hashtag/add: " + JSON.stringify(response.data));
                //window.location.reload(true);
                return response;
            })
            .catch(function (error) {
                console.log("ERROR AL RELACIONAR UN CONCEPTO");
                console.log(JSON.stringify(error));
                //alert(JSON.stringify(error))
            });

    }
}