import React, {Component, Fragment} from 'react';
import { View,  Text, TouchableOpacity , TextInput,StatusBar } from 'react-native';
import Config from '../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import FormLayout from './FormLayout';

import sizeCalculator from '../../Service/SizeCalc';
import Styles from '../../config/styles';

export default class VerifyUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
            OTP: '',
			email: '',
			loader: false
		}
	}	
	
	componentDidMount() {
		this.setState({email: this.props.route.params.emailId})
    }

	verifyUser() {

        if(this.state.OTP === '' || this.state.OTP === null || this.state.OTP === undefined) {
            Toast.show('OTP is Required. Check your mail', Toast.LONG);
            return false;
        }

        if(this.state.OTP.length !== 4 )  {
            Toast.show('Check your OTP', Toast.LONG);
            return false;
		}
		this.setState({ loader: true });
        axios.put(Config[Config.env].RESTURL + '/user/forgot-password', {
            otp: this.state.OTP,
            email: this.state.email
        }).then(function(response) {
			this.setState({ loader: false, email: '', OTP: ''});
			this.props.navigation.navigate('LoginScreen');
            Toast.show('Successfully Verified', Toast.LONG);
        }.bind(this)).catch(function(error) {
			this.setState({ loader: false });
            console.log('Failed to Verify... Please Check OTP', Toast.LONG);
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
							<TextInput style={Styles.formTextInput} placeholder="Enter the OTP"
								allowFontScaling={true}
								onChangeText={(text) => this.setState({OTP: text})}
							/>
							<TouchableOpacity style={Styles.defaultBtn} activeOpacity={0.5} onPress={() => this.verifyUser()}>
								<Text style={Styles.defaultBtnText} suppressHighlighting={true}>
									Verify User
								</Text>
							</TouchableOpacity >
						</View>
					</FormLayout>
				)}
			</Fragment>
		);
    }
}