import React, {Component} from 'react'
import {Link} from "react-router-dom"
import { DragSource } from "react-dnd"
import './GridItem.css'
const IMG_BASE_URL = 'http://image.tmdb.org/t/p/original/'

class GridItem extends Component {

  // dragItem = (event, id) => {
  //   // save the id of the dragged item on the event
  //   event.dataTransfer.setData('text/plain', id)
  // }

    render() {
        const {title, image, release, id, connectDragSource} = this.props
        return connectDragSource(
            <div>
                      <Link to={'/moviedetails/' + id} key={id}>
                        <div className='movie-preview'>
                          <img className='movie-img' alt={title} src={IMG_BASE_URL + image}/>
                          <div className="hover-overlay">
                              <div className="movie-title">{title}</div>
                              <div className="release-date">{release.split('-', 1)}</div>
                          </div>
                        </div>
                      </Link>
                      </div>
            )
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  }
}

const cardSource = {
  beginDrag(props, monitor, component) {
    const item = { id: props.id, title: props.title }
    return item
  }
}

export default DragSource("SOURCE", cardSource, collect)(GridItem)
