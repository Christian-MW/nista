import React from 'react';
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
  { label: "Name", key: "name" },
  { label: "Username", key: "username" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Website", key: "website" }
];
var itemsALL = [];
var itemsSearch = [];
var concServ = 0;
var hashServ = 0;
const animatedComponents = makeAnimated();
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      objConcepts: [],
      allItems: []
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
            value:itemCon.id,
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
            value:itemHash.id,
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

  sendSearch(e){
    console.log("###__SEND_DATA");
    //console.log(e);
    itemsSearch = e;
  }

  searches = async () => {
    console.log(itemsSearch, "or");
    this.searchService = new SearchService();
    this.searchService.searchUsers(itemsSearch, "or").then(data => {
      console.log(data);
    });    
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
      isMulti
      options={itemsALL}
      onChange={e => this.sendSearch(e)}
    />
                  </form>
                  <div class="text-end">
                    <button onClick={this.searches} id="searchBTN" type="button" class="btn btn-light text-dark me-2">Buscar</button>
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