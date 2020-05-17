import {Component} from 'react';

export default class Modal extends Component {
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
}