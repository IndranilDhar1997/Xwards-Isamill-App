import React, { Fragment } from 'react';
import { View,  Text, TouchableOpacity , TextInput, ScrollView } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import Config from '../../../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { Overlay, ListItem, Button } from 'react-native-elements';
import User from '../../../../DataStorage/User';
import Modal from './modal';
import styles from '../../../../config/styles';

export default class ChangePasswordModal extends Modal {
    constructor(props) {
        super(props);
        console.log(User.get().login_auth);
        this.state = {
            isVisible: false,
            current_password: '',
            new_password: '',
            cnew_password: '',
            token: User.get().login_auth,
            loader: false,
            isPasswordValidatingVisible: false
        }
    }

    doNothing() {}

    open() {
        this.toggleOverlay();
    }

    hidePasswordOverlay = () => {
		this.setState({ isPasswordValidatingVisible: false });
	} 

    updatePassword() {
        if(this.state.current_password === '' || this.state.current_password === null || this.state.current_password === undefined) {
            Toast.show('Current Password is Required');
            return false;
        }
        
		if(this.state.new_password === '' || this.state.new_password === null || this.state.new_password === undefined) {
            Toast.show('Password is Required');
            return false;
		}

		if(this.state.cnew_password === '' || this.state.cnew_password === null || this.state.cnew_password === undefined) {
            Toast.show('Confirm Password is Required');
            return false;
		}
		
        if (this.state.new_password !== this.state.cnew_password) {
            Toast.show('Password mismatch');
            return false;
        }

        // Validating the password with atleast one numeric, one uppercase and one lowercase and a special character
		var password = this.state.new_password.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,30}$/;
		if(passwordRegex.test(password) === false) {
			this.setState({ isPasswordValidatingVisible: true });
			return false;
		}

        this.setState({ loader: true});
        axios.put(Config[Config.env].RESTURL + '/user/password', {
            current_password: this.state.current_password,
            new_password: password,
            cnew_password: this.state.cnew_password
        },{
            headers : { 'x-auth': this.state.token }
        }).then(function(response) {
            console.log(response.data);
            this.toggleOverlay();
			this.setState({ loader: false, isPasswordValidatingVisible: false, isVisible: false  });
            Toast.show('Password Changed Successfully', Toast.LONG);
        }.bind(this)).catch(function(error) {
			console.log(error.response.data);
			this.setState({ loader: false, isPasswordValidatingVisible: false });
            Toast.show(error.response.data.message, Toast.LONG);
        }.bind(this))
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
                        onBackdropPress={() => this.doNothing()} 
                        isVisible={this.state.isVisible}
                        borderRadius={sizeCalculator.width(10)}
                        height="auto"
                    >
                        <Fragment>
                            <View style={{
                                width: '100%',
                                paddingHorizontal: sizeCalculator.width(10)
                            }}>
                                <Text style={[styles.warningHeaderSubTitle, {fontFamily: "Montserrat-Medium"}]}>Change Password</Text>
                                <TextInput
                                    style={styles.formTextInputBordered}
                                    allowFontScaling={true}
                                    autoCompleteType='password'
                                    secureTextEntry={true}
                                    placeholder="Current Password"
                                    onChangeText={(text) => this.setState({current_password: text})}
                                />
                                <TextInput
                                    style={styles.formTextInputBordered}
                                    allowFontScaling={true}
                                    autoCompleteType='password'
                                    secureTextEntry={true}
                                    placeholder="New Password"
                                    onChangeText={(text) => this.setState({new_password: text})}
                                />
                                <TextInput
                                    style={styles.formTextInputBordered}
                                    allowFontScaling={true}
                                    autoCompleteType='password'
                                    secureTextEntry={true}
                                    placeholder="Confirm Password"
                                    onChangeText={(text) => this.setState({cnew_password: text})}
                                    />
                                <TouchableOpacity style={styles.defaultBtn} activeOpacity={0.5} onPress={() => this.updatePassword()}>
                                    <Text style={styles.defaultBtnText} suppressHighlighting={true}>
                                        Change Password
                                    </Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={[styles.defaultBtn, { backgroundColor: '#a13c2f'}]} activeOpacity={0.5} onPress={() => this.toggleOverlay()}>
                                    <Text style={styles.defaultBtnText} suppressHighlighting={true}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity >
                                <Overlay isVisible={this.state.isPasswordValidatingVisible} 
                                    windowBackgroundColor="rgba(0,0,0,0.8)" 
                                    overlayBackgroundColor="white"
                                    onBackdropPress={() => this.setState({ isVisible: false })}
                                >
                                    <View style={{flex:1}}>
                                        <ScrollView>
                                            <Text style={styles.warningHeaderTitle}>Warning</Text>
                                            <Text style={styles.warningHeaderSubTitle}>Password Criteria</Text>
                                            <Text style={styles.overlayText}>Password must be atleast 8 characters and maximum of 30.</Text>
                                            <Text style={styles.overlayText}>Password must contain one Uppecase and one lowercase character [A-Z, a-z].</Text>
                                            <Text style={styles.overlayText}>Password must be alphanumeric [0-9].</Text>
                                            <Text style={styles.overlayText}>Password must contain atleast one special character.</Text>
                                        </ScrollView>
                                        <Button
                                            buttonStyle={styles.warnBtn}
                                            titleStyle={styles.warnBtnText}
                                            icon={{
                                                name: "warning",
                                                size: sizeCalculator.fontSize(18),
                                                color: "white"
                                            }}
                                            onPress={()=> this.hidePasswordOverlay()}
                                            title="Got it!"
                                        />
                                    </View>
                                </Overlay>
                            </View>
                        </Fragment>
                    </Overlay>
				)}
            </Fragment>
        )
    }
}