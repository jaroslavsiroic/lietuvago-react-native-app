import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import * as css from '../containers/Styles';

class SplashScreen extends Component {
    render() {
        // style={css.global.icon}
        return (
            <View style={css.global.v_container}>
                <Text style={css.global.title}>LietuvaGO</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <Icon size={60} name='castle' color='#2196F3' type='material-community' />
                    <Icon size={60} name='church' color='#3F51B5' type='material-community' />
                    <Icon size={60} name='trees' color='#009688' type='foundation' />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon size={60} name='star' color='#FBC02D' type='material-community' />
                    <Icon size={60} name='walk' color='#795548' type='material-community' />
                    <Icon size={60} name='medium' color='#00BCD4' type='entypo' />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}>
                    <Icon size={60} name='tower-fire' color='#263238' type='material-community' />
                    <Icon size={60} name='puzzle' color='#FF9800' type='material-community' />
                    <Icon size={60} name='food-variant' color='#FF5722' type='material-community' />
                </View>
            </View>
        );
    }
}

export default SplashScreen;