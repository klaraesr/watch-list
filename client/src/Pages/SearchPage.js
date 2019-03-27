import React, {Component} from 'react'
import model from './../Model.js'
import Navbar from "../Components/Navbar/Navbar"
import SearchGrid from "../Components/SearchGrid/SearchGrid"
import SearchFooter from "../Components/SearchFooter/SearchFooter"
import DragDrop from "../Components/DragDrop/DragDrop";
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend";

class SearchPage extends Component {
  constructor(props) {
      super(props)

      this.state = {
          userId: null,
          movies: [],
          currentPage: 1,
          numberOfResults: 0,
          numberOfPages: 0,
          currentQuery: ''
      }
  }

  componentDidMount() {
    this.loadMovies(this.props.params.value)
  }

  searchAPIcall = (queryString, pg) => {
    return model.searchMoviesWithQueryString(queryString, pg)
      .then(data => {
        return data
      })
      .catch(e => console.log(e))
  }

  loadMovies = async (queryString, pg) => {
    let data = await this.searchAPIcall(queryString, pg)
    this.setState({
      movies: data.results,
      numberOfResults: data.total_results,
      currentPage: data.page,
      numberOfPages: data.total_pages,
      currentQuery: queryString
    })
  }

  searchCallback = (queryString) => {
    this.loadMovies(queryString)
  }

  addToListCallback = (id, list) => {
    console.log('id: ', id)
    console.log('list: ', list)
  }

  onDrop = (item) => {
    console.log('Dropped movie:', item)
    this.setState({
      droppedItem: item
    })
    if(item.toWatch) {
      console.log('to watch')
      
    } else {
      console.log('watched')
    }
  }

  /**
  Currently loads new movies each time, even if they have been loaded before...
  Optimally saves movies loaded previously
  **/
  loadNextPage = async() => {
    let alreadyLoadedMovies = this.state.movies
    let query = this.state.currentQuery
    let page = this.state.currentPage + 1

    let data = await this.searchAPIcall(query, page)

    this.setState({
      movies: alreadyLoadedMovies.concat(data.results),
      currentPage: data.page
    })
    console.log("movies: ", this.state.movies)
  }

    render() {
      let {droppedItem, movies, numberOfResults, numberOfPages, currentPage} = this.state

        return (
            <div className="container appContainer">
                <Navbar callback={this.searchCallback}/>
                <DragDrop droppedItem={droppedItem} onDrop={this.onDrop}/>
                { movies ?
                  <SearchGrid movies={movies}/> :
                  'loading'
                }
                <SearchFooter currentPage={currentPage} numberOfPages={numberOfPages} loadNextPage={this.loadNextPage}/>
            </div>

        );
    }
}


export default DragDropContext(HTML5Backend)(SearchPage);
