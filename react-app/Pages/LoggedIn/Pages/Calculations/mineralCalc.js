import React, { Component, Fragment } from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import StaticPage from '../StaticPage';
import SizeCalculator from '../../../../Service/SizeCalc';
import Styles from '../../../../config/styles';
import { Overlay, ListItem } from 'react-native-elements';
import Toast from 'react-native-simple-toast';

import MineralData from '../../../../DataStorage/mineralData';

class MineralOverLay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            minerals: []
        }
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({minerals: MineralData});
        }.bind(this), 300);
    }

    toggleOverlay() {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    render() {
        return (
            <Overlay onBackdropPress={() => this.toggleOverlay()} 
                isVisible={this.state.isVisible}
                overlayStyle={{
                padding: SizeCalculator.fontSize(8),
                borderRadius: SizeCalculator.width(8),
                width: '90%',
                height: '90%'
            }} height="auto">
                <ScrollView style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}>
                        <ListItem
                            title={'Remove This'}
                            onPress={() => this.props.onRemove()}
                            titleStyle={{
                                fontFamily: "Montserrat-Regular",
                                fontSize: SizeCalculator.fontSize(18),
                                color: '#fff'
                            }}
                            containerStyle={{
                                backgroundColor: '#AC675E'
                            }}
                            bottomDivider={true}
                        />
                    {this.state.minerals.map((m, k) => {
                        return (
                            <ListItem
                                key={k}
                                title={m.name}
                                onPress={() => this.props.onSelect(m)}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: SizeCalculator.fontSize(18),
                                }}
                                bottomDivider={true}
                            />
                        )
                    })}
                </ScrollView>
            </Overlay>
        );
    }
}

class MineralRow extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            sg: '',
            massPercent: ''
        }
    }

    returnValue() {
        return {
            name: this.state.name,
            sg: this.state.sg,
            massPercent: this.state.massPercent
        }
    }

    onSelect(m) {
        this.overlayRef.toggleOverlay();
        this.setState({
            name: m.name,
            sg: (m.average/1000).toFixed(3)
        })
    }

    remove() {
        this.overlayRef.toggleOverlay();
        this.setState({
            name: null,
            sg: '',
            massPercent: ''
        });
    }
    
    render() {
        return (
            <Fragment>
                <MineralOverLay ref={(ref) => this.overlayRef=ref} onSelect={(m) => this.onSelect(m)} onRemove={() => this.remove()} />
                <View style={{flexDirection: 'row', width: '100%', marginTop: SizeCalculator.height(10), borderTopColor: '#f4f4f4', borderTopWidth: SizeCalculator.fontSize(1)}}>
                    <View style={{flex: 5}}>
                        <Text style={[Styles.formElementText, {
                            marginVertical: SizeCalculator.height(10),
                            paddingVertical: SizeCalculator.height(4.5)
                        }]} onPress={() => this.overlayRef.toggleOverlay()}>
                            {!this.state.name && 'Choose Mineral'}
                            {this.state.name}
                        </Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={[Styles.formElementText, {
                            marginVertical: SizeCalculator.height(10),
                            paddingVertical: SizeCalculator.height(4.5)}]}>
                            {this.state.sg}
                        </Text>
                    </View>
                    <View style={{flex: 4}}>
                        <TextInput placeholder="Mass" style={[Styles.formTextInputBordered]} allowFontScaling={true}
                            keyboardType='numeric' onChangeText={(text) => this.setState({massPercent: text})}
                        />
                    </View>
                </View>
            </Fragment>
        );
    }
}

