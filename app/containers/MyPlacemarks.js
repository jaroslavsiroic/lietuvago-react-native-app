import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as css from './Styles';

class MyPlacemarks extends Component {
    render() {
        console.log(this.props);
        return <Text>Comming soon...</Text>;
    }
}

export default connect(state => ({}),(dispatch) => ({}))(MyPlacemarks);