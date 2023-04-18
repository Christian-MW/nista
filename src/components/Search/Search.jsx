import React from 'react';
import axios from "axios";
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import './Search.css';
import { CSVLink } from "react-csv";
import { ConceptService } from '../../services/ConceptService';
import { HashtagService } from '../../services/HashtagService';
import { SearchService } from '../../services/SearchService';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const headers = [
  { label: "Cuenta", key: "cuenta" },
  { label: "Seguidores", key: "seguidores" },
  { label: "Red Social", key: "red_social" },
  { label: "Link", key: "link" },
  { label: "Filtro", key: "filtro" }
];
var itemsALL = [];
var itemsSearch = [];
var ArrayUsers = [];
var concServ = 0;
var hashServ = 0;
var searchName = "";
var lengSearch = 0;

const animatedComponents = makeAnimated();

require('dotenv').config();
class Search extends React.Component {
  baseURL = process.env.REACT_APP_BASE_URL;
  email = process.env.REACT_APP_EMAIL;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      objConcepts: [],
      allItems: [],
      nameSearch: "",
      numSearch: "",
    }
    this.csvLinkEl = React.createRef();
    this.searchService = new SearchService();
    this.conceptService = new ConceptService();
    this.hashtagService = new HashtagService();
  }
  downloadReport = async () => {
    //const data = await this.getUserList();
    this.setState({ data: [] }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }

  componentDidMount() {
    concServ++;
    if (concServ == 2) {
      this.conceptService.getConcepts().then(data => {
        //console.log(data);

        this.setState({ objConcepts: data.result });
        data.result.forEach((itemCon) => {
          var concepttem = {
            id: itemCon.id,
            text: itemCon.description,
            type: "topic",
            value: itemCon.id,
            label: itemCon.description
          }
          itemsALL.push(concepttem);
        })
        //console.log(itemsALL)
      });
      this.hashtagService.getHashtags().then(data => {
        //console.log(data);
        hashServ++;
        data.forEach((itemHash) => {
          var hashtagtem = {
            id: itemHash.id,
            text: itemHash.hashtag,
            type: "hashtag",
            value: itemHash.id,
            label: itemHash.hashtag
          }
          itemsALL.push(hashtagtem);
        })
        this.setState({ allItems: itemsALL });
        console.log(this.allItems);
        console.log(itemsALL);

      });
    }
  }

  sendSearch(e) {
    console.log("###__SEND_DATA");
    //console.log(e);
    itemsSearch = e;
    if (e.length == 0) {
      document.getElementById("downBTN").style.display = "none";
      document.getElementById("tittleSearch").style.display = "none";
    }
  }

  searches = async () => {
    /*this.searchService = new SearchService();
    await this.searchService.searchUsers(itemsSearch, "or").then(data => {
      console.log(data);
    });  */
    if (itemsSearch.length > 0) {
      searchName = "";
      itemsSearch.forEach((item) => {
        searchName += item.label + ", ";
      })
      document.getElementById("backdrop").style.display = "block";
      searchName = searchName.slice(0, -2);
      this.setState({ nameSearch: searchName });
      console.log();
      setTimeout(() => {
        axios.post(this.baseURL + 'search/simple', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
          email: this.email,
          type: "or",
          filters: itemsSearch
        })
          .then(function (response) {
            console.log("SERVICE POST /search/simple: " + JSON.stringify(response.data));
            document.getElementById("backdrop").style.display = "none";
            if (response.data.result.length > 0) {
              ArrayUsers = [];
              var userJSON = [];
              response.data.result.forEach((userDB) => {
                userJSON = {
                  cuenta: userDB.screanName,
                  seguidores: userDB.followers,
                  red_social: "Twitter",//userDB.link,
                  link: userDB.link,
                  filtro:""
                }
                if (userDB.filters.length > 0) {
                  userDB.filters.forEach((filter) => {
                    if (filter.value == "N") 
                      filter.value = "Nuevo"
                    else if(filter.value == "X")
                      filter.value = "Contestó"
                    else
                      filter.value = "Sin responder"
                    console.log(filter.key)
                    userJSON.filtro += "Tema: " + filter.key + ", Estatus: " + filter.value +", ";
                    //userJSON.estatus= filter.value;
                  });
                }
                userJSON.filtro = userJSON.filtro.slice(0, -2);
                ArrayUsers.push(userJSON);
              });
              lengSearch = response.data.result.length;
              document.getElementById('nSer').innerHTML = response.data.result.length;
              document.getElementById("downBTN").style.display = "block";
              document.getElementById("tittleSearch").style.display = "block";
              console.log();
            }
            else {
              document.getElementById('nSer').innerHTML = response.data.result.length;
              document.getElementById("tittleSearch").style.display = "block";
            }
          })
          .catch(function (error) {
            document.getElementById("backdrop").style.display = "none";
            console.log("ERROR AL BUSCAR USUARIOS");
            console.log(JSON.stringify(error));
          });
      }, "500");

    }
    else {
      document.getElementById("alertSer").style.display = "block";
    }
  }
  closeAlSer() {
    document.getElementById("alertSer").style.display = "none";
  }

  render() {
    return (
      <>
        <Menu />
        <div class="container">
          <div id="rowMainS" class="row">
            <main role="main" className="flex-shrink-0 mt-5">
              <h2>BÚSQUEDA</h2>
              <div id="divMain" class="px-3 py-2 overflow-auto border-bottom mb-3">
                <div class="container d-flex flex-wrap justify-content-center">
                  <form class="col-9 mb-2 mb-lg-0 me-lg-auto" role="search">
                    {/*<input id="tags" type="search" class="form-control" placeholder="Busqueda..." aria-label="Search" />*/}
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={'Ingresa uno o varios elementos (hashtags, conceptos)...'}
                      isMulti
                      options={itemsALL}
                      noOptionsMessage={() => 'Elemento no encotrado'}
                      onChange={e => this.sendSearch(e)}
                    />
                  </form>
                  <div class="col-1">
                    <div class="text-end">
                      <button onClick={this.searches} id="searchBTN" type="button" class="btn btn-primary me-2">Buscar</button>
                    </div>
                  </div>
                  <div class="col-2">
                    <button onClick={this.downloadReport} id="downBTN" type="button" class="btn btn-primary me-2">Descargar CSV</button>
                  </div>
                  <CSVLink
                    headers={headers}
                    filename="Usuarios.csv"
                    data={ArrayUsers}
                    ref={this.csvLinkEl}
                  />
                </div>
                <div id="alertSer" style={{ display: "none" }} class="alert alert-danger alert-dismissible">
                  <strong>Error!</strong> La búsqueda debe contener al menos un elemento.
                  <button onClick={this.closeAlSer} type="button" class="btn-close" aria-label="Close"></button>
                </div>

                <div id="backdrop" class="col-12" style={{ display: "none" }}>
                  <div class="d-flex justify-content-center">
                    <div class="loader" id="loader" ></div>
                  </div>
                </div>
                <div id="tittleSearch">
                  <br></br><br></br>
                  <h4>La búsqueda: {searchName} contiene <span id="nSer">{lengSearch}</span> resultados</h4>
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