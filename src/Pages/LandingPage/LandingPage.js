import React, {Component} from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import './LandingPage.css'

// the page after login, maybe some large images of new films and recommendations for the user?
class LandingPage extends Component {

    handleClick = (e) => {
        console.log(e.target.title)
    }

    render() {

        const images = [
            {
                original: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all',
                originalTitle: 'Avengers',
                description: 'Avengers Endgame, Out 2019/03/19'
            },
            {
                original: 'http://scifiward.com/wp-content/uploads/2018/07/alita-battle-angel-et00066939-09-12-2017-02-10-47.jpg',
                originalTitle: 'Alita',
                description: 'Alita battle angel, Out 2019/03/19'
            },
        ]

        return (
            <div className="container appContainer">
                {this.props.navbar}

                <h4 className="titles">Newest releases</h4>
                <ImageGallery items={images} showThumbnails={false} showFullscreenButton={false} autoPlay={true} showPlayButton={false} onClick={this.handleClick} showNav={false}/>

                <h4 className="titles">Recommended for you</h4>
                <p className="left">Baserat på nuvarande listor....</p>

            </div>
        );
    }
}


export default LandingPage;
