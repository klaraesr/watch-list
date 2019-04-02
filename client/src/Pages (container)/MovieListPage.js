import React, {Component} from 'react';
import Navbar from "../Components (presentational)/Navbar/Navbar";
import MovieList from "../Components (presentational)/MovieList/MovieList";

class MovieListPage extends Component {

    componentDidMount() {
        console.log(this.props.list)
    }

    render() {
        return (
            <div className="container appContainer">
                <Navbar/>
                <MovieList fullList={watchedList} list={this.props.list}/>
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
