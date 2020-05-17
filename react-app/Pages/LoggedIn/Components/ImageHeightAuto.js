import React, { Component, Fragment } from 'react';
import {Image} from 'react-native';

export default class ImageAutoHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 100
        }
    }

    componentDidMount() {
        let dims = Image.resolveAssetSource(this.props.source);
        let originalWidth = dims.width;
        let originalHeight = dims.height;
        setTimeout(function() {
            let that = this;
            this.ImgRef.measure(function(ox, oy, width, height, px, py) {
                let imgHeight = ((width*originalHeight)/originalWidth);
                that.setState({
                    imgHeight: imgHeight,
                })
            }.bind(that));
        }.bind(this), 500);
    }

    render() {
        return <Image
            ref={(ref) => this.ImgRef=ref}    
            style={[this.props.style, {height: this.state.imgHeight}]} source={this.props.source} />
    }
}