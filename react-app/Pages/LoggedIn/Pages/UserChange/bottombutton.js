import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';

export default class BottomButtons extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: sizeCalculator.height(58)
                }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        height: sizeCalculator.height(58),
                        justifyContent: 'center',
                        borderRightWidth: sizeCalculator.width(0.2),
                        borderColor: '#ccc',
                    }} activeOpacity={0.3} onPress={() => this.props.listUsers('GUEST')}>
                        <Text style={{width: '100%', textAlign: 'center', fontSize: sizeCalculator.fontSize(18), fontFamily: "Montserrat-Regular"}}>Guests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        height: sizeCalculator.height(58),
                        justifyContent: 'center',
                        borderLeftWidth: sizeCalculator.width(0.2),
                        borderColor: '#ccc'
                    }} activeOpacity={0.3} onPress={() => this.props.listUsers('CUSTOMER')}>
                        <Text style={{width: '100%', textAlign: 'center', fontSize: sizeCalculator.fontSize(18), fontFamily: "Montserrat-Regular"}}>Customers</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
}