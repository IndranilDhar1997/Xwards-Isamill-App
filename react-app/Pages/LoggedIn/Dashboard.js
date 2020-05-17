import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';

import User from '../../DataStorage/User';
import DashboardHeader from './DashboardHeader';
import DashboardButton from './Components/DashboardButton';
import Styles from '../../config/styles';

export default class DashboardScreen extends Component {
    
    constructor(props) {
        super(props);
        
    }
    
    dummy() {

    }

    logout() {
        this.props.route.params.onLogout();
    }

    render() { 
        return ( 
            <Fragment>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <DashboardHeader onLogout={() => this.logout()} navigation={this.props.navigation} />
                <ScrollView style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}>
                    <View style={{alignItems: 'center'}}> 
                        <View style={Styles.dashboardButtonContainer}>
                            <DashboardButton image={require('./Components/icons/home.png')} title="Home" onClick={() => this.props.navigation.navigate('HomeScreen')}></DashboardButton>
                            {User.get().user_type !== 'GUEST' && 
                                <DashboardButton image={require('./Components/icons/troubleshoot.png')} title="Troubleshoot" onClick={() => this.props.navigation.navigate('TroubleshootingScreen')}></DashboardButton>
                            }
                            <DashboardButton image={require('./Components/icons/FAQ.png')} title="FAQ" onClick={() => this.props.navigation.navigate('FAQScreen')}></DashboardButton>
                            {User.get().user_type !== 'GUEST' && 
                                <DashboardButton image={require('./Components/icons/support.png')}  title="Support" onClick={() => this.props.navigation.navigate('SupportScreen')}></DashboardButton>
                            }
                            <DashboardButton image={require('./Components/icons/calc.png')} title="Calculations" onClick={() => this.props.navigation.navigate('CalculatorScreen')}></DashboardButton>
                            <DashboardButton image={require('./Components/icons/disclaimer.png')} title="Disclaimer" onClick={() => this.props.navigation.navigate('DisclaimerScreen')}></DashboardButton>
                            <DashboardButton image={require('./Components/icons/feedback.png')} title="Feedback" onClick={() => this.props.navigation.navigate('SendFeedback')}></DashboardButton>
                            <DashboardButton image={require('./Components/icons/about.png')} title="About Us" onClick={() => this.props.navigation.navigate('AboutScreen')}></DashboardButton>
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        );
    }
}
 
;