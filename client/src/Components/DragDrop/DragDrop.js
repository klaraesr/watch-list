import React, {Component} from 'react';
import Target from "../Target/Target";
import './DragDrop.css'

class DragDrop extends Component {
    render() {
        return (
            <div className='row dropRow'>
                <Target droppedItem={this.props.droppedItem} onDrop={this.props.onDrop} toWatch={true}/>
                <Target droppedItem={this.props.droppedItem} onDrop={this.props.onDrop} toWatch={false}/>
            </div>
        );
    }
}
export default DragDrop;
