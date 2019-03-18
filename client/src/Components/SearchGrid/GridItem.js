import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './GridItem.css'
const IMG_BASE_URL = 'http://image.tmdb.org/t/p/original/'


class SearchItem extends Component {

    render() {
        const {title, image, description, id} = this.props

            return (
                    <div className='col-sm-3'>
                      <Link to={'/moviedetails/' + id}>
                        <div className='movie-preview'>
                          <img alt="movie" id='movie-img' src={IMG_BASE_URL + image}/>
                          <div className='text-block'>
                              <h4 id="movie-title">
                                {title}
                              </h4>
                              <p id='movie-desc'>
                                {description}
                              </p>
                          </div>
                        </div>
                      </Link>
                    </div>

            )
    }
}

export default SearchItem;
