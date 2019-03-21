import React, {Component} from 'react';
import ListItem from "../Components/ListItem/ListItem";

class MovieListPage extends Component {

    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
                {watchedList.map((movie) => (<ListItem movie={movie}/>))}
            </div>
        );
    }
}

const watchedList = [
    {
        id: 2,
        name: 'Avengers',
        image: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    },
    {
        id: 3,
        name: 'Avengers2',
        image: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    },
    {
        id: 2,
        name: 'Avengers',
        image: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    },
    {
        id: 3,
        name: 'Avengers2',
        image: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    },
    {
        id: 2,
        name: 'Avengers',
        image: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    },
    {
        id: 3,
        name: 'Avengers2',
        image: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    }
]

export default MovieListPage;
