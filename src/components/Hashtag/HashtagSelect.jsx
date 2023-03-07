import React, { Component } from 'react';
import { ConceptService } from '../../services/ConceptService';
import { HashtagService } from '../../services/HashtagService';

class HashtagSelect extends React.Component {

    constructor() {
        super();
        this.state = {
            objHashtags: [],
            objConcepts: []
        };
        this.hashtagService = new HashtagService();
        this.conceptService =  new ConceptService();
    }

    componentDidMount() {
        this.hashtagService.getHashtags().then(data => {
            console.log(data)
            this.setState({ objHashtags: data });
        });
        this.conceptService.getConcepts().then(data => {
            console.log(data)
            this.setState({ objConcepts: data.result });
        });
    }

    printConcepts(element) {
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