import React, {Component, Fragment} from 'react';
import { View,  Text, TouchableOpacity , TextInput, StatusBar } from 'react-native';
import Config from '../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import FormLayout from './FormLayout';

import sizeCalculator from '../../Service/SizeCalc';

import Styles from '../../config/styles';

export default class VerifyOTP extends Component {
	constructor(props) {
		super(props);
		this.state = {
            OTP: '',
			emailId: '',
			loader: false
		}
	}	
	
	componentDidMount = async() => {
		this.setState({emailId: this.props.route.params.emailId})
	}
	
	resendOTP() {
		this.setState({ loader: true});
		console.log(this.state);
		axios.post(Config[Config.env].RESTURL + '/user/forgot-password', {
			email: this.state.emailId
		}).then(function(response) {
		 	this.setState({ loader: false });
			Toast.show('Successfully Resend to the Email', Toast.LONG);
		}.bind(this)).catch(function(error) {
			console.log('Error... Try Again', error.response);
			this.setState({ loader: false });
			Toast.show(error.response.data, Toast.LONG);
		}.bind(this))
	}

	verifyOTP() {

        if(this.state.OTP === '' || this.state.OTP === null || this.state.OTP === undefined) {
            Toast.show('OTP is Required. Check your mail', Toast.LONG);
            return false;
        }

        if(this.state.OTP.length !== 4 )  {
            Toast.show('Check your OTP', Toast.LONG);
            return false;
		}
		this.setState({ loader: true, OTP: this.state.OTP, email: this.state.email });
		
		axios.put(Config[Config.env].RESTURL + '/user/forgot-password', {
            otp: this.state.OTP,
            email: this.state.emailId
        }).then(function(response) {
			console.log(response.data);
			this.setState({ loader: false});
			console.log(this.state.emailId);
            this.props.navigation.navigate('ChangePassword', {emailId: this.state.emailId});
            Toast.show('Successfully Verified', Toast.LONG);
        }.bind(this)).catch(function(error) {
			console.log(error.response);
			this.setState({ loader: false });
			Toast.show('Verification Failed', Toast.LONG);
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
							<Text style={Styles.warningHeaderSubTitle} suppressHighlighting={true}>
								An OTP is sent to your email id.
							</Text>
							<TextInput style={Styles.formTextInput} placeholder="Enter the OTP" allowFontScaling={true}
								onChangeText={(text) => this.setState({OTP: text})}
							/>
							<TouchableOpacity style={Styles.defaultBtn} activeOpacity={0.5} onPress={() => this.verifyOTP()}>
								<Text style={Styles.defaultBtnText} suppressHighlighting={true}>
									Verify OTP
								</Text>
							</TouchableOpacity >
						</View>
						<Text style={Styles.formLink} suppressHighlighting={true} onPress={() => {this.resendOTP()}}>
							Din't get a OTP ? Resend OTP
						</Text>
						<Text style={Styles.formLink} suppressHighlighting={true} onPress={() => {this.props.navigation.navigate('LoginScreen')}}>
							Login
						</Text>
					</FormLayout>
				)}
			</Fragment>
		);
    }
}