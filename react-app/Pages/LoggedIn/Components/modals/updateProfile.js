import React, { Fragment } from 'react';
import { View,  Text, TouchableOpacity , TextInput, ToastAndroid } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import { Overlay, ListItem } from 'react-native-elements';
import User from '../../../../DataStorage/User';
import Modal from './modal';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Config from '../../../../config/config';
import styles from '../../../../config/styles';

export default class UpdateProfileModal extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '', 
            last_name: '',
            isVisible: false,
            loader: false
        }
    }

    componentDidMount() {
        this.setState({ 
            first_name: User.get().first_name,
            last_name: User.get().last_name,
            token: User.get().login_auth
        })
    }
    
    doNothing() {}

    open() {
        this.toggleOverlay();
    }

    updateProfile() {

        if(this.state.first_name === '' || this.state.first_name === undefined || this.state.first_name === null) {
            Toast.show('First Name is Required');
        }

        this.setState({ loader: true });
        axios.put(Config[Config.env].RESTURL + "/user", {
            first_name: this.state.first_name,
            last_name: this.state.last_name
        }, {
            headers: { 'x-auth': this.state.token }
        }).then(function(response) {
            console.log(response.data);
            this.setState({ loader: false, isVisible: false });
            Toast.show('Profile Updated Successfully', Toast.LONG);
        }.bind(this)).catch(function(error) {
            console.log(error.response.data);
            this.setState({ loader: false });
            Toast.show('Updating Profile Failed. Try Again', Toast.LONG);
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
                    <Fragment>
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
                                    <Text style={[styles.warningHeaderSubTitle, {fontFamily: "Montserrat-Medium"}]}>Edit Profile Details</Text>
                                    <TextInput
                                        style={styles.formTextInputBordered}
                                        allowFontScaling={true}
                                        placeholder="First Name"
                                        value={this.state.first_name}
                                        onChangeText={(text) => this.setState({first_name: text})}
                                    />
                                    <TextInput
                                        style={styles.formTextInputBordered}
                                        allowFontScaling={true}
                                        placeholder="Last Name"
                                        value={this.state.last_name}
                                        onChangeText={(text) => this.setState({last_name: text})}
                                    />
                                    <TouchableOpacity style={styles.defaultBtn}
                                        activeOpacity={0.5}
                                        onPress={() => this.updateProfile()}
                                    >
                                        <Text style={styles.defaultBtnText}
                                            suppressHighlighting={true}
                                        >
                                            Update Profile
                                        </Text>
                                    </TouchableOpacity >
                                    <TouchableOpacity style={[styles.defaultBtn, { backgroundColor: '#a13c2f'}]}
                                        activeOpacity={0.5}
                                        onPress={() => this.toggleOverlay()}
                                    >
                                        <Text style={styles.defaultBtnText} suppressHighlighting={true}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Fragment>
                        </Overlay>
                    </Fragment>
				)}
            </Fragment>
        )
    }
}