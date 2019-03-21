import React, {Component} from 'react'
import Navbar from "../../Components/Navbar/Navbar"
import SearchGrid from "../../Components/SearchGrid/SearchGrid"
import Target from "../../Components/Target/Target"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend";
import './SearchPage.css'

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
    return this.props.model.searchMoviesWithQueryString(queryString, pg)
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
      movies: [alreadyLoadedMovies, data.results],
      currentPage: data.page
    })
  }

    render() {
      let {droppedItem, movies, numberOfResults, numberOfPages, currentPage} = this.state
      let watch = {}
      let watched = {}
      if(droppedItem) {
        if(droppedItem.list === 'toWatch') {
          watch = droppedItem
        } else {
          watched = droppedItem
        }
      }
        return (
            <div className="container appContainer">
                <Navbar callback={this.searchCallback}/>
                <div className='row dropRow'>
                  <Target droppedItem={watch} onDrop={this.onDrop} toWatch={true}/>
                  <Target droppedItem={watched} onDrop={this.onDrop} toWatch={false}/>
                </div>
                { movies ?
                  <SearchGrid movies={movies}/> :
                  'loading'
                }
                <div className='nextPrev'>
                { currentPage < numberOfPages &&
                  <button className="btn watchlistBtn my-2 my-sm-0" type="submit" onClick={this.loadNextPage} id="searchBtn">Load more</button>
                }
                </div>
            </div>

        );
    }
}


export default DragDropContext(HTML5Backend)(SearchPage);
