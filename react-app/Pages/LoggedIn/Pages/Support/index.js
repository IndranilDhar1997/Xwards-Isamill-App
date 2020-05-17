import React, { Component, Fragment  } from 'react';
import {View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import sizeCalculator from '../../../../Service/SizeCalc';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, ListItem  } from 'react-native-elements'
import SupportHeader from './Header';
import styles from '../../../../config/styles';
import Config from '../../../../config/config';
import axios from 'axios';
import AddTopicModal from './createFormOverlay';
import Toast from 'react-native-simple-toast';

export default class SupportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [], //contents to list here.
            offset: 0, //search offset
            loader: false, //for showing loader
            loadMore: true, //for showing load more button,
            searchedContent: false //if content which is coming is searched or default
        }
    }

    componentDidMount() {
        this.loadContents();
    }

    loadContents(offset) {
        offset = offset || 0;
        let token = User.get().login_auth;
        this.setState({loader: true});

        axios.get(Config[Config.env].RESTURL + '/topic?limit=20&offset='+offset, {
            headers : { 'x-auth': token }
        }).then(function(response) {
            let loadMore = true;
            let thisContent = this.state.contents;
            thisContent = thisContent.concat(response.data);
            if (response.data.length < 20) {
                loadMore=false;
            }
            this.setState({loadMore: loadMore, loader: false, searchedContent: false, contents: response.data});
        }.bind(this)).catch(function(error) {
            console.log(error.response.data);
            this.setState({ loader: false });
            Toast.show('Unable to fetch topics. Please check your internet connection.', Toast.LONG);
        }.bind(this));
    }

    onSearchStart() {
        this.setState({loader: true, offset: 0});
    }

    onSearchEnd() {
        this.setState({loader: false})
    }

    onLoadMore() {
        if (this.state.searchedContent) {
            this.headerRef.search(this.state.offset)
        } else {
            this.loadContents(this.state.offset+20);
            this.setState({offset: this.state.offset+20});
        }
    }

    //On getting Searched contents.
    searchContent(content) {
        let thisContent = this.state.contents;
        let loadMore = this.state.loadMore;
        console.log(content);
        if (this.state.offset > 0) {
            thisContent = thisContent.concat(content);
        } else {
            thisContent = content;
        }
        if (content.length < 20) {
            loadMore=false;
        }
        this.setState({contents: thisContent, offset: this.state.offset+20, loadMore: loadMore, searchedContent: true})
    }

    onTopicCreated() {
        this.setState({contents: [], offset: 0, loader: false, loadMore: true, searchedContent: false })
        this.loadContents();
    }

    render() {
        return ( 
            <Fragment>
                <AddTopicModal ref={(ref) => this.addTopicModalRef=ref} onTopicCreated={() => this.onTopicCreated()} />
                <SupportHeader 
                    ref={(ref) => this.headerRef=ref}
                    navigation={this.props.navigation} 
                    onSearchContent={(content) => this.searchContent(content)}
                    onSearchStart={() => this.onSearchStart()}
                    onSearchEnd={() => this.onSearchEnd()} />
                {(this.state.loader) && (
					<View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 18}}>Loading...</Text>
					</View>
				)}
				{(!this.state.loader) && (
                    <Fragment>
                        <TouchableOpacity activeOpacity={0.5}
                            style={{
                                position: 'absolute',
                                bottom: sizeCalculator.height(30),
                                right: sizeCalculator.width(30),
                                height: sizeCalculator.height(60),
                                width: sizeCalculator.width(60),
                                backgroundColor: '#324c87',
                                borderRadius: sizeCalculator.width(30),
                                zIndex: 2000
                            }}
                            onPress={() => this.addTopicModalRef.toggleOverlay()}>
                                <Icon
                                    name='add'
                                    color='#fff'
                                    size={sizeCalculator.fontSize(40)}
                                    iconStyle={{
                                        width: '100%',
                                        height: '100%',
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        textAlignVertical: 'center'
                                    }} />
                        </TouchableOpacity>
                        <ScrollView style={[{
                            padding: sizeCalculator.height(8),
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                        }, this.props.style]}>
                            {this.state.contents.map((content, key) => {
                                return (
                                    <ListItem
                                        key={key}
                                        title={content.topic_name}
                                        subtitle={content.details.substring(0,80)+'...'}
                                        bottomDivider={true}
                                        onPress={() => this.props.navigation.navigate("TopicPageScreen", {content: content})}
                                        titleStyle={{
                                            fontFamily: "Montserrat-Regular",
                                            fontSize: sizeCalculator.fontSize(18),
                                        }}
                                        subtitleStyle={{
                                            fontFamily: "Montserrat-Regular",
                                        }}
                                    />
                                );
                            })}
                            {this.state.loadMore && 
                                <TouchableOpacity style={{
                                    borderRadius: 0,
                                    marginVertical: sizeCalculator.height(8), 
                                    paddingVertical: sizeCalculator.height(8), 
                                    marginBottom: sizeCalculator.height(15),
                                    backgroundColor: '#e4e4e4',
                                    borderWidth: sizeCalculator.fontSize(1),
                                    borderColor: '#999',
                                    alignItems: 'center'
                                }} onPress={() => this.onLoadMore()}>
                                    <Text style={[styles.defaultBtnText, {
                                        color: '#666'
                                    }]} >Load More</Text>
                                </TouchableOpacity>
                            }
                            {!this.state.loadMore && 
                                <Text style={styles.warningHeaderSubTitle}>
                                    No more topics found
                                </Text>
                            }
                        </ScrollView>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}
 
;