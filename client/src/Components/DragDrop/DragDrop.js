import React, {Component} from 'react';

class DragDrop extends Component {
    render() {
        return (
            <div className='row dropRow'>
                <Target droppedItem={this.props.watch} onDrop={this.props.onDrop} toWatch={true}/>
                <Target droppedItem={this.props.watched} onDrop={this.props.onDrop} toWatch={false}/>
            </div>
        );
    }
}
export default DragDrop;
