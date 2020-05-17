import React, {Component, Fragment} from 'react';
import { View,  Text, TouchableOpacity , TextInput, StatusBar } from 'react-native';
import Config from '../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import FormLayout from './FormLayout';

import sizeCalculator from '../../Service/SizeCalc';
import Styles from '../../config/styles';

export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailId: '',
			loader: false
		}
	}

	requestOTP() {
		if(this.state.emailId === '' || this.state.emailId === null || this.state.emailId === undefined) {
			Toast.show('Email is Required');
			return false;
		}

		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(reg.test(this.state.emailId) === false) {
			Toast.show('Email Format is Incorrect');
			return false;
		}

		this.setState({ loader: true})
		console.log(this.state)
		axios.post(Config[Config.env].RESTURL + '/user/forgot-password', {
			email: this.state.emailId
		}).then(function(response) {
			this.setState({ loader: false });
			Toast.show('Successfully Sent to the Email', Toast.LONG);
			this.props.navigation.navigate('VerifyOTP', {emailId: this.state.emailId});
		}.bind(this)).catch(function(error) {
			this.setState({ loader: false });
			console.log('Error... Try Again', error.response);
			Toast.show(error.response.data, Toast.LONG);
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
							<TextInput style={Styles.formTextInput} placeholder="Email Id" allowFontScaling={true}
								onChangeText={(text) => this.setState({emailId: text})}
							/>
							<TouchableOpacity style={Styles.defaultBtn} activeOpacity={0.5} onPress={() => this.requestOTP()}>
								<Text style={Styles.defaultBtnText} suppressHighlighting={true}>
									Request Password 
								</Text>
							</TouchableOpacity >
						</View>
						<Text style={Styles.formLink} onPress={() => {this.props.navigation.navigate('SignupScreen')}} suppressHighlighting={true}>
							Not a user? Create an Account.
						</Text>
						<Text style={Styles.formLink} onPress={() => this.props.navigation.navigate('LoginScreen')}>
							Login
						</Text>
					</FormLayout>
				)}
			</Fragment>
		);
    }
}