import React, {Component} from 'react'
import { DropTarget } from "react-dnd";

class Target extends Component {

  // dragItem = (event, id) => {
  //   // save the id of the dragged item on the event
  //   event.dataTransfer.setData('text/plain', id)
  // }

  render() {
      const {listType, isOver, canDrop, connectDropTarget, droppedItem } = this.props
      let dropState = ''
      if(isOver) {
        dropState = 'over'
      } else if (canDrop) {
        dropState = 'possible'
      }
      return connectDropTarget(
              <div className={`col-sm-6 target ${dropState}`}>

                <span className='dropTitle'>{listType === 'toWatch' ?
                <div>
                { droppedItem ?
                  JSON.stringify(droppedItem) :
                  'Watch later'
                }
                </div>
                : 'Already watched'}</span>

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
