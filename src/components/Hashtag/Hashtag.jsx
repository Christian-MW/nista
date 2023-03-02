import React, { Component } from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import "./Hashtag.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalConcepts from '../Modals/ModalConceps';


class Hashtag extends React.Component {
    state = {
        objConcepts: [],
        objConceptsOr: [],
        textBuscar: "",
        text: ""
    }


    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((response) => {
                this.setState({ objConcepts: response.data })
                this.setState({ objConceptsOr: response.data })
            })
            .catch((error) => {
                console.log("ERROR SERVICE HASHTAGS: ")
                console.log(error);
            });

        axios.get("http://3.138.108.174:9091/apolo/api/topic/get",{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin':'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                'Content-Type': 'application/json',
              },
        })
            .then((response) => {
                console.log(JSON.stringify(response.data))
            })
            .catch((error) => {
                console.log("ERROR SERVICE GET_TOPICS: ")
                console.log(error);
            });
    }

    filter(ev) {
        console.log(ev.target.value)

        var text = ev.target.value
        const data = this.state.objConceptsOr;
        const newData = data.filter(function (item) {
            const itemData = item.title.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            objConcepts: newData,
            text: text,
        })
        console.log("");
    }

    render() {
        return (
            <>
                <Menu />
                <div class="container">
                    <div class="row">
                        <main role="main" className="flex-shrink-0 mt-5">
                            <h2>HASHTAG</h2>

                            <div class="container d-flex flex-wrap justify-content-center">
                                <form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="search">
                                    <input id="nameHashtag" type="search" class="form-control" placeholder='Agregar' aria-label="Search" />
                                </form>

                                <div class="text-end">
                                    <button id="hashtagBTN" type="button" class="btn btn-light text-dark me-2">Crear Hashtag</button>
                                </div>
                            </div>
                            <div class="row col-12 col-md-12 divCon">
                                {/*<div>
                                {`Items checked are: ${checkedItems}`}
        </div>*/}
                                <div class="col-6 col-md-6">
                                    <h3>Conceptos</h3>
                                    <input class="form-control" onChange={(text) => this.filter(text)} />
                                    <ul class="list-group">
                                        {this.state.objConcepts.map((x, i) => <li key={i} class="list-group-item">
                                            <input id={x.id} class="form-check-input me-1" name="lang" type="checkbox" value={x.title} aria-label="..." />
                                            <label>{x.title}</label>
                                        </li>)}
                                    </ul>
                                </div>
                                <div class="col-6 col-md-6">
                                    <ModalConcepts />
                                </div>
                            </div>
                            <div className="container">
                                <hr className="featurette-divider" />
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
export default Hashtag;