import React, { Component, Fragment } from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {Input, Button} from 'react-native-elements';
import StaticPage from '../StaticPage';
import sizeCalculator from '../../../../Service/SizeCalc';
import User from '../../../../DataStorage/User';
import axios from 'axios';
import Config from '../../../../config/config';
import Toast from 'react-native-simple-toast';
import styles from '../../../../config/styles';

export default class FeedbackScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackMsg: ''
        }
    }

    sendFeedback() {

        if(this.state.feedbackMsg === '' || this.state.feedbackMsg === null || this.state.feedbackMsg === undefined) {
            Toast.show('Please Write Feedback to Submit');
            return false;
		}

        if(this.state.feedbackMsg.length <= 20) {
            Toast.show('Feedback is short. More than 20 chars.', Toast.LONG);
            return false;
        }


        let token = User.get().login_auth;
        let feedbackMsg = this.state.feedbackMsg;
        let name = User.get().first_name+' '+User.get().last_name;

        this.setState({ loader: true });
        axios.post(Config[Config.env].RESTURL + '/user/send-feedback-mail', {
            name: name,
            message: feedbackMsg
        }, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            console.log('Response', response.data);
            this.setState({ loader: false });
            this.props.navigation.navigate('Dashboard');
            Toast.show('Feedback Submitted');
        }.bind(this)).catch(function(error) {
            console.log(error.response);
            this.setState({ loader: false});
            Toast.show('Error. Try Later');
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
                    <StaticPage title={'Send Feedback'} onBack={() => this.props.navigation.goBack()}>
                        <View style={{
                            width: '100%',
                            paddingHorizontal: sizeCalculator.width(10)
                        }}>
                            <Text style={[styles.warningHeaderSubTitle, {
                                marginBottom: sizeCalculator.height(10)
                            }]}>We would love to hear from you.</Text>
                            <TextInput style={[styles.formTextInput, {
                                borderWidth: 0.3,
                                textAlignVertical: 'top',
                                textAlign: 'left'
                            }]} placeholder='Please write your feedback' 
                                multiline={true} 
                                numberOfLines={15}
                                maxLength={200}
                                onChangeText={(text) => this.setState({feedbackMsg: text})} />
                            <Button title="Send Feedback"
                                titleStyle={styles.defaultBtnText}
                                onPress={() => this.sendFeedback()}
                                buttonStyle={styles.defaultBtn}/>
                        </View>
                    </StaticPage>
                )}
            </Fragment>
        );
    }
}