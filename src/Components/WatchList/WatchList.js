import React, {Component} from 'react'

// This component will be used for both to 'toWatch' and 'watched' as they have the same structure.
// Make different API-calls for either 'toWatch' or 'watched', decided by the this.props.mode prop.
class WatchList extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

WatchList.propTypes = {};

export default WatchList;
