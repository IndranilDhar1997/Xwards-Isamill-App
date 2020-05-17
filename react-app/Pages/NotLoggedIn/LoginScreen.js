import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity , TextInput,StatusBar } from 'react-native';
import sizeCalculator from '../../Service/SizeCalc';
import Config from '../../config/config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import FormLayout from './FormLayout';

import Styles from '../../config/styles';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailId: '',
			password: '',
			loader: false
		}
	}

	login() {
        if(this.state.emailId === '' || this.state.emailId === null || this.state.emailId === undefined) {
            Toast.show('Email is Required');
            return false;
		}
		
        if(this.state.password === '' || this.state.password === null || this.state.password === undefined) {
            Toast.show('Password is Required');
            return false;
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regex to validate email
		
		if(reg.test(this.state.emailId) === false) {
            Toast.show('Email Format is Incorrect');
            return false;
        }

		this.setState({ loader: true });

        axios.post(Config[Config.env].RESTURL + '/user/login', {
            email: this.state.emailId,
            password: this.state.password
        }).then(function(response) {
			this.props.route.params.onLogin(response.data.data.data);
			this.setState({loader: false});
        }.bind(this)).catch(function(error) {
			let err = Object.assign({}, error);
			console.log(err);
			this.setState({ loader: false });
			Toast.show('Login Failed ' + err.response.data.message);
			if (err.response.data.message === 'User is not verified.') {
				this.props.navigation.navigate('VerifyUser', {emailId: this.state.emailId});
			}
        }.bind(this))
	}

    render() {
		return(
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
							<TextInput placeholder="Email Id" style={Styles.formTextInput} allowFontScaling={true}
								onChangeText={(text) => this.setState({emailId: text.toLowerCase()})}
							/>
							<TextInput placeholder="Password" style={Styles.formTextInput} allowFontScaling={true}
								onChangeText={(text) => this.setState({password: text})}
								autoCompleteType='password'
								secureTextEntry={true}
							/>
							<TouchableOpacity style={Styles.defaultBtn} activeOpacity={0.5} onPress={() => this.login()}>
								<Text style={Styles.defaultBtnText} suppressHighlighting={true}>
									Login 
								</Text>
							</TouchableOpacity >
						</View>
						<Text style={Styles.formLink} suppressHighlighting={true} onPress={() => {this.props.navigation.push('SignupScreen')}}>
							Not a user? Create an Account.
						</Text>
						<Text style={Styles.formLink} suppressHighlighting={true} onPress={() => {this.props.navigation.navigate('ForgotPassword')}}>
							Forgot Password?
						</Text>
					</FormLayout>
				)}
			</Fragment>
		)
    }
}