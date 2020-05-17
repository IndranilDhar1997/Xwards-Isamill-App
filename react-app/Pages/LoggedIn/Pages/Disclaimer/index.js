import React, { Component, Fragment } from 'react';

import StaticPage from '../StaticPage';

export default class DisclaimerScreen extends Component {
    render() { 
        return ( 
            <Fragment>
                <StaticPage title={'Disclaimer'}  onBack={() => this.props.navigation.goBack()}>
                </StaticPage>
            </Fragment>
        );
    }
}
 
;