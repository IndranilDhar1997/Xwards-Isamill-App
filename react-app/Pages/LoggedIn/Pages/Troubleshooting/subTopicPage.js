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

export default class SubTopicPageScreen extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.route.params.contents);
        this.state = {
            contents: this.props.route.params.contents
        }
    }

    componentDidMount() {
        if (Platform.OS === "android") {

        }
    }

    openSubTopicList(topic) {
        LocalStorage.get('isaMillDownload', function(time) {
            if (!time || ((Math.floor(Date.now() / 1000) - time.time > 600))) {
                let {DownloadDir, DocumentDir} = RNFetchBlob.fs.dirs;
                RNFS.exists('file://'+DocumentDir+'/'+topic.fileName).then(bool => {
                    if (bool) {
                        //Open the document
                        console.log('Need to open the document');
                        RNFetchBlob.android.actionViewIntent(DocumentDir+'/'+topic.fileName, 'application/pdf');
                    } else {
                        LocalStorage.set('isaMillDownload', JSON.stringify({download: true, time: (Math.floor(Date.now() / 1000))}), function() {
                            RNFetchBlob.config({
                                addAndroidDownloads: {
                                    overwrite: true,
                                    useDownloadManager: true,
                                    mime: 'application/pdf',
                                    notification: false,
                                    path: DownloadDir+'/'+topic.fileName,
                                    description: 'IsaMill File Downloaded - ',
                                }
                            }).fetch('GET', topic.webUrl).then((response) => {
                                var modifiedDownloadedFilePath = 'file://'+DownloadDir+'/'+topic.fileName;
                                var destinedFilePath = 'file://'+DocumentDir+'/'+topic.fileName;
                                RNFS.moveFile(modifiedDownloadedFilePath, destinedFilePath).then((response)=> {
                                    LocalStorage.delete('isaMillDownload');
                                    RNFetchBlob.android.actionViewIntent(DocumentDir+'/'+topic.fileName, 'application/pdf');
                                    Toast.show('Download completed.');
                                }).catch((error)=> {
                                    Toast.show('Download Complete - File cannot be moved to location.');
                                })
                            }).catch((error)=> {
                                console.log('Error: ', error.message);
                            });
                        });
                    }
                }).catch(e => {
                    Toast.show('Unable to download of find the file.');
                });
            } else {
                Toast.show('There is a download already in progress.');
            }
        });
    }

    render() { 
        return ( 
            <Fragment>
                <StaticPage title={this.state.contents.title} onBack={() => this.props.navigation.goBack()}>
                    {this.state.contents.subTopics.map((content, key) => {
                        return (
                            <ListItem
                                key={key}
                                title={content.title}
                                // subtitle={content.subTitle}
                                onPress={() => this.openSubTopicList(content)}
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