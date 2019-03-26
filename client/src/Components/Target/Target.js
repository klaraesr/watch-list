import React, {Component} from 'react'
import { DropTarget } from "react-dnd"
import './Target.css'

/**
 * Specifies the drop target contract.
 */

const spec = {
  drop(props, monitor, component) {
    // Obtain the dragged item
    const item = monitor.getItem()
    item.toWatch = props.toWatch
    // do onDrop from DragDropContext (SearchPage)
    props.onDrop(item)
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Called inside render()
    // to let React DnD handle the drag events
    connectDropTarget: connect.dropTarget(),
    // Ask monitor about the current drag state
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  }
}

class Target extends Component {

  render() {
      const {toWatch, isOver, canDrop, connectDropTarget, droppedItem } = this.props
      let dropState = ''
      if(isOver) {
        dropState = 'over'
      } else if (!isOver && canDrop) {
        dropState = 'droppable'
      }

      return connectDropTarget(
              <div className='col-sm-6'>
                <div className={`target ${dropState}`}>
                  <span className='dropTitle'>
                    <div>
                      { droppedItem && droppedItem.list === 'toWatch' &&
                        'You added ' + JSON.stringify(droppedItem.title) + ' to watch later'
                      }
                      { droppedItem && droppedItem.list === 'watched' &&
                        'You added ' + JSON.stringify(droppedItem.title) + ' to watched'
                      }
                      { !droppedItem.list &&
                        <div>
                          { toWatch ?
                              <div className="drag-container">
                                  Add to watch list <img className="drag-drop-img" alt="drag and drop" src="/drag.png"/>
                              </div>
                              :
                              <div className="drag-container">
                                  Add to watched list <img className="drag-drop-img" alt="drag and drop" src="/drag.png"/>
                              </div>
                          }
                        </div>
                      }
                    </div>
                  </span>
                </div>
              </div>
          )
  }
}

export default DropTarget("SOURCE", spec, collect)(Target)
