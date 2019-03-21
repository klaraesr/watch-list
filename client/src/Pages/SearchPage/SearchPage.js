import React, {Component} from 'react'
import Navbar from "../../Components/Navbar/Navbar"
import GridItem from "../../Components/SearchGrid/GridItem"
import Target from "../../Components/SearchGrid/Target"
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

  loadMovies = (queryString, pg) => {
    if(queryString !== this.state.currentQuery) {
      this.setState({
        movies: [],
        currentPage: 0
      })
    }
    this.props.model.searchMoviesWithQueryString(queryString, pg)
      .then(data => {
        this.setState(prevState => ({
          movies: data.results,
          numberOfResults: data.total_results,
          currentPage: data.page,
          numberOfPages: data.total_pages,
          currentQuery: queryString
        }))
      })
      .then(() => {
      })
      .catch(e => console.log(e))
  }

  searchCallback = (queryString) => {
    this.loadMovies(queryString)
  }

  addToListCallback = (id, list) => {
    console.log('id: ', id)
    console.log('list: ', list)
  }

  // onScroll = () => {
  //   let { currentPage, numberOfPages, currentQuery } = this.state
  //   if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
  //     console.log('at the botoooom')
  //       if (currentPage < numberOfPages) {
  //         console.log('ye')
  //         this.loadMovies(currentQuery, currentPage+1)
  //       }
  //   }
  // }

  onDrop = (item) => {
    this.setState({
      droppedItem: item
    })
    if(item.list === 'toWatch') {
      console.log('to watch')
    }
  }

  /**
  Currently loads new movies each time, even if they have been loaded before...
  Optimally saves movies loaded previously
  **/
  getNext = () => {
    let {currentQuery, currentPage} = this.state
    this.loadMovies(currentQuery, currentPage + 1)
  }

  getPrevious = () => {
    let {currentQuery, currentPage} = this.state
    this.loadMovies(currentQuery, currentPage - 1)
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
                  <Target droppedItem={watch} onDrop={this.onDrop} listType='toWatch'/>
                  <Target droppedItem={watched} onDrop={this.onDrop} listType='watched'/>
                </div>
                { movies ?
                  <div className='grid'>
                      {movies.map(movie =>
                        <GridItem className='grid-movie-item' key={movie.id} id={movie.id} title={movie.title} image={movie.poster_path} release={movie.release_date} summary={movie.overview}/>
                      )}
                  </div> :
                  'loading'
                }
                <div className='nextPrev'>
                { currentPage > 1 &&
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.getPrevious} id="searchBtn">Previous</button>
                }
                { currentPage < numberOfPages &&
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.getNext} id="searchBtn">Next</button>
                }
                </div>
            </div>

        );
    }
}


export default DragDropContext(HTML5Backend)(SearchPage);
