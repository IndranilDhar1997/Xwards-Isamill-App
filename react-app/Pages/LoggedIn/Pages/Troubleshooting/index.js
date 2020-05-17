import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, ScrollView, TouchableOpacity, Platform, BackHandler} from 'react-native';
import SizeCalculator from '../../../../Service/SizeCalc';
import {ListItem} from 'react-native-elements';
import StaticPage from '../StaticPage';
import Contents from './contents';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import LocalStorage from '../../../../Service/LocalStorage';

import { Icon } from 'react-native-elements'

export default class TroubleshootingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: Contents,
            title: 'Troubleshooting',
            level: 0,
        }
    }

    componentDidMount() {
        if (Platform.OS === "android") {
        }
    }

    render() { 
        return ( 
            <Fragment>
                <StaticPage title={this.state.title} onBack={() => this.props.navigation.goBack()}>
                    {this.state.contents.map((content, key) => {
                        return (
                            <ListItem
                                key={key}
                                title={content.title}
                                // subtitle={content.subTitle}
                                onPress={() => this.props.navigation.navigate('SubTopicPageScreen', {contents: content})}
                                bottomDivider={true}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: SizeCalculator.fontSize(18),
                                }}
                                subtitleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                }}
                            />
                        )
                    })}
                </StaticPage>
            </Fragment>
        );
    }
}
 
;