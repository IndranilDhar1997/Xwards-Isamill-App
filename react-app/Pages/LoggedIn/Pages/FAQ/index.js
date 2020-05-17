import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import CONTENTS from './contents';
import QATopic from './QA-Topic';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements'

export default class FAQScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: CONTENTS
        }
    }
    
    render() { 
        return ( 
            <Fragment>
                <StatusBar barStyle="light-content" backgroundColor="#324c87" />
                <View style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor: 'white'
                }}>
                    <View style={{
                        height: sizeCalculator.height(156),
                        width: '100%',
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
                            zIndex: 120,
                            top: 0,
                            left: 0,
                            width: '30%',
                            height: sizeCalculator.height(58),
                            paddingHorizontal: sizeCalculator.width(15),
                        }} onPress={() => this.props.navigation.goBack()}>
                            <Icon
                                name='chevron-left'
                                color='#fff'
                                size={35}
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
                                fontFamily: "Montserrat-Regular"
                            }}>FAQ</Text>
                        </View>
                    </View>
                    <ScrollView style={{
                        padding: sizeCalculator.height(8),
                        height: '100%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: sizeCalculator.height(-98),
                        zIndex: 300
                    }}>
                        <View style={{
                            position: 'relative',
                            width: '100%',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            padding: sizeCalculator.fontSize(3),
                            paddingBottom: sizeCalculator.height(70)
                        }}>
                        {this.state.contents.map((content, key) => {
                            return (
                                <QATopic key={key} title={content.title} content={content.contents} />
                            )
                        })}
                        </View>
                    </ScrollView>
                </View>
            </Fragment>
        );
    }
}
 
;