import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import { Overlay  } from 'react-native-elements'
import styles from '../../../../config/styles';
import Config from '../../../../config/config';
import axios from 'axios';
import Modal from '../../Components/modals/modal';
import Toast from 'react-native-simple-toast';

export default class AddTopicModal extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            topic: '', 
            details: '',
            isVisible: false,
            loader: false
        }
    }

    toggleOverlay() {
        console.log("the visible right now", this.state.isVisible);
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    
    doNothing() {}

    addTopic() {
        this.setState({ loader: true });
        let token = User.get().login_auth;

        if (this.state.topic.length < 10 || this.state.topic.length > 100) {
            Toast.show('Topic title must be more than 10 letters and less than 100 letters.', Toast.LONG);
            this.setState({ loader: false });
            return false;
        }
        if (this.state.details.length < 20 || this.state.details.length > 500) {
            Toast.show('Topic title must be more than 20 letters and less than 500 letters.', Toast.LONG);
            this.setState({ loader: false });
            return false;
        }
        console.log('Going for it...');
        axios.post(Config[Config.env].RESTURL + '/topic', {
            topicName: this.state.topic,
            details: this.state.details
        }, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            this.setState({loader: false, topic: '', details: '', isVisible: false});
            this.props.onTopicCreated();
        }.bind(this)).catch(function(error) {
			let err = Object.assign({}, error);
			console.log(err);
			this.setState({ loader: false });
			Toast.show('Error while creating topic. Please try again.');
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
                    <Fragment>
                        <Overlay 
                            onBackdropPress={() => this.doNothing()} 
                            isVisible={this.state.isVisible}
                            borderRadius={sizeCalculator.width(10)}
                            overlayStyle={{width: '90%'}}
                            height="auto"
                        >
                            <View style={{
                                width: '100%',
                                paddingHorizontal: sizeCalculator.width(10)
                            }}>
                                <Text style={[styles.warningHeaderSubTitle, {fontFamily: "Montserrat-Medium"}]}>
                                    Create a new topic
                                </Text>
                                <TextInput
                                    style={styles.formTextInputBordered}
                                    allowFontScaling={true}
                                    placeholder="Topic Heading"
                                    value={this.state.first_name}
                                    onChangeText={(text) => this.setState({topic: text})}
                                />
                                <TextInput style={[styles.formTextInput, {
                                    borderWidth: 0.3,
                                    textAlignVertical: 'top',
                                    textAlign: 'left',
                                    height: sizeCalculator.height(300)
                                }]} placeholder='Provide some details.' 
                                    multiline={true} 
                                    onChangeText={(text) => this.setState({details: text})} />
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={[styles.defaultBtn, { marginRight: sizeCalculator.width(8), flex: 1, backgroundColor: '#a13c2f'}]} activeOpacity={0.5} onPress={() => this.toggleOverlay()}>
                                        <Text style={styles.defaultBtnText} suppressHighlighting={true}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity >
                                    <TouchableOpacity style={[styles.defaultBtn, {
                                        flex: 1, marginLeft: sizeCalculator.width(8)
                                    }]} activeOpacity={0.5} onPress={() => this.addTopic()}>
                                        <Text style={styles.defaultBtnText} suppressHighlighting={true}>
                                            Create Topic
                                        </Text>
                                    </TouchableOpacity >
                                </View>
                            </View>
                        </Overlay>
                    </Fragment>
				)}
            </Fragment>
        )
    }
}