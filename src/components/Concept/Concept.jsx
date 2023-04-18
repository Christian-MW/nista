import React, { useState, useEffect } from 'react';
import { ConceptService } from '../../services/ConceptService';
import Hashtag from '../Hashtag/Hashtag'

var exec = false;
const Concept = (props) => {
  console.log(props.children)
  const [objConcepts, setObjConcepts] = useState([]);
  const objsConc = [];
  var conceptsNew = [];
  const conceptService = new ConceptService();
  const hashtag = new Hashtag();


  useEffect(() => {
    conceptsNew = [];
    conceptService.getConcepts().then(data => {
      if (props.children.id != undefined) {
        //this.hashtag.clearConcepts(data.result);
        if (exec == false) {
          exec = true;
          data.result.forEach((itemCon) => {
            var conceptN = {
              id: 0,
              description: "",
              status: false,
              active: false
            }
            conceptN.id = itemCon.id;
            conceptN.description = itemCon.description;
            conceptN.status = itemCon.status;

            if (props.children.topics.length > 0) {
              props.children.topics.forEach((itemHashTop) => {
                if (itemCon.id == itemHashTop.id) {
                  document.getElementById(itemHashTop.id).checked = true;
                  conceptN.active = true;
                }
              })
              conceptsNew.push(conceptN);
            }

          })
          conceptsNew.sort((a,b) => b.active - a.active);
          //objsConc = data.result;
          setObjConcepts(conceptsNew);
          console.log(data);
        }
      }
    });
    console.log();
  });

  return (
    <>
      <div class="col-6 col-md-6">
        <h3>Conceptos</h3>
        <ul class="list-group">
          {objConcepts.map((x, i) => <li key={i} class="list-group-item">
            <input onChange={(text) => this.changeConcept(text)} id={x.id} class="form-check-input me-1" type="checkbox" value={x.description} aria-label="..." />
            <label for={x.id}>{x.description}</label>
          </li>)}
        </ul>
      </div>
    </>
  )
};
export default Concept;
