import React, { Component, Fragment } from 'react';
import {View, Text, TouchableOpacity, Image } from 'react-native';
import sizeCalculator from '../../../Service/SizeCalc';
import Styles from '../../../config/styles';

export default class DashboardButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            compoenntHeight:100
        }
    }

    componentDidMount() {
        setTimeout(function() {
            let that = this;
            this.btnRef.measure(function(ox, oy, width, height, px, py) {
                that.setState({
                    compoenntHeight: width,
                })
            }.bind(that));
        }.bind(this), 350)
    }

    render() { 
        return (
            <TouchableOpacity ref={(ref) => this.btnRef=ref} style={Styles.dashboardBtn} activeOpacity={0.5} onPress={() => this.props.onClick()}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: this.state.compoenntHeight, flex: 75, justifyContent: 'center'}}>
                        <Image source={this.props.image} style={Styles.dashboardBtnImg} />
                    </View>
                    <View style={{width: this.state.compoenntHeight, flex: 25, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={Styles.dashboardBtnTxt} suppressHighlighting={true}>
                            {this.props.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }
}
 
;