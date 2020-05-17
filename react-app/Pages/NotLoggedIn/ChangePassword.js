import React, {Component, Fragment} from 'react';
import { View,  Text, TouchableOpacity , TextInput, ScrollView,StatusBar } from 'react-native';
import Config from '../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import FormLayout from './FormLayout';
import { Overlay, Button } from 'react-native-elements';
import sizeCalculator from '../../Service/SizeCalc';

import Styles from '../../config/styles';

export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
            new_password: '',
			cnew_password: '',
			email: '',
			loader: false,
			isVisible: false
		}
	}	
	
	componentDidMount = async() => {
		this.setState({email: this.props.route.params.emailId})
	}

	hidePasswordOverlay = () => {
		this.setState({ isVisible: false });
	} 

	updatePassword() {
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
		var new_password = this.state.new_password.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,30}$/;
		if(passwordRegex.test(new_password) === false) {
			this.setState({ isVisible: true })
			return false;
		}

		this.setState({ loader: true});
        axios.put(Config[Config.env].RESTURL + '/user/reset-password', {
            email: this.state.email,
            new_password: new_password,
            cnew_password: this.state.cnew_password
        }).then(function(response) {
			this.props.navigation.navigate('LoginScreen');
			this.setState({ loader: false });
            Toast.show('Password Changed Successfully', Toast.LONG);
        }.bind(this)).catch(function(error) {
			let err = Object.assign({}, error);
			console.log(err);
			this.setState({ loader: false });
            console.log('Password Changed Failed... Try Again', Toast.LONG);
        }.bind(this))
	}

    render() {
		return (
			<Fragment>
				<StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
				{(this.state.loader) && (
					<View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 18}}>Loading...</Text>
					</View>
				)}
				{(!this.state.loader) && (
					<FormLayout>
						<View style={{
							position: 'relative',
							maxWidth: sizeCalculator.width(300), minWidth: '75%',
							justifyContent: 'center',
							alignSelf: 'center'
						}}>
							<TextInput style={Styles.formTextInput} placeholder="New Password"
								allowFontScaling={true} autoCompleteType='password'
								secureTextEntry={true}
								onChangeText={(text) => this.setState({new_password: text})}
							/>
							<TextInput style={Styles.formTextInput} placeholder="Confirm Password"
								allowFontScaling={true} autoCompleteType='password'
								secureTextEntry={true}
								onChangeText={(text) => this.setState({cnew_password: text})}
							/>
							<TouchableOpacity style={Styles.defaultBtn} activeOpacity={0.5} onPress={() => this.updatePassword()}>
								<Text style={Styles.defaultBtnText} suppressHighlighting={true}>
									Change Password
								</Text>
							</TouchableOpacity >
							<Text style={Styles.formLink} suppressHighlighting={true} onPress={() => {this.props.navigation.navigate('LoginScreen')}}>
								Login
							</Text>
							<Overlay isVisible={this.state.isVisible} 
								windowBackgroundColor="rgba(0,0,0,0.8)" 
								overlayBackgroundColor="white"
								onBackdropPress={() => this.setState({ isVisible: false })}
							>
								<View style={{flex:1}}>
									<ScrollView>
										<Text style={Styles.warningHeaderTitle}>Warning</Text>
										<Text style={Styles.warningHeaderSubTitle}>Password Criteria</Text>
										<Text style={Styles.overlayText}>Password must be atleast 8 characters and maximum of 30.</Text>
										<Text style={Styles.overlayText}>Password must contain one Uppecase and one lowercase character [A-Z, a-z].</Text>
										<Text style={Styles.overlayText}>Password must be alphanumeric [0-9].</Text>
										<Text style={Styles.overlayText}>Password must contain atleast one special character.</Text>
									</ScrollView>
									<Button
										buttonStyle={Styles.warnBtn}
										titleStyle={Styles.warnBtnText}
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
					</FormLayout>
				)}
			</Fragment>
		);
    }
}