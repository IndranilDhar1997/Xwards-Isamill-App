import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import sizeCalculator from '../../Service/SizeCalc';
import ProfileMenuModal from './Components/modals/profileMenu';
import Styles from '../../config/styles';

export default class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoWidth: 150,
        }
    }

    componentDidMount() {
        let originalWidth = 1496;
        let originalHeight = 443;
        setTimeout(function() {
            let that = this;
            this.logoRef.measure(function(ox, oy, width, height, px, py) {
                let logoWidth = ((height*originalWidth)/originalHeight);
                that.setState({
                    logoWidth: logoWidth,
                })
            }.bind(that));
        }.bind(this), 350);
    }

    render() {
        return (
            <Fragment>
                <ProfileMenuModal ref={(ref) => this.menuRef=ref} logout={() => this.props.onLogout()} navigation={this.props.navigation} />
                <View style={{
                    height: sizeCalculator.height(58),
                    width: '100%',
                    backgroundColor: 'white',
                    position: 'relative',
                    flexDirection: 'row',
                    zIndex: 100
                }}>
                    <View style={{
                        flex: 2,
                        height: sizeCalculator.height(58),
                        paddingHorizontal: sizeCalculator.width(25),
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Image source={require('../../Images/isa-mill-logo.png')}
                            ref={(ref) => this.logoRef=ref}
                            style={[Styles.dashboardLogo, {
                                width: this.state.logoWidth,
                            }]} />
                    </View>
                    <View style={{
                        flex: 1,
                        height: sizeCalculator.height(58),
                        paddingHorizontal: sizeCalculator.width(8),
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={Styles.dashboardHeaderBtn} onPress={() => this.menuRef.toggleOverlay()} >
                            <Image source={require('../../Images/dashboard-profile-icon.png')}
                                style={[Styles.dashboardHeaderBtnImg, {
                                    width: this.state.logoWidth,
                                }]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Fragment>
        );
    }
}