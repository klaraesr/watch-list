import React, {Component} from 'react'
import Navbar from "../../Components/Navbar/Navbar"
import SearchGrid from "../../Components/SearchGrid/SearchGrid"

// Design change: Make two columns.. the user should be able to drag and drop the searched item that they want to add på their list
class SearchPage extends Component {
  constructor(props) {
      super(props)

      this.state = {
          userId: null,
          movies: [],
          numberOfResults: 0,
          numberOfPages: 0
      }
  }

  searchCallback = (searchString) => {
    this.props.model.searchMoviesWithQueryString(searchString)
      .then(data => {
        this.setState({
          movies: data.results,
          numberOfResults: data.total_results,
          numberOfPages: data.total_pages
        })
      })
      .then(() => {
        console.log(JSON.stringify(this.state.movies))
      })
      .catch(e => console.log(e))
  }

  componentDidMount() {
    console.log(this.props.params)
    this.searchCallback(this.props.params.value)

  }
    render() {
      let {movies, numberOfResults, numberOfPages} = this.state
        return (
            <div className="container appContainer">
                <Navbar callback={this.searchCallback}/>
                <SearchGrid movies={movies}/>
            </div>
        );
    }
}

export default SearchPage;
