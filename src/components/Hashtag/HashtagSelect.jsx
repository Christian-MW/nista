import React, { Component } from 'react';
import { ConceptService } from '../../services/ConceptService';
import { HashtagService } from '../../services/HashtagService';
import Hashtag from './Hashtag';

class HashtagSelect extends React.Component {

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
        this.state.objHashtags.forEach((item) => {
            console.log(item)
            if (item.id == IDhash) {
                this.hashtag.printConcepts(IDhash, item);
            }
        })

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