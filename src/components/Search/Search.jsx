import React from 'react';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import './Search.css';
import { CSVLink } from "react-csv";

const headers = [
    { label: "Name", key: "name" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Website", key: "website" }
  ];

class Search extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }
  downloadReport = async () => {
    //const data = await this.getUserList();
    this.setState({ data: [] }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }



    
    render(){
        return(
            <>
			<Menu /> 
            <div class="container">
                <div id="rowMain" class="row">
                <main role="main" className="flex-shrink-0 mt-5">
                    <h2>SEARCH</h2>
                    <div id="divMain" class="px-3 py-2 border-bottom mb-3">
                    <div class="container d-flex flex-wrap justify-content-center">
                        <form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="search">
                            <input type="search" class="form-control" placeholder="Busqueda..." aria-label="Search" />
                        </form>
                        <div class="text-end">
                            <button id="searchBTN" type="button" class="btn btn-light text-dark me-2">Buscar</button>
                        </div>

                        <input type="button" value="Descargar CSV" onClick={this.downloadReport} />
        <CSVLink
          headers={headers}
          filename="Usuarios.csv"
          data={[]}
          ref={this.csvLinkEl}
        />

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