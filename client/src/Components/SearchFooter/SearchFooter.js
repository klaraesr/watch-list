import React, {Component} from 'react';
import './SearchFooter.css'

class SearchFooter extends Component {
  render() {
    const { currentPage, numberOfPages, loadNextPage } = this.props
    return (
      <div className='footer-container'>
      { currentPage < numberOfPages &&
        <button className="btn watchlistBtn" type="submit" onClick={loadNextPage} id="searchBtn">Load more</button>
      }
      </div>
    )
  }
}
export default SearchFooter
