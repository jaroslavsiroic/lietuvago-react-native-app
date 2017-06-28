import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import ActionSheet from '@yfuks/react-native-action-sheet';

import { userLogout } from '../actions/userActions';
import { changeMapStyle } from '../actions/settingsActions';
import * as css from './Styles';

var Options = [
    'aubergine',
    'dark',
    'night',
    'retro',
    'silver',
    'standard'
];

var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class SettingsList extends Component {

    render() {
        const { mapStyle, username } = this.props;
        const list = [{
            title: username,
            icon: {
                type: 'entypo',
                name: 'user'
            },
            onPress: () => this.props.showModal('no options here')
        },
        {
            title: 'Change map style',
            subtitle: mapStyle,
            icon: {
                name: 'google-maps',
                type: 'material-community'
            },
            onPress: () => {
                ActionSheet.showActionSheetWithOptions({
                    options: Options,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    tintColor: 'blue'
                },
                (buttonIndex) => {
                    if (buttonIndex !== undefined) {
                        this.props.changeMapStyle(Options[buttonIndex]);
                    }
                })}
        },
        {
            title: 'Logout',
            icon: {
                name: 'logout',
                type: 'material-community'
            },
            onPress: this.props.userLogout
        }];

        return (
            <ScrollView>
                <List>
                    {list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            subtitle={item.subtitle}
                            leftIcon={item.icon}
                            onPress={item.onPress}/>
                    ))}
                </List>
            </ScrollView>
        );
    }
}

export default connect(state => ({
        mapStyle: state.session.settings.mapStyle,
        username: state.session.user.username
    }),(dispatch) => bindActionCreators({
        userLogout: userLogout,
        changeMapStyle: changeMapStyle
    }, dispatch)
)(SettingsList);