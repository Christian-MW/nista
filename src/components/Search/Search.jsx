import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import './Search.css';

class Search extends React.Component{
    render(){
        return(
            <>
			<Menu /> 
            <div class="container">
                <div class="row">
                <main role="main" className="flex-shrink-0 mt-5">
                    <h2>SEARCH</h2>
                    <div class="px-3 py-2 border-bottom mb-3">
                    <div class="container d-flex flex-wrap justify-content-center">
                        <form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="search">
                        <input type="search" class="form-control" placeholder="Busqueda..." aria-label="Search" />
                        </form>

                        <div class="text-end">
                        <button id="searchBTN" type="button" class="btn btn-light text-dark me-2">Buscar</button>
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

export default Search;