import React, { Component, Fragment } from 'react';
import {Text, TouchableOpacity, ScrollView} from 'react-native';
import {Overlay} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import ImageHeightAuto from '../../Components/ImageHeightAuto';

import sizeCalculator from '../../../../Service/SizeCalc';

export default class QA_Topic extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    toggleOverlay() {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    
    render() {         
        return ( 
            <Fragment>
                <TouchableOpacity
                    style={{
                        borderRadius: sizeCalculator.width(8),
                        paddingVertical: sizeCalculator.height(5), 
                        paddingHorizontal: sizeCalculator.width(8),
                        backgroundColor: '#f5f5f5',//'#f7f7f7',
                        shadowColor: '#dbdbdb',
                        shadowOffset: { width: 0, height: sizeCalculator.height(5) },
                        shadowOpacity: 0.7,
                        shadowRadius: sizeCalculator.height(10),
                        elevation: sizeCalculator.height(5),
                        marginBottom: sizeCalculator.height(8),
                    }}
                    activeOpacity={0.8}
                    onPress={() => this.toggleOverlay()}
                >
                    <Text style={{
                        width: '100%',
                        fontSize: sizeCalculator.fontSize(19),
                        fontWeight: '600',
                        paddingHorizontal: sizeCalculator.height(8),
                        fontFamily: "Montserrat-Regular",
                        paddingVertical: sizeCalculator.height(5)
                    }}>
                        {this.props.title}
                    </Text>
                    <Overlay 
                        onBackdropPress={() => this.toggleOverlay()} 
                        isVisible={this.state.isVisible}
                        borderRadius={sizeCalculator.width(10)}
                        overlayStyle={{
                            minHeight: '80%',
                            width: '90%'
                        }}
                    >
                        <ScrollView style={{
                            flex: 1,
                            backgroundColor: 'white'
                        }}>
                            <Text style={{
                                width: '100%',
                                fontSize: sizeCalculator.fontSize(18),
                                fontWeight: '600',
                                paddingHorizontal: sizeCalculator.height(8),
                                fontFamily: "Montserrat-Medium",
                            }}>
                                {this.props.title}
                            </Text>
                            {this.props.content.map((eachline, linekey) => {
                                return Object.keys(eachline).map((key, keyline) => {
                                    switch(key) {
                                        case 'text': 
                                            return <Text key={linekey+'_'+keyline} style={{
                                                width: '100%',
                                                marginTop: sizeCalculator.height(10),
                                                fontSize: sizeCalculator.fontSize(18),
                                                paddingHorizontal: sizeCalculator.height(8),
                                                fontFamily: "Montserrat-Regular",
                                                color: '#253f78'
                                            }}>
                                                {eachline[key]}
                                            </Text>
                                            break;
                                        case 'img':
                                            return <ImageHeightAuto key={linekey+'_'+keyline} style={{
                                                width:'100%',
                                                resizeMode: 'contain'
                                            }} source={eachline[key]} />
                                    }
                                });
                            })}
                        </ScrollView>
                    </Overlay>
                </TouchableOpacity>
            </Fragment>
        );
    }
}
 
;