import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import sizeCalculator from '../../../Service/SizeCalc';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements'

export default class StaticPage extends Component {
    render() { 
        return ( 
            <Fragment>
                <StatusBar barStyle="light-content" backgroundColor="#324c87" />
                <View style={{
                    height: sizeCalculator.height(58),
                    width: '100%',
                    backgroundColor: 'white',
                    position: 'relative',
                    flexDirection: 'row',
                    zIndex: 100
                }}>
                    <LinearGradient 
                        start={{x: 0.5, y: 0}} 
                        end={{x: 1, y: 0.9}}
                        colors={['#455f9c', '#263e7a']} 
                        useAngle={true}
                        angle={120}
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            zIndex: -10
                        }}
                    ></LinearGradient>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: 0,
                        left: 0,
                        width: '30%',
                        height: '100%',
                        paddingHorizontal: sizeCalculator.width(15),
                    }} onPress={() => this.props.onBack()}>
                        <Icon
                            name='chevron-left'
                            color='#fff'
                            size={sizeCalculator.fontSize(35)}
                            iconStyle={{alignSelf: 'flex-start', height: '100%', textAlignVertical: 'center'}} />
                    </TouchableOpacity>
                    <View style={{
                        height: sizeCalculator.height(58),
                        paddingHorizontal: sizeCalculator.width(25),
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '100%'
                    }}>
                        <Text style={{
                            color: 'white',
                            width: '100%',
                            height: '100%',
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontSize: sizeCalculator.fontSize(23),
                            fontFamily: "Montserrat-Regular",
                        }}>{this.props.title}</Text>
                    </View>
                </View>
                <ScrollView style={[{
                    padding: sizeCalculator.height(8),
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'white',
                }, this.props.style]}>
                    {this.props.children}
                </ScrollView>
            </Fragment>
        );
    }
}
 
;