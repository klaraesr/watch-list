import React, {Component} from 'react'
import {Link} from "react-router-dom"
import { DragSource } from "react-dnd"
import './GridItem.css'
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w342/'
const REPLACEMENT_IMG_POSTER = 'https://i.imgur.com/M1gUEMQ.png'

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
                              <img className='movie-img' alt={title} src={REPLACEMENT_IMG_POSTER}/>
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
    const item = { movieId: props.id, movieTitle: props.title, moviePoster: props.image }
    return item
  }
}

export default DragSource("SOURCE", cardSource, collect)(GridItem)
