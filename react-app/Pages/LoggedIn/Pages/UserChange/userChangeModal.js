import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';

import { Overlay } from 'react-native-elements';

import User from '../../../../DataStorage/User';
import axios from 'axios';
import Config from '../../../../config/config';
import Toast from 'react-native-simple-toast';
import styles from '../../../../config/styles';

export default class UserTypeChangeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            user: null,
            loader: false
        }
    }

    toggleOverlay(user) {
        this.setState({
            isVisible: !this.state.isVisible,
            user: user
        })
    }

    changeUserType() {
        let token = User.get().login_auth;
        let user = {
            id: this.state.user.id,
            current_user_type: this.state.user.user_type
        }
        if (this.state.user.user_type === 'GUEST') {
            user.change_user_type = 'CUSTOMER';
        }
        if (this.state.user.user_type === 'CUSTOMER') {
            user.change_user_type = 'GUEST';
        }

        console.log(user.id, this.state.user.user_type, token);
        axios.put(Config[Config.env].RESTURL + "/user/type", {
            user_id: user.id,
            user_type: user.change_user_type,
        }, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            this.setState({ loader: false, isVisible: false });
            this.props.onUserChange(user.id);
            Toast.show('User Type Changed');
        }.bind(this)).catch(function(error) {
            console.log(error);
            this.setState({ loader: false, isVisible: false });
            Toast.show('Error. Please Try Later', Toast.LONG);
        }.bind(this));
    }
    
    render() {
        return (
            <Fragment>
                {(this.state.loader) && (
					<View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 18}}>Loading...</Text>
					</View>
				)}
                {(!this.state.loader) && (
                    <Overlay 
                        onBackdropPress={() => this.toggleOverlay(null)} 
                        isVisible={this.state.isVisible}
                        borderRadius={sizeCalculator.width(10)}
                        height="auto"
                    >
                        <Fragment>
                            {this.state.user && 
                                <View style={{
                                    width: '100%',
                                    paddingHorizontal: sizeCalculator.width(10)
                                }}>
                                    <Text style={{
                                        width: '100%',
                                        fontSize: sizeCalculator.fontSize(18),
                                        textAlign: 'center',
                                        fontFamily: "Montserrat-Regular"
                                    }}>
                                        {this.state.user.first_name} is a {this.state.user.user_type} user.{'\n'}Do you want to change the user to 
                                        {this.state.user.user_type === 'GUEST' && ' Customer '}
                                        {this.state.user.user_type === 'CUSTOMER' && ' Guest '}
                                        user type?
                                    </Text>
                                    <TouchableOpacity 
                                        style={styles.defaultBtn}
                                        activeOpacity={0.5}
                                        onPress={() => this.changeUserType()}
                                    >
                                        <Text style={styles.defaultBtnText}
                                            suppressHighlighting={true}
                                        >
                                            Make {this.state.user.user_type === 'GUEST' && ' Customer'}
                                            {this.state.user.user_type === 'CUSTOMER' && ' Guest'}
                                        </Text>
                                    </TouchableOpacity >
                                </View>
                            }
                        </Fragment>
                    </Overlay>
                )}
            </Fragment>
        )
    }
}