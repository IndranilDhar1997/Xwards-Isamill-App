import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import StaticPage from '../StaticPage';
import SizeCalculator from '../../../../Service/SizeCalc';
import styles from '../../../../config/styles';

export default class HomeScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 100
        }
    }

    componentDidMount() {
        let originalWidth = 1000;
        let originalHeight = 589;
        setTimeout(function() {
            let that = this;
            this.ImgRef.measure(function(ox, oy, width, height, px, py) {
                let imgHeight = ((width*originalHeight)/originalWidth);
                that.setState({
                    imgHeight: imgHeight,
                })
            }.bind(that));
        }.bind(this), 350);
    }

    render() { 
        return ( 
            <Fragment>
                <StaticPage title={'Home'} onBack={() => this.props.navigation.goBack()}>
                    <Image ref={(ref) => this.ImgRef=ref} source={require('../../../../Images/home-banner.jpg')} style={{
                        width: '100%',
                        height: this.state.imgHeight
                    }} />
                    <Text style={[styles.overlayText , {fontWeight: 'bold', fontSize: SizeCalculator.fontSize(21)}]}>
                        ​IsaMill™ uses horizontal milling to secure better energy efficiency, 
                        product size and availability in a 25% capital-back performance guarantee.
                    </Text>
                    <Text style={styles.overlayText}>
                        The IsaMill™ has real-world success in 129 metalliferous installations across 21 countries.
                    </Text>
                    <Text style={styles.overlayText}>
                        It’s the world’s only horizontal fine-grinding mill, so it avoids short-circuits, is highly efficient and gives the highest availability. IsaMill™ has 100% accurate scale-up and is proven consistently.
                    </Text>
                    <Text style={styles.overlayText}>
                        It’s easier to maintain has no height safety issues and slides open in minutes.
                    </Text>
                    <Text style={styles.overlayText}>
                        It produces a steep particle size distribution without needing internal screens or closed circuit cyclones. The horizontal plug-flow design prevents short circuiting and provides for a reliable and easy to operate technology.
                    </Text>
                    <Text style={styles.overlayText}>
                        And it delivers better results downstream to flotation and leaching performance.
                    </Text>
                    <Text style={styles.overlayText}>
                        In short, IsaMill™ reduces the energy cost, media cost and capital cost of fine-grinding.
                    </Text>
                    <Text style={[styles.overlayText, {marginBottom: SizeCalculator.height(40)}]}>
                        The IsaMill™ is used extensively in base metals, PGM, gold processing and magnetite grinding applications.  And the power capacity of an IsaMill ranges from 75kW to 3.8mW.
                    </Text>
                </StaticPage>
            </Fragment>
        );
    }
}
 
;