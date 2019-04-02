import React, {Component} from 'react'
import model from './../Model.js'
import Navbar from "../Components/Navbar/Navbar"
import SearchGrid from "../Components/SearchGrid/SearchGrid"
import SearchFooter from "../Components/SearchFooter/SearchFooter"
import DragDrop from "../Components/DragDrop/DragDrop"
import Loader from "react-loader-spinner"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend";

class SearchPage extends Component {
  constructor(props) {
      super(props)

      this.state = {
          loading: true,
          currentPage: 1,
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
      loading: false,
      currentPage: data.page,
      numberOfPages: data.total_pages,
      currentQuery: queryString
    })
  }

  searchCallback = (queryString) => {
    this.setState({
      loading: true
    })
    this.loadMovies(queryString)
  }

  onDrop = (item) => {
    this.setState({
      droppedItem: item
    })
    const { movieId, movieTitle, moviePoster } = item
    if(item.toWatch) {
      model.addMovieToWatchList(movieId, movieTitle, moviePoster)
        .then(data => {
          // added message?
        })
    } else {
      model.addMovieToWatchedList(movieId, movieTitle, moviePoster)
        .then(data => {
          // added message?
        })
    }
  }

  loadNextPage = async() => {
    let alreadyLoadedMovies = this.state.movies
    let query = this.state.currentQuery
    let page = this.state.currentPage + 1

    let data = await this.searchAPIcall(query, page)

    this.setState({
      movies: alreadyLoadedMovies.concat(data.results),
      currentPage: data.page
    })
  }

    render() {
      const {droppedItem, movies, numberOfPages, currentPage, loading} = this.state

        return (
            <div className="container appContainer">
                <Navbar callback={this.searchCallback}/>
                <DragDrop droppedItem={droppedItem} onDrop={this.onDrop}/>
                { loading ?
                  <Loader type="Oval" color="#FF9A00" height="100" width="100"/> :
                  <div>
                    <SearchGrid movies={movies}/>
                    <SearchFooter currentPage={currentPage} numberOfPages={numberOfPages} loadNextPage={this.loadNextPage}/>
                  </div>
                }
            </div>

        );
    }
}


export default DragDropContext(HTML5Backend)(SearchPage);
