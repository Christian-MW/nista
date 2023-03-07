import axios from "axios";
import React, { Component } from 'react';

export class HashtagService extends React.Component {
    baseURL = "http://3.138.108.174:9091/apolo/api/hashtag/";

    getHashtags() {
        return axios.get(this.baseURL + "get")
            .then(res => res.data.result)
    }


    /*async getHashtags(){
        await axios.get(this.baseURL + 'get')
            .then((response) => {
                console.log('====###__OBTENIENDO LOS HASHTAGS: ')
                console.log(response.data);
                return response.data;
                //this.setState({ objHashtags: response.data.data })
            })
            .catch((error) => {
                console.log("ERROR SERVICE HASHTAGS: ")
                console.log(error);
            });
        }*/



}