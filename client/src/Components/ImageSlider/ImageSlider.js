import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

// stateless component
class ImageSlider extends Component {
    render() {
        return (
            <div>
                <h4 className="titles">Newest releases</h4>
                {this.props.loading && "LOADING..."}
                {!this.props.loading &&
                <ImageGallery items={this.props.movies} showThumbnails={false} showFullscreenButton={false}
                              autoPlay={true} showPlayButton={false} onClick={this.handleClick} showNav={false}/>
                }
            </div>
        );
    }
}

ImageSlider.propTypes = {};

export default ImageSlider;
