import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import './Users.css';
import axios from 'axios';

class Users extends React.Component {
    state = {
        objHashtags: []
    }
    //consumir servicio para traer Hashtags
    componentDidMount() {
        axios.get("https://reqres.in/api/user?page=1")
            .then((response) => {
                //console.log(response)
                this.setState({ objHashtags: response.data.data })
            })
            .catch((error) => {
                console.log("ERROR SERVICE HASHTAGS: ")
                console.log(error);
            });

        //SERVICE POST DEMO
        axios.post('https://reqres.in/api/users', {
            name: 'Nitin',
            job: 'Test engineer'
        })
            .then(function (response) {
                console.log("SERVICE POST: " + JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <Menu />
                <div class="container">
                    <div class="row">
                        <main role="main" className="flex-shrink-0 mt-5">
                            <h2>USERS</h2>
                            <div class="px-3 py-2 border-bottom mb-3">
                                <div class="container d-flex flex-wrap justify-content-center">
                                    <select name="hashtags" id="selectHash" class="form-select form-select-lg mb-1">
                                        {this.state.objHashtags.map(element => (
                                            <option key={element.id} value={element.id}>{element.name}</option>
                                        )
                                        )}
                                    </select>
                                    <form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="text">
                                        <input type="text" class="form-control" placeholder="URL del archivo" aria-label="Search" />
                                    </form>

                                    <div class="text-end">
                                        <button id="fileBTN" type="button" class="btn btn-light text-dark me-2">Cargar</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Users;