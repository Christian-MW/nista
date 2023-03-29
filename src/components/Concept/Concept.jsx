import React, { useState, useEffect } from 'react';
import { ConceptService } from '../../services/ConceptService';

const Concept = (props) => {
  console.log(props.children)
  const [objConcepts, setObjConcepts] = useState([]);
  const objsConc = [];
  const conceptService = new ConceptService();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    conceptService.getConcepts().then(data => {

      data.result.forEach((itemCon) => {
        console.log(itemCon)
        if (props.children.length > 0) {
          if (props.children.topics.length > 0) {
            props.children.topics.forEach((itemHashTop) => {
              if (itemCon.id == itemHashTop.id) {
                document.getElementById(itemHashTop.id).checked = true;
              }
            })
          }
        }

      })




      //objsConc = data.result;
      setObjConcepts(data.result)
      console.log(data)
    });
    console.log();
  });

  return (
    <>
      <h3>Conceptos</h3>
      <ul class="list-group">
        {objConcepts.map((x, i) => <li key={i} class="list-group-item">
          <input onChange={(text) => this.changeConcept(text)} id={x.id} class="form-check-input me-1" type="checkbox" value={x.description} aria-label="..." />
          <label for={x.id}>{x.description}</label>
        </li>)}
      </ul>
    </>
  )
};
export default Concept;
