import 'react-native-gesture-handler';
import React, {Component, Fragment} from 'react';
import { Text, Dimensions, View, Button, PermissionsAndroid, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import Before Login Pages
import LoginScreen from './Pages/NotLoggedIn/LoginScreen';
import ForgotPassword from './Pages/NotLoggedIn/ForgotPassword';
import SignupScreen from './Pages/NotLoggedIn/SignupScreen';
import VerifyOTP from './Pages/NotLoggedIn/VerifyOTP';
import ChangePassword from './Pages/NotLoggedIn/ChangePassword';
import VerifyUser from './Pages/NotLoggedIn/VerifyUser';

//Import After Login Pages
import Dashboard from './Pages/LoggedIn/Dashboard';
import HomeScreen from './Pages/LoggedIn/Pages/Home';
import DisclaimerScreen from './Pages/LoggedIn/Pages/Disclaimer';
import AboutScreen from './Pages/LoggedIn/Pages/AboutUs';
import TroubleshootingScreen from './Pages/LoggedIn/Pages/Troubleshooting';
import SubTopicPageScreen from './Pages/LoggedIn/Pages/Troubleshooting/subTopicPage';
import FAQScreen from './Pages/LoggedIn/Pages/FAQ';
import SendFeedback from './Pages/LoggedIn/Pages/Feedback';
import UserChange from './Pages/LoggedIn/Pages/UserChange';
import CalculatorScreen from './Pages/LoggedIn/Pages/Calculations';
import Calc1Screen from './Pages/LoggedIn/Pages/Calculations/calc1';
import Calc2Screen from './Pages/LoggedIn/Pages/Calculations/calc2';
import Calc3Screen from './Pages/LoggedIn/Pages/Calculations/calc3';
import MineralCalc from './Pages/LoggedIn/Pages/Calculations/mineralCalc';
import SupportScreen from './Pages/LoggedIn/Pages/Support';
import TopicPageScreen from './Pages/LoggedIn/Pages/Support/topicView';

//Service
import LocalStorage from './Service/LocalStorage';
import sizeCalculator from './Service/SizeCalc';

//User Data Store
import User from './DataStorage/User';

const Stack = createStackNavigator();

export default class Root extends Component {	

    constructor(props) {
        super(props);
        this.state = {
            appReady: false,
            authToken: null
        };
        LocalStorage.delete("FORGOTEMAIL");
        sizeCalculator.init(Dimensions.get('window').width, Dimensions.get('window').height);
    }
    
    componentDidMount() {
        this.resolvePermissions().then(function() {
            let that = this;
            that.delayAppOpen();
            User.load().then(function(user) {
                that.setState({
                    authToken: User.getAuth()
                });
            }.bind(that)).catch(function(e) {
                
            });
        }.bind(this)).catch(e => {
            ToastAndroid.show('Permissions Needed', ToastAndroid.SHORT);
        });
    }

    delayAppOpen() {
        setTimeout(function() {
            this.setState({ appReady: true });
        }.bind(this), 3);
    }

    onLogin(user) {
        //Login Complete.
        User.set(user);
        this.setState({authToken: user.login_auth});
    }

    onLogout() {
        User.reset();
        this.setState({authToken: null});
    }

    resolvePermissions() {
        return new Promise(function (resolve, reject) {
            var that = this;
            PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE').then(async function (bool) {
                
                if (!bool) {
                    await that.askPermission('android.permission.READ_EXTERNAL_STORAGE');
                }
                PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE').then(async function (bool) {
                    
                    if (!bool) {
                        await that.askPermission('android.permission.WRITE_EXTERNAL_STORAGE');
                    }
                    return resolve();
                });
            }.bind(that));
        }.bind(this));
    }

    async askPermission(permissionName) {
        var granted = await PermissionsAndroid.request(permissionName, {
            title: 'Need Permission',
            message: 'The App needs to access Read and Write to the local file system for saving information',
            buttonPositive: 'Grant Access'
        });
        
        if (!granted) {
            await askPermission(permissionName);
        }
    }

    render() {
        let toRender = <Fragment></Fragment>
        if (this.state.authToken) {
            toRender =  <NavigationContainer>
                            <Stack.Navigator
                                initialRouteName="Dashboard"
                                screenOptions={{ gestureEnabled: false }}
                            >
                                <Stack.Screen
                                    name="Dashboard"
                                    component={Dashboard}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                    initialParams={{onLogout: () => this.onLogout()}}
                                />
                                <Stack.Screen
                                    name="HomeScreen"
                                    component={HomeScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="AboutScreen"
                                    component={AboutScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="DisclaimerScreen"
                                    component={DisclaimerScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="TroubleshootingScreen"
                                    component={TroubleshootingScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="FAQScreen"
                                    component={FAQScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="SendFeedback"
                                    component={SendFeedback}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="UserChange"
                                    component={UserChange}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="CalculatorScreen"
                                    component={CalculatorScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="Calc1Screen"
                                    component={Calc1Screen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="Calc2Screen"
                                    component={Calc2Screen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="Calc3Screen"
                                    component={Calc3Screen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="MineralCalc"
                                    component={MineralCalc}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="SupportScreen"
                                    component={SupportScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="TopicPageScreen"
                                    component={TopicPageScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                                <Stack.Screen
                                    name="SubTopicPageScreen"
                                    component={SubTopicPageScreen}
                                    options={{title: 'Isa-Mill', headerShown: false}}
                                />
                            </Stack.Navigator> 
                        </NavigationContainer>
        } else {
            toRender =  <NavigationContainer>
                            <Stack.Navigator
                                initialRouteName="LoginScreen"
                                screenOptions={{ gestureEnabled: false }}
                            >
                                <Stack.Screen
                                    name="LoginScreen"
                                    component={LoginScreen}
                                    options={{ title: 'Login', headerShown: false }}
                                    initialParams={{onLogin: (auth) => this.onLogin(auth)}}
                                />
                                <Stack.Screen
                                    name="ForgotPassword"
                                    component={ForgotPassword}
                                    options={{ title: 'ForgotPassword', headerShown: false }}
                                />
                                <Stack.Screen
                                    name="SignupScreen"
                                    component={SignupScreen}
                                    options={{ title: 'SignupScreen', headerShown: false }}
                                />
                                <Stack.Screen 
                                    name="VerifyUser"
                                    component={VerifyUser}
                                    options={{ title: 'VerifyUser', headerShown: false }}
                                />
                                <Stack.Screen
                                    name="VerifyOTP"
                                    component={VerifyOTP}
                                    options={{ title: 'VerifyOTP', headerShown: false }}
                                />
                                <Stack.Screen
                                    name="ChangePassword"
                                    component={ChangePassword}
                                    options={{ title: 'ChangePassword', headerShown: false }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
        }
		return (
            <Fragment>
            {this.state.appReady && 
                toRender
            }
            {(!this.state.appReady) && (
                <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>Please wait while we load the contents.</Text>
                </View>
            )}
            </Fragment>
		);
    }
}