export default class MineralCalc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minerals: [
                {ref: null},
                {ref: null},
                {ref: null}
            ],
            mineralCount: 4,
            solidsSG: '0',
            sumPercent: '0'
        }
    }

    calculate() {
        let sum = 0;
        let solidsSG = 0;
        for (let i=0;i<this.state.minerals.length; i++) {
            let ref = this.state.minerals[i].ref;
            let refVal = ref.returnValue();
            if (refVal.name) {
                sum = sum+parseInt(refVal.massPercent);
                solidsSG = solidsSG+((parseInt(refVal.massPercent)/100)*parseFloat(refVal.sg))
            }
        }
        console.log('solidsSG', solidsSG);
        if (sum > 100) {
            Toast.show('The mass percent cannot exceed 100%');
            return false;
        }
        this.setState({sumPercent: sum+'%', solidsSG: solidsSG.toFixed(3)+''})
    }

    addMineral() {
        let minerals = this.state.minerals;
        minerals.push({ref: null});
        this.setState({minerals: minerals});
    }
    
    render() {
        return ( 
            <Fragment>
                <StaticPage title={'Mineral Composition'}  onBack={() => this.props.navigation.goBack()} style={{
                    paddingBottom: SizeCalculator.height(80)
                }}>
                    <View style={{
                        position: 'relative',
                        width: '100%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        padding: SizeCalculator.fontSize(3),
                        paddingBottom: SizeCalculator.height(70)
                    }}>
                        <Fragment>
                            <TouchableOpacity style={[Styles.defaultBtn, {
                                width: '40%',
                                backgroundColor: '#007C92',
                                padding: 0
                            }]} onPress={() => this.addMineral()}>
                                <Text style={Styles.defaultBtnText}>Add Mineral</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', width: '100%'}}>
                                <View style={{flex: 5}}>
                                    <Text style={Styles.formElementText}>Mineral</Text>
                                </View>
                                <View style={{flex: 3}}>
                                    <Text style={Styles.formElementText}>SG</Text>
                                </View>
                                <View style={{flex: 4}}>
                                    <Text style={Styles.formElementText}>Mass %</Text>
                                </View>
                            </View>
                            {this.state.minerals.map((m,k) => {
                                return (<MineralRow key={k} ref={(ref) => m.ref=ref} />)
                            })}
                            <View style={{flexDirection: 'row', width: '100%'}}>
                                <View style={{flex: 8}}>
                                    <Text style={[Styles.formElementText, {
                                        width: '100%',
                                        textAlign: 'right',
                                        marginVertical: SizeCalculator.height(10),
                                        paddingVertical: SizeCalculator.height(4.5),
                                        paddingHorizontal: SizeCalculator.width(12)
                                    }]}>Sum</Text>
                                </View>
                                <View style={{flex: 4}}>
                                    <TextInput placeholder="Sum" style={[Styles.formTextInputBordered, {
                                            flex: 8,
                                            backgroundColor: '#A4AEB5',
                                            paddingHorizontal: SizeCalculator.width(8),
                                            color: '#fff'
                                        }]} allowFontScaling={true}
                                        keyboardType='numeric'
                                        pointerEvents='none'
                                        onFocus={() => {return false}}
                                        value={this.state.sumPercent}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', width: '100%'}}>
                                <View style={{flex: 8}}>
                                    <Text style={[Styles.formElementText, {
                                        width: '100%',
                                        textAlign: 'right',
                                        marginVertical: SizeCalculator.height(10),
                                        paddingVertical: SizeCalculator.height(4.5),
                                        paddingHorizontal: SizeCalculator.width(12)
                                    }]}>Solids SG</Text>
                                </View>
                                <View style={{flex: 4}}>
                                    <TextInput placeholder="Sum" style={[Styles.formTextInputBordered, {
                                            flex: 8,
                                            backgroundColor: '#A4AEB5',
                                            paddingHorizontal: SizeCalculator.width(8),
                                            color: '#fff'
                                        }]} allowFontScaling={true}
                                        keyboardType='numeric'
                                        pointerEvents='none'
                                        onFocus={() => {return false}}
                                        value={this.state.solidsSG}
                                    />
                                </View>
                            </View>
                        </Fragment>
                    </View>
                </StaticPage>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: SizeCalculator.height(50),
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={[Styles.defaultBtn, {
                            height: SizeCalculator.height(50),
                            margin: 0, borderRadius: 0
                        }]} onPress={() => this.calculate()}>
                        <Text style={Styles.defaultBtnText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
}