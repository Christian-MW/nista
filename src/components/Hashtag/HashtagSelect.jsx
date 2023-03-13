import React, { Component } from 'react';
import axios from "axios";
import { ConceptService } from '../../services/ConceptService';
import { HashtagService } from '../../services/HashtagService';
import Hashtag from './Hashtag';

require('dotenv').config();
class HashtagSelect extends React.Component {

    baseURL = process.env.REACT_APP_BASE_URL;
    constructor() {
        super();
        this.state = {
            objHashtags: [],
            objConcepts: []
        };
        this.hashtagService = new HashtagService();
        this.conceptService = new ConceptService();
        this.hashtag = new Hashtag();
    }

    componentDidMount() {
        this.hashtagService.getHashtags().then(data => {
            console.log(data)
            this.setState({ objHashtags: data });
            if (data.length > 0) {
                this.hashtag.printConcepts(data.at(0).id, data.at(0));
            }
        });
        this.conceptService.getConcepts().then(data => {
            console.log(data)
            this.setState({ objConcepts: data.result });
        });
    }

    printConcepts(IDhash) {
        //window.location.reload(true);
        document.getElementById('divIDHash').innerHTML = IDhash;
        this.hashtag.clearConceptsHashtag();
        setTimeout(() => {
            axios.get(this.baseURL + "hashtag/" + IDhash )
            .then(function (response) {
    
                console.log("CONCEPTS TO HASHTAG: " + JSON.stringify(response.data.result.topics.length));
                if (response.data.result.topics.length > 0) {
                    response.data.result.topics.forEach((item) => {
                        console.log(item)
                        document.getElementById(item.id).checked = true;
                        
                    });
                }
                console.log("");
            })
            .catch(function (error) {
                console.log(error);
            });
          }, "500");




        /*this.hashtagService.getHashtagByID(IDhash).then(data => {
            console.log(data);
        });*/

        /*this.state.objHashtags.forEach((item) => {
            console.log(item)
            if (item.id == IDhash) {
                this.hashtag.printConcepts(IDhash, item);
            }
        })*/

        //alert(JSON.stringify(element))
    }

    render() {
        return (
            <select onChange={e => this.printConcepts(e.target.value)} name="hashtags" id="selectHash" class="form-select form-select-lg mb-1">
                {this.state.objHashtags.map(element => (
                    <option key={element.id} value={element.id}>{element.hashtag}</option>
                )
                )}
            </select>
        )
    }
}
export default HashtagSelect;