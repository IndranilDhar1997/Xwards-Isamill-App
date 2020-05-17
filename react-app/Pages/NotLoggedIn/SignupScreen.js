import React, {Component, Fragment} from 'react';
import { View,  Text, TouchableOpacity , TextInput, ScrollView, StatusBar } from 'react-native';
import Config from '../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import FormLayout from './FormLayout';
import { Overlay, Button } from 'react-native-elements';
import sizeCalculator from '../../Service/SizeCalc';

import Styles from '../../config/styles';

export default class SignupScreen extends Component {	
    constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email_id: '',
			password: '',
			c_password: '',
			loader: false,
			isVisible: false
		}
	}	

	hidePasswordOverlay = () => {
		this.setState({ isVisible: false });
	} 

	signUp() {

		if(this.state.first_name === '' || this.state.first_name === null || this.state.first_name === undefined) {
            Toast.show('First Name is Required');
            return false;
		}
		
        if(this.state.email_id === '' || this.state.email_id === null || this.state.email_id === undefined) {
            Toast.show('Email is Required');
            return false;
		}
		
        if(this.state.password === '' || this.state.password === null || this.state.password === undefined) {
            Toast.show('Password is Required');
            return false;
		}

        if (this.state.password !== this.state.c_password) {
            Toast.show('Password mismatch');
            return false;
		}
		
		//Validating the format of the email
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regex to validate email
        if(reg.test(this.state.email_id) === false) {
            Toast.show('Email Format is Incorrect');
            return false;
		}

		// Validating the password with atleast one numeric, one uppercase and one lowercase and a special character
		var password = this.state.password.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,30}$/;
		if(passwordRegex.test(password) === false) {
			this.setState({ isVisible: true })
			return false;
		}

		this.setState({ loader: true });

        axios.post(Config[Config.env].RESTURL + '/user', {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
            email: this.state.email_id,
			password: password,
			cpassword: this.state.c_password
        }).then(function(response) {
			console.log(response.data);
			this.setState({ isVisible: false, loader: false, first_name: '', last_name: '', email_id: '', password: '', c_password: '', });
			this.props.navigation.navigate('VerifyUser', {emailId: response.data.data.data.email_id});
            Toast.show('Successfully Registered');
        }.bind(this)).catch(function(error) {
			this.setState({ loader: false, password: '', c_password: '', });
            Toast.show(error.response.data.message, Toast.LONG);
        }.bind(this));
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
							<TextInput style={Styles.formTextInput} placeholder="First Name"
								allowFontScaling={true}
								onChangeText={(text) => this.setState({first_name: text})}
							/>
							<TextInput style={Styles.formTextInput} placeholder="Last Name"
								allowFontScaling={true}
								onChangeText={(text) => this.setState({last_name: text})}
							/>
							<TextInput style={Styles.formTextInput} placeholder="Email Id"
								allowFontScaling={true}
								onChangeText={(text) => this.setState({email_id: text})}
							/>
							<TextInput style={Styles.formTextInput} placeholder="Password"
								allowFontScaling={true}
								onChangeText={(text) => this.setState({password: text})}
								autoCompleteType='password'
								secureTextEntry
							/>
							<TextInput style={Styles.formTextInput} placeholder="Confirm Password"
								allowFontScaling={true}
								onChangeText={(text) => this.setState({c_password: text})}
								autoCompleteType='password'
								secureTextEntry
							/>
							<TouchableOpacity style={Styles.defaultBtn} activeOpacity={0.5} onPress={() => this.signUp()}>
								<Text style={Styles.defaultBtnText}>
									Signup
								</Text>
							</TouchableOpacity >
							<Text style={Styles.formLink} onPress={() => this.props.navigation.navigate('LoginScreen')}>
								Already an User?
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