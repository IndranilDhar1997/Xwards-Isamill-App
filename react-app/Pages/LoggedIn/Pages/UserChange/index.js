import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'
import Header from './header';
import UserTypeChangeModal from './userChangeModal';

import BottomButtons from './bottombutton';
import Config from '../../../../config/config';
import sizeCalculator from '../../../../Service/SizeCalc';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import User from '../../../../DataStorage/User';

export default class UserChange extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedUserType: 'GUEST',
            entireUserList: [],
            userList: [],
            loader: false
        }
    }

    componentDidMount() {
        this.listUsers(this.state.selectedUserType);
        let token = User.get().login_auth;
        this.setState({ loader: true });

        axios.get(Config[Config.env].RESTURL + '/user/get-all', {
            headers : { 'x-auth': token }
        }).then(function(response) {
            console.log(response);
            this.setState({ selectedUserType: 'GUEST', loader: false, entireUserList: response.data });
            this.listUsers('GUEST');
        }.bind(this)).catch(function(error) {
            console.log(error.response.data);
            this.setState({ loader: false });
            Toast.show('Error while fetching');
        }.bind(this));
    }

    listUsers(usertype) {
        let userList = this.state.entireUserList.filter(function(user) {
            if (user.user_type === usertype) {
                return user;
            }
        });
        this.setState({
            selectedUserType: usertype,
            userList: userList
        });
    }

    onUserChange(userId) {
        let newUserList = this.state.entireUserList.map(function(user) {
            if (user.id === userId) {
                if (user.user_type === 'GUEST') {
                    user.user_type = 'CUSTOMER';
                } else if (user.user_type === 'CUSTOMER') {
                    user.user_type = 'GUEST';
                }
            }
            return user;
        });
        this.setState({ entireUserList: newUserList});
        this.listUsers(this.state.selectedUserType);
    }

    markGuestOrCustomer(user) {
        this.useroptionModal.toggleOverlay(user);
    }

    render() {
        if(this.state.userList === null || this.state.userList === []) {
            return(
                <Fragment>
                    <StatusBar barStyle="light-content" backgroundColor="#324c87" />
                    {(this.state.loader) && (
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 18}}>Loading...</Text>
                        </View>
                    )}
                </Fragment>
            )
        } else {
            return ( 
                <Fragment>
                    {(this.state.loader) && (
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 18}}>Loading...</Text>
                        </View>
                    )}
                    {(!this.state.loader) && (
                        <Fragment>
                            <StatusBar barStyle="light-content" backgroundColor="#324c87" />
                            <UserTypeChangeModal ref={(ref) => this.useroptionModal=ref} onUserChange={(userId) => this.onUserChange(userId)} />
                            <Header navigation={this.props.navigation} />
                            <View style={{
                                width: '100%',
                                height: '100%',
                                paddingBottom: sizeCalculator.height(116)
                            }}>
                                <Text style={{
                                    color: '#263f7a',
                                    width: '100%',
                                    fontWeight: '200',
                                    fontSize: sizeCalculator.fontSize(20),
                                    paddingHorizontal: sizeCalculator.width(10),
                                    paddingVertical: sizeCalculator.height(8),
                                    fontFamily: "Montserrat-Medium"
                                }}>
                                    {this.state.selectedUserType === 'GUEST' && 'List of Guests'}
                                    {this.state.selectedUserType === 'CUSTOMER' && 'List of Customers'}
                                </Text>
                                <ScrollView style={{
                                    backgroundColor: 'white',
                                    paddingHorizontal: sizeCalculator.width(8),
                                    height: '100%',
                                    width: '100%'
                                }}>
                                    {this.state.userList.map((val, key) => (
                                        <ListItem
                                            key={key}
                                            title={val.first_name+' '+(val.last_name || '')}
                                            subtitle={val.email_id}
                                            bottomDivider
                                            titleStyle={{
                                                fontSize: sizeCalculator.fontSize(18),
                                                fontWeight: '300',
                                                color: '#263f7a',
                                                fontFamily: "Montserrat-Medium"
                                            }}
                                            subtitleStyle={{
                                                fontSize: sizeCalculator.fontSize(16),
                                                fontWeight: '300',
                                                color: '#777',
                                                fontFamily: "Montserrat-Regular"
                                            }}
                                            onPress={() => this.markGuestOrCustomer(val)}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                            <BottomButtons listUsers={(usertype) => this.listUsers(usertype)} selected={this.state.usertype} />
                        </Fragment>
                    )}
                </Fragment>
            );
        }
        
    }
}
 
;