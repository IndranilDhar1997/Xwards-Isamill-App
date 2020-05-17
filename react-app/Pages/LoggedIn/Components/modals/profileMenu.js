import React, { Fragment } from 'react';
import {Linking} from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';

import { Overlay, ListItem } from 'react-native-elements';

import User from '../../../../DataStorage/User';
import ChangePasswordModal from './changePassword';
import UpdateProfileModal from './updateProfile';
import Modal from './modal';

export default class ProfileMenuModal extends Modal {
    constructor(props) {
        super(props);
    }

    openChangePassword() {
        this.toggleOverlay();
        this.changePasswordRef.open();
    }

    openProfileModal() {
        this.toggleOverlay();
        this.updateProfileRef.open();
    }

    navigate(page) {
        this.toggleOverlay();
        this.props.navigation.navigate(page);
    }

    openIMISLink() {
        Linking.canOpenURL('https://app.form.com/portal/#login').then(supported => {
            if (supported) {
              Linking.openURL('https://app.form.com/portal/#login');
            } else {
              console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    }
    
    render() {
        return (
            <Fragment>
                <ChangePasswordModal ref={(ref) => this.changePasswordRef=ref} />
                <UpdateProfileModal ref={(ref) => this.updateProfileRef=ref} />
                <Overlay 
                    onBackdropPress={() => this.toggleOverlay()} 
                    isVisible={this.state.isVisible}
                    overlayStyle={{
                        padding: sizeCalculator.fontSize(8),
                        borderRadius: sizeCalculator.width(8),
                    }}
                    height="auto"
                >
                    <Fragment>
                        <ListItem
                            title={"Update Profile"}
                            bottomDivider={true}
                            onPress={() => this.openProfileModal()}
                            titleStyle={{
                                fontFamily: "Montserrat-Regular",
                                fontSize: sizeCalculator.fontSize(18),
                            }}
                            containerStyle={{
                                paddingHorizontal: sizeCalculator.width(10),
                                paddingVertical: sizeCalculator.height(10)
                            }}
                        />
                        <ListItem
                            title={"Change Password"}
                            onPress={() => this.openChangePassword()}
                            titleStyle={{
                                fontFamily: "Montserrat-Regular",
                                fontSize: sizeCalculator.fontSize(18),
                            }}
                            containerStyle={{
                                paddingHorizontal: sizeCalculator.width(12),
                                paddingVertical: sizeCalculator.height(12)
                            }}
                        />
                        <ListItem
                            title={"IMIS Portal"}
                            onPress={() => this.openIMISLink()}
                            titleStyle={{
                                fontFamily: "Montserrat-Regular",
                                fontSize: sizeCalculator.fontSize(18),
                            }}
                            containerStyle={{
                                paddingHorizontal: sizeCalculator.width(12),
                                paddingVertical: sizeCalculator.height(12)
                            }}
                        />
                        {User.get().user_type === 'ADMIN' && 
                            <ListItem
                                title={"Manage Customers"}
                                onPress={() => this.navigate('UserChange')}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: sizeCalculator.fontSize(18),
                                }}
                                containerStyle={{
                                    paddingHorizontal: sizeCalculator.width(12),
                                    paddingVertical: sizeCalculator.height(12)
                                }}
                            />
                        }
                        <ListItem
                            title={"Logout"}
                            titleStyle={{
                                fontFamily: "Montserrat-Regular",
                                fontSize: sizeCalculator.fontSize(18),
                            }}
                            containerStyle={{
                                paddingHorizontal: sizeCalculator.width(12),
                                paddingVertical: sizeCalculator.height(12)
                            }}
                            onPress={() => this.props.logout()}
                        />
                    </Fragment>
                </Overlay>
            </Fragment>
        )
    }
}