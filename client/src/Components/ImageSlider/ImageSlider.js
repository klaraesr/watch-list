import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import Loader from "react-loader-spinner";
import './ImageSlider.css'

// stateless component
class ImageSlider extends Component {
    render() {
        return (
            <div>
                <h4 className="titles">Newest releases</h4>
                {this.props.loading && <Loader type="Oval" color="#FF9A00" height="100" width="100"/>}
                {!this.props.loading &&
                <ImageGallery items={this.props.movies} showThumbnails={false} showFullscreenButton={false}
                              autoPlay={true} showPlayButton={false} onClick={this.props.handleClick} showNav={false}/>
                }
            </div>
        );
    }
}

ImageSlider.propTypes = {};

export default ImageSlider;
