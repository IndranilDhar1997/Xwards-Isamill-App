import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import {ListItem} from 'react-native-elements';
import StaticPage from '../StaticPage';
import SizeCalculator from '../../../../Service/SizeCalc';
import Styles from '../../../../config/styles';
import DashboardButton from '../../Components/DashboardButton';

export default class CalculatorScreen extends Component {
    
    render() {
        return ( 
            <Fragment>
                <StaticPage title={'Calculator'}  onBack={() => this.props.navigation.goBack()}>
                    <View style={{alignItems: 'center'}}> 
                        <View style={{
                            width: '100%'
                        }}>
                            <ListItem
                                title={"Calculator 1"}
                                subtitle={"Convert known Slurry % Solids (v/v) to a Slurry SG and % Solids (w/w)."}
                                onPress={() => this.props.navigation.navigate("Calc1Screen")}
                                bottomDivider={true}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: SizeCalculator.fontSize(18),
                                }}
                                subtitleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                }}
                            />
                            <ListItem
                                title={"Calculator 2"}
                                subtitle={"Convert known Slurry % Solids (w/w) to a Slurry SG and % Solids (v/v)."}
                                bottomDivider={true}
                                onPress={() => this.props.navigation.navigate("Calc2Screen")}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: SizeCalculator.fontSize(18),
                                }}
                                subtitleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                }}
                            />
                            <ListItem
                                title={"Calculator 3"}
                                subtitle={"Convert known Slurry SG to a Slurry % Solids (w/w) and % Solids (v/v)."}
                                onPress={() => this.props.navigation.navigate("Calc3Screen")}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: SizeCalculator.fontSize(18),
                                }}
                                bottomDivider={true}
                                subtitleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                }}
                            />
                            <ListItem
                                title={"Mineral Composition Calculator"}
                                subtitle={"Mineral Composition to Solids SG"}
                                onPress={() => this.props.navigation.navigate("MineralCalc")}
                                titleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                    fontSize: SizeCalculator.fontSize(18),
                                }}
                                bottomDivider={true}
                                subtitleStyle={{
                                    fontFamily: "Montserrat-Regular",
                                }}
                            />
                        </View>
                    </View>
                </StaticPage>
            </Fragment>
        );
    }
}
 
;