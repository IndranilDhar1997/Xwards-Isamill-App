import React, {Component, Fragment} from 'react';
import { View, Image, Text, TouchableOpacity , TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Styles from '../../config/styles';

import sizeCalculator from '../../Service/SizeCalc';

export default class FormLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
				<LinearGradient 
					start={{x: 0.5, y: 0}} 
					end={{x: 1, y: 0.9}}
					colors={['#ffffff', '#bababa']} 
					useAngle={true}
					angle={120}
					style={{
						height: '100%',
						width: '100%',
						position: 'absolute',
						zIndex: -10
					}}
				></LinearGradient>
				<View style={{
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
                    <View style={{
                        position: 'relative',
                        maxWidth: sizeCalculator.width(350), minWidth: '75%',
                        justifyContent: 'center'
                    }}>
                        <Image style={Styles.logoImg} source={require('../../Images/isa-mill-logo.png')} />
                        <Text style={[Styles.logoImgText, {
                            fontSize: sizeCalculator.fontSize(16),
                            textAlign: 'center'
                        }]} suppressHighlighting={true}>
                            Flowsheet Improvements For The Real World
                        </Text>
                        {this.props.children}
                    </View>
                </View>
            </Fragment>
        );
    }
}