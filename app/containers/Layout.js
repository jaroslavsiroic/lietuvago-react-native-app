import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import * as css from './Styles';
import withModalAndSpinner from '../components/withModalAndSpinner';
import SplashScreen from '../components/SplashScreen';
import MapScreen from './MapScreen';
import MyPlacemarks from './MyPlacemarks';
import MyPlacemarkList from './MyPlacemarkList';
import PlacemarkInfo from './PlacemarkInfo';
import SettingsList from './SettingsList';
import Login from './Login';
import Register from './Register';

const MainTabView = TabNavigator({
    Map: {
        screen: withModalAndSpinner(MapScreen),
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='map'
                    type='material-community'
                    color='white'/>
            )
        })
    },
    MyPlacemarks: {
        screen: MyPlacemarkList,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='map-marker-multiple'
                    type='material-community'
                    color='white'/>
            )
        })
    },
    // Navigate: {
    //     screen: MyPlacemarks,
    //     navigationOptions: ({navigation}) => ({
    //         tabBarIcon: ({ tintColor }) => (
    //             <Icon
    //                 name='near-me'
    //                 type='material-community'
    //                 color='white'/>
    //         )
    //     })
    // },
    // AddPlacemark: {
    //     screen: MyPlacemarks,
    //     navigationOptions: ({navigation}) => ({
    //         tabBarIcon: ({ tintColor }) => (
    //             <Icon
    //                 name='map-marker-plus'
    //                 type='material-community'
    //                 color='white'/>
    //         )
    //     })
    // },
    Settings: {
        screen: withModalAndSpinner(SettingsList),
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='settings'
                    type='material-community'
                    color={tintColor}/>
            )
        })
    }
},{
    tabBarPosition: 'bottom',
    lazy: false,
    animationEnabled: false,
    tabBarOptions: css.tabs,
});

const LoggedInView = StackNavigator({
    Main: {
        screen: MainTabView,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    PlacemarkInfo: {
        screen: PlacemarkInfo,
        navigationOptions: ({navigation}) => ({
            title: navigation.state.params.name
        })
    }
});

const NotLoggedInView = StackNavigator({
    Login: {
        screen: withModalAndSpinner(Login),
        navigationOptions: ({navigation}) => ({
            title: 'Login',
        })
    },
    Register: { screen: withModalAndSpinner(Register),
        navigationOptions: ({navigation}) => ({
            title: 'Register',
        })
    }
});

class Layout extends Component {
    render() {
        const { isLoggedIn, showSplash } = this.props;
        if (showSplash) {
            return <SplashScreen />;
        }
        const AppView = isLoggedIn ? LoggedInView: NotLoggedInView;
        return <AppView />;
    }
}

export default connect(state => ({
    isLoggedIn: state.session.user.isLoggedIn,
    showSplash: state.communication.splash.showSplash
}),(dispatch) => ({}))(Layout);