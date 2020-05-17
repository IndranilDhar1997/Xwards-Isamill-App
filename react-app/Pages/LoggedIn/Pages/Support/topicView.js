import React, { Component, Fragment } from 'react';
import {View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import { Icon, ListItem  } from 'react-native-elements'
import SupportHeader from './Header';
import styles from '../../../../config/styles';
import StaticPage from '../StaticPage';
import axios from 'axios';
import Config from '../../../../config/config';
import Toast from 'react-native-simple-toast';

export default class TopicPageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.route.params.content,
            comments: [],
            commentText: '',
            loader: false
        }
    }

    componentDidMount() {
        console.log(this.state.content);
        this.fetchDetails();
    }

    fetchDetails() {
        let token = User.get().login_auth;

        axios.get(Config[Config.env].RESTURL + '/topic/'+this.state.content.id, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            console.log(response.data);
            this.setState({comments: response.data.TopicsComment})
        }.bind(this)).catch(function(error) {
            console.log(error.response.data);
            this.setState({ loader: false });
            Toast.show('Error while fetching details');
        }.bind(this));
    }

    postComment() {
        this.setState({ loader: true });
        let token = User.get().login_auth;
        axios.post(Config[Config.env].RESTURL + '/topic/comment', {
            topicId: this.state.content.id,
            comments: this.state.commentText
        }, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            this.setState({loader: false, commentText: ''});
            this.fetchDetails();
        }.bind(this)).catch(function(error) {
			let err = Object.assign({}, error);
			console.log(err);
			this.setState({ loader: false });
			Toast.show('Error while posting comment. Please try again.');
        }.bind(this))
    }

    render() {
        return (
            <Fragment>
                <StaticPage title={this.state.content.topic_name.substring(0,20)+'...'} onBack={() => this.props.navigation.goBack()}>
                    <Fragment>
                        <Text style={{
                            fontFamily: "Montserrat-Medium",
                            fontSize: sizeCalculator.fontSize(22),
                            color: '#002776'
                        }}>{this.state.content.topic_name}</Text>
                        <Text style={{
                            fontFamily: "Montserrat-Regular",
                            fontSize: sizeCalculator.fontSize(19),
                            color: '#222',
                            marginTop: sizeCalculator.height(10)
                        }}>{this.state.content.details}</Text>
                        <Text style={{
                            fontSize: sizeCalculator.fontSize(13),
                            marginTop: sizeCalculator.height(10),
                            color: '#222',
                            textAlign: 'right'
                        }}>
                            Created On {(new Date(this.state.content.created_at)).toDateString()}
                        </Text>
                        <Text style={{
                            fontFamily: "Montserrat-Regular",
                            fontSize: sizeCalculator.fontSize(16),
                            color: '#002776',
                            textAlign: 'right',
                            marginBottom: sizeCalculator.height(20),
                        }}>
                            {this.state.content.UserOfTopic.first_name+' '+this.state.content.UserOfTopic.last_name}
                        </Text>

                        <Text style={{
                            fontFamily: "Montserrat-Regular",
                            fontSize: sizeCalculator.fontSize(16),
                            color: '#002776',
                            marginBottom: sizeCalculator.height(8),
                        }}>
                            Comments:
                        </Text>
                        
                        {(this.state.loader) && (
                            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 18}}>Loading...</Text>
                            </View>
                        )}
                        {(!this.state.loader) && (
                            <Fragment>
                                {this.state.comments.map((comment, key) => {
                                    return (
                                        <View key={key} style={{
                                            backgroundColor: '#fff7f0',
                                            padding: sizeCalculator.fontSize(5),
                                            borderBottomColor: '#CAC0B6',
                                            borderBottomWidth: sizeCalculator.fontSize(1),
                                            marginBottom: sizeCalculator.height(15)
                                        }}>
                                            <Text style={{
                                                fontFamily: "Montserrat-Regular",
                                                fontSize: sizeCalculator.fontSize(17),
                                                color: '#000',
                                                paddingLeft: sizeCalculator.width(40),
                                            }}>{comment.comments}
                                            </Text>
                                            <Text style={{
                                                fontSize: sizeCalculator.fontSize(13),
                                                marginTop: sizeCalculator.height(10),
                                                color: '#222',
                                                textAlign: 'right'
                                            }}>
                                                Posted On {(new Date(comment.created_at)).toDateString()}
                                            </Text>
                                            <Text style={{
                                                fontFamily: "Montserrat-Regular",
                                                fontSize: sizeCalculator.fontSize(16),
                                                color: '#002776',
                                                textAlign: 'right',
                                            }}>
                                                {comment.UserOfTopicComment.first_name+' '+comment.UserOfTopicComment.last_name}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </Fragment>
                        )}

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: sizeCalculator.height(15),
                            backgroundColor: '#eee',
                            marginTop: sizeCalculator.height(5)
                        }}>
                            <View style={{
                                flex: 8,
                                justifyContent: 'center',
                                paddingHorizontal: sizeCalculator.width(8)
                            }}>
                                <TextInput style={[styles.formTextInput, {
                                        borderWidth: 0.3,
                                        textAlignVertical: 'top',
                                        textAlign: 'left'
                                    }]} 
                                    placeholder='Add your comment here' 
                                    multiline={true}
                                    numberOfLines={1}
                                    onChangeText={(text) => this.setState({commentText: text})}
                                />
                            </View>
                            <View style={{
                                flex: 2,
                                paddingHorizontal: sizeCalculator.width(8)
                            }}>
                                <TouchableOpacity style={styles.defaultBtn}
                                    onPress={() => this.postComment()}>
                                    <Text style={[styles.defaultBtnText, {
                                        paddingVertical: sizeCalculator.height(8)
                                    }]}>Post</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Fragment>
                </StaticPage>
            </Fragment>
        )
    }
}