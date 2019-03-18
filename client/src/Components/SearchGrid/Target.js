import React, {Component} from 'react'
import {Link} from "react-router-dom"
import { DropTarget } from "react-dnd";

class Target extends Component {

  // dragItem = (event, id) => {
  //   // save the id of the dragged item on the event
  //   event.dataTransfer.setData('text/plain', id)
  // }

  render() {
      const {listType, isOver, canDrop, connectDropTarget, droppedItem } = this.props
      let dropState = ''
      return connectDropTarget(
              <div className={`col-sm-6 target ${dropState}`}>
                <span className='dropTitle'>{listType === 'toWatch' ? 'Watch later' : 'Already watched'}</span>
              </div>
          )
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  }
}

const spec = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    props.onDrop(item)
  }
}

export default DropTarget("SOURCE", spec, collect)(Target)
