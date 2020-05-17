import React, { Component, Fragment } from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import StaticPage from '../StaticPage';
import SizeCalculator from '../../../../Service/SizeCalc';
import Styles from '../../../../config/styles';

export default class Calc1Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            solidSG: 0,
            mediumSG: 0,
            solids_v_v: 0,
            calculatedSlurrySG: '0',
            calculatedSolids_w_w: '0',

            slurryFlow: null,
            calculatedDryTonnage: '0',

            dryTonnage: null,
            calculatedSlurryFlow: '0'
        }
    }

    calculate() {
        //Calculate %Solids (w/w).
        /**
         * Forumlae:
         *        (solids_v_v*solidSG)/(solids_v_v*solidSG+(1-solids_v_v)*mediumSG)
         */
        let solidSG = this.state.solidSG;
        let solids_v_v = (this.state.solids_v_v/100);
        let mediumSG = this.state.mediumSG;

        let calculatedSolids_w_w = ((((solids_v_v*solidSG)/(solids_v_v*solidSG+(1-solids_v_v)*mediumSG))*100).toFixed(4));
        
        /**
         * Formulae:
         *      1/(calculatedSolids_w_w/solidSG+(1-calculatedSolids_w_w)/mediumSG)
         */
        let calculatedSolids_w_w_percent = (calculatedSolids_w_w/100);
        let calculatedSlurrySG = (1/(calculatedSolids_w_w_percent/solidSG+(1-calculatedSolids_w_w_percent)/mediumSG)).toFixed(4)

        this.setState({calculatedSolids_w_w: calculatedSolids_w_w, calculatedSlurrySG: calculatedSlurrySG});

        if (this.state.slurryFlow) {
            /**
             * Formulae:
             *      calculatedDryTonnage = calculatedSolids_w_w_percent*calculatedSlurrySG*this.state.slurryFlow
             */
            let calculatedDryTonnage = (calculatedSolids_w_w_percent*calculatedSlurrySG*this.state.slurryFlow).toFixed(4)
            this.setState({calculatedDryTonnage:calculatedDryTonnage});
        }

        if (this.state.dryTonnage) {
            /**
             * Formulae:
             *      calculatedSlurryFlow = this.state.dryTonnage/calculatedSolids_w_w_percent/calculatedSlurrySG
             */
            let calculatedSlurryFlow = (this.state.dryTonnage/calculatedSolids_w_w_percent/calculatedSlurrySG).toFixed(4)
            
            this.setState({calculatedSlurryFlow: calculatedSlurryFlow});
        }
    }
    
    render() {
        return ( 
            <Fragment>
                <StaticPage title={'Calculator 1'}  onBack={() => this.props.navigation.goBack()} style={{
                    paddingBottom: SizeCalculator.height(80)
                }}>
                    <Text style={[Styles.warningHeaderSubTitle, {fontFamily: 'Montserrat-Medium'}]}>
                        Convert known Slurry % Solids (v/v) to a Slurry SG and % Solids (w/w).
                    </Text>
                    <Text style={[Styles.warningHeaderSubTitle, {color: '#000'}]}>
                        Based on known Solids SG and Medium SG (almost always water, at a value of 1). Then convert flow to tonnage or vice versa.
                    </Text>
                    <View style={{
                        position: 'relative',
                        width: '100%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        padding: SizeCalculator.fontSize(10)
                    }}>
                        <Fragment>
                            <Text style={[Styles.warningHeaderSubTitle, {
                                    fontFamily: 'Montserrat-Medium',
                                    fontSize: SizeCalculator.fontSize(20),
                                    color: '#fff',
                                    backgroundColor: '#002776',
                                    padding: SizeCalculator.fontSize(5)
                                }]}>
                                Slurry Density Calculator
                            </Text>

                            <Text style={Styles.formElementText}>Solid SG</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="Solids SG" style={[Styles.formTextInputBordered, {
                                        flex: 8
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({solidSG: text})}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>t/m3</Text>
                            </View>

                            <Text style={Styles.formElementText}>Medium SG (i.e. Water)</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="Medium SG (i.e. Water)" style={[Styles.formTextInputBordered, {
                                        flex: 8
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({mediumSG: text})}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>t/m3</Text>
                            </View>

                            <Text style={Styles.formElementText}>% Solids (v/v)</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="% Solids (v/v)" style={[Styles.formTextInputBordered, {
                                        flex: 8
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({solids_v_v: text})}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>%</Text>
                            </View>

                            <Text style={Styles.formElementText}>% Solids (w/w)</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="% Solids (w/w)" style={[Styles.formTextInputBordered, {
                                        flex: 8,
                                        backgroundColor: '#A4AEB5',
                                        paddingHorizontal: SizeCalculator.width(8),
                                        color: '#fff'
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    value={this.state.calculatedSolids_w_w}
                                    pointerEvents='none'
                                    onFocus={() => {return false}}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>%</Text>
                            </View>

                            <Text style={Styles.formElementText}>Slurry SG</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="Slurry SG" style={[Styles.formTextInputBordered, {
                                        flex: 8,
                                        backgroundColor: '#A4AEB5',
                                        paddingHorizontal: SizeCalculator.width(8),
                                        color: '#fff'
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    pointerEvents='none'
                                    onFocus={() => {return false}}
                                    value={this.state.calculatedSlurrySG}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>t/m3</Text>
                            </View>
                            
                            <Text style={[Styles.warningHeaderSubTitle, {
                                    fontFamily: 'Montserrat-Medium',
                                    fontSize: SizeCalculator.fontSize(20),
                                    color: '#fff',
                                    backgroundColor: '#002776',
                                    padding: SizeCalculator.fontSize(5)
                                }]}>
                                Flow to Tonnage (Throughput)
                            </Text>

                            <Text style={Styles.formElementText}>Slurry Flow</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="Slurry Flow" style={[Styles.formTextInputBordered, {
                                        flex: 8,
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({slurryFlow: text})}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>m3/h</Text>
                            </View>

                            <Text style={Styles.formElementText}>Dry Tonnage</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="Dry Tonnage" style={[Styles.formTextInputBordered, {
                                        flex: 8,
                                        backgroundColor: '#A4AEB5',
                                        paddingHorizontal: SizeCalculator.width(8),
                                        color: '#fff'
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    pointerEvents='none'
                                    onFocus={() => {return false}}
                                    value={this.state.calculatedDryTonnage}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>t/h</Text>
                            </View>

                            <Text style={[Styles.warningHeaderSubTitle, {
                                    fontFamily: 'Montserrat-Medium',
                                    fontSize: SizeCalculator.fontSize(20),
                                    color: '#fff',
                                    backgroundColor: '#002776',
                                    padding: SizeCalculator.fontSize(5)
                                }]}>
                                Tonnage (Throughput) to Flow
                            </Text>

                            <Text style={Styles.formElementText}>Dry Tonnage</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <TextInput placeholder="Dry Tonnage" style={[Styles.formTextInputBordered, {
                                        flex: 8,
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({dryTonnage: text})}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>t/h</Text>
                            </View>

                            <Text style={Styles.formElementText}>Slurry Flow</Text>
                            <View style={{
                                flexDirection: 'row',
                                paddingBottom: SizeCalculator.height(70)
                            }}>
                                <TextInput placeholder="Slurry Flow" style={[Styles.formTextInputBordered, {
                                        flex: 8,
                                        backgroundColor: '#A4AEB5',
                                        paddingHorizontal: SizeCalculator.width(8),
                                        color: '#fff'
                                    }]} allowFontScaling={true}
                                    keyboardType='numeric'
                                    pointerEvents='none'
                                    onFocus={() => {return false}}
                                    value={this.state.calculatedSlurryFlow}
                                />
                                <Text style={[Styles.formElementText, {
                                    flex: 2, textAlignVertical: 'center'
                                }]}>m3/h</Text>
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