import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import StaticPage from '../StaticPage';
import SizeCalculator from '../../../../Service/SizeCalc';
import ImageHeightAuto from '../../Components/ImageHeightAuto';

export default class AboutScreen extends Component {
    
    render() {
        return ( 
            <Fragment>
                <StaticPage title={'About Us'}  onBack={() => this.props.navigation.goBack()}>
                    <View style={{width: '100%', paddingBottom: SizeCalculator.height(70)}}>
                        <ImageHeightAuto style={{
                            width:'100%',
                            resizeMode: 'contain'
                        }} source={require('./contents/1.png')} />
                        <ImageHeightAuto style={{
                            width:'100%',
                            resizeMode: 'contain'
                        }} source={require('./contents/2.png')} />
                        <ImageHeightAuto style={{
                            width:'100%',
                            resizeMode: 'contain'
                        }} source={require('./contents/3.png')} />
                    </View>
                </StaticPage>
            </Fragment>
        );
    }
}
 
;