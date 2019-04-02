import React, {Component} from 'react'
import {Link} from "react-router-dom"
import { DragSource } from "react-dnd"
import './GridItem.css'
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w342/'
const NO_IMAGE_TMDB = 'https://www.themoviedb.org/assets/2/v4/logos/208x226-stacked-blue-e6df1ff1a41c48555a15336ae8a6b3c6f77dfae41d2a50b78e4794c1ce048792.png'

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource()
  }
}

class GridItem extends Component {

    render() {
        const {title, image, release, summary, id, connectDragSource} = this.props
        return connectDragSource(
            <div>
                      <Link to={'/moviedetails/' + id} key={id}>
                        <div className='movie-preview'>
                        { image ?
                            <img className='movie-img' alt={title} src={IMG_BASE_URL_SMALL + image}/> :
                            <div className='no-image'>
                              <img className='tmdb-img' alt={title} src={NO_IMAGE_TMDB}/>
                            </div>
                        }
                          <div className="hover-overlay">
                            <div className='movie-title'>{title}</div>
                            <div className='release-date'>{release.split('-', 1)}</div>
                            <div className='movie-summary'>{summary}</div>
                          </div>
                        </div>
                      </Link>
                      </div>
            )
    }
}

/**
 * Specifies the drag source contract.
 * Returns an item that follows the dragged object
 */

const cardSource = {
  beginDrag(props, monitor, component) {
    const item = { movieId: props.id, movieTitle: props.title, moviePoster: props.image_backdrop }
    return item
  }
}

export default DragSource("SOURCE", cardSource, collect)(GridItem)
