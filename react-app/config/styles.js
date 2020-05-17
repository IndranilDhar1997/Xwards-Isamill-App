import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import sizeCalculator from '../Service/SizeCalc';

const styles = StyleSheet.create ({
    classLeftAlign: {
        textAlign: 'left'
    },
    logoImg: {
        height: sizeCalculator.height(120),
        maxWidth: sizeCalculator.width(320), minWidth: '80%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    logoImgText: {
        color: '#002776',
        textAlignVertical: 'center',
        marginTop: -10, 
        marginBottom: sizeCalculator.height(10),
        fontSize: sizeCalculator.fontSize(18),
        alignSelf: 'center',
        fontFamily: "Montserrat-Regular"
    },
    formLink: {
        textAlign: 'center',
        color: '#002776',
        textAlignVertical: 'center',
        marginTop: sizeCalculator.height(8),
        fontSize: sizeCalculator.fontSize(18),
        fontFamily: "Montserrat-Regular"
    },
    formTextInput: {
        textAlign: 'center', 
        fontSize: sizeCalculator.fontSize(18),
        paddingVertical: sizeCalculator.height(5),
        marginVertical: sizeCalculator.height(8),
        borderRadius: sizeCalculator.height(5), 
        backgroundColor: '#fff',
        fontFamily: "Montserrat-Regular"
    },
    formTextInputBordered: {
        fontSize: sizeCalculator.fontSize(18),
        paddingVertical: sizeCalculator.height(5),
        marginVertical: sizeCalculator.height(8),
        borderRadius: sizeCalculator.height(5), 
        backgroundColor: '#fff',
        fontFamily: "Montserrat-Regular",
        borderWidth: sizeCalculator.width(0.3)
    },
    formElementText: {
        marginVertical: sizeCalculator.height(5),
        color: '#002776',
        fontWeight: '400',
        textAlign: 'left',
        fontSize: sizeCalculator.fontSize(19),
        marginBottom: sizeCalculator.height(-4),
        paddingHorizontal: sizeCalculator.width(4),
        fontFamily: 'Montserrat-Medium'
    },
    defaultBtn: {
        marginVertical: sizeCalculator.height(8),
        borderRadius: sizeCalculator.height(5), 
        backgroundColor: '#002776',
        alignItems: 'center'
    },
    defaultBtnText: {
        color: '#fff',
        paddingVertical: sizeCalculator.height(10),
        textAlignVertical: 'center', 
        fontSize: sizeCalculator.fontSize(18),
        fontFamily: "Montserrat-Regular"
    },
    warnBtn: {
        marginVertical: sizeCalculator.height(8),
        borderRadius: sizeCalculator.height(5), 
        backgroundColor: '#E98300',
        alignItems: 'center'
    },
    warnBtnText: {
        color: '#fff',
        paddingVertical: sizeCalculator.height(10),
        textAlignVertical: 'center', 
        fontSize: sizeCalculator.fontSize(18),
        fontFamily: "Montserrat-Regular"
    },
    warningHeaderTitle: {
        color: '#8B0000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: sizeCalculator.fontSize(23),
        fontFamily: "Montserrat-Regular"
    },
    warningHeaderSubTitle: {
        marginVertical: sizeCalculator.height(5),
        color: '#002776',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: sizeCalculator.fontSize(18),
        fontFamily: "Montserrat-Regular"
    },
    overlayText: {
        marginVertical: sizeCalculator.height(8), 
        marginHorizontal: sizeCalculator.width(5),
        fontSize: sizeCalculator.fontSize(18),
        fontFamily: "Montserrat-Regular"
    },
    /**
     * LoggedIn Styles
     */
    dashboardLogo: {
        height: '80%',
        resizeMode: 'contain'
    },
    dashboardHeaderBtn: {
        height: '100%',
        justifyContent: 'center'
    },
    dashboardHeaderBtnImg: {
        height: '80%',
        resizeMode: 'contain'
    },
    dashboardButtonContainer: {
        height: '100%', 
        width: '100%', 
        paddingBottom: sizeCalculator.height(40), 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    dashboardBtn: {
        flex: 1,
        position: 'relative',
        height: sizeCalculator.height(100),// sizeCalculator.height(this.state.compoenntHeight),
        marginVertical: sizeCalculator.height(20), 
        marginHorizontal: sizeCalculator.width(15),
        maxWidth: sizeCalculator.width(150), minWidth: '33%',
        borderRadius: sizeCalculator.height(8),
        alignItems: 'center',
        alignSelf: 'center'
    },
    dashboardBtnImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        alignItems: 'center',
        alignSelf: 'center'
    },
    dashboardBtnTxt: {
        color: '#263f7a',
        textAlignVertical: 'center',
        marginVertical: sizeCalculator.height(8), 
        fontSize: sizeCalculator.fontSize(18),
        fontWeight: '600',
        fontFamily: "Montserrat-Regular"
    }
});

export default styles;