import React, { Component, Fragment } from "react"
import {View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, SearchBar  } from 'react-native-elements';
import axios from 'axios';
import Config from '../../../../config/config';
import Toast from 'react-native-simple-toast';

export default class SupportHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            offset: 0
        }
    }

    onSearchText(text) {
        this.setState({searchText: text});
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }
        this.searchTimeout = setTimeout(function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
            this.search();
        }.bind(this), 500);
    }

    search(offset) {
        offset = offset || 0;
        if (this.state.searchText.length < 3) {
            return false;
        }
        let token = User.get().login_auth;
        this.props.onSearchStart();
        
        axios.get(Config[Config.env].RESTURL + '/topic/search-topic/'+this.state.searchText+'?limit=20&offset='+offset, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            this.props.onSearchEnd();
            this.props.onSearchContent(response.data);
        }.bind(this)).catch(function(error) {
            console.log(error.response.data);
            this.setState({ loader: false });
            Toast.show('Error while fetching');
        }.bind(this));
    }

    render() {
        return (
            <Fragment>
                <StatusBar barStyle="light-content" backgroundColor="#324c87" />
                <View style={{
                    width: '100%',
                    height: sizeCalculator.height(58),
                    backgroundColor: 'white',
                    position: 'relative',
                    flexDirection: 'row',
                    zIndex: 100
                }}>
                    <LinearGradient 
                        start={{x: 0.5, y: 0}} 
                        end={{x: 1, y: 0.9}}
                        colors={['#455f9c', '#263e7a']} 
                        useAngle={true}
                        angle={120}
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            zIndex: -10
                        }}
                    ></LinearGradient>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: 0,
                        left: 0,
                        width: '30%',
                        height: '100%',
                        paddingHorizontal: sizeCalculator.width(15)
                    }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name='chevron-left'
                            color='#fff'
                            size={sizeCalculator.fontSize(35)}
                            iconStyle={{alignSelf: 'flex-start', height: '100%', textAlignVertical: 'center'}} />
                    </TouchableOpacity>
                    <View style={{
                        height: sizeCalculator.height(58),
                        paddingHorizontal: sizeCalculator.width(25),
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '100%'
                    }}>
                        <Text style={{
                            color: 'white',
                            width: '100%',
                            height: '100%',
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontSize: sizeCalculator.fontSize(23),
                            fontFamily: "Montserrat-Regular",
                        }}>Support</Text>
                    </View>
                </View>
                <SearchBar
                    placeholder="Search Topics"
                    style={{
                        width: '100%',
                        height: sizeCalculator.height(58),
                        borderWidth: 0
                    }}
                    containerStyle={{
                        backgroundColor: '#324c87',
                        borderWidth: 0,
                        borderColor: '#fff',
                        shadowOpacity: 0,
                        shadowColor: 'white', //no effect
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent'
                    }}
                    inputContainerStyle={{
                        backgroundColor: 'white',
                        borderRadius: sizeCalculator.height(29)
                    }}
                    onChangeText={(text) => this.onSearchText(text)}
                    value={this.state.searchText}
                />
            </Fragment>
        );
    }
}