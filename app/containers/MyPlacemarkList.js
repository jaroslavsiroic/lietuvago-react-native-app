import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, Icon } from 'react-native-elements';

import { getMyPlacemarks } from '../actions/placemarkActions';
import * as css from './Styles';


class MyPlacemarkList extends Component {

    componentDidMount() {
        this.props.getMyPlacemarks();
    }

    render() {
        const { myPlacemarks } = this.props;
        const { navigate } = this.props.navigation;
        let list = [];
        myPlacemarks.map((placemark) => {
            list.push({
                name: placemark.name,
                avatar_url: placemark.image,
                onPress: () => navigate('PlacemarkInfo', {...placemark})
            });
        });

        if (list.length > 0) {
            return (
                <ScrollView>
                    <List>
                        {list.map((item, i) => (
                            <ListItem
                                key={i}
                                roundAvatar
                                avatar={{uri:item.avatar_url}}
                                title={item.name}
                                onPress={item.onPress}/>
                        ))}
                    </List>
                </ScrollView>);
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Icon type='material-community' name='binoculars' color='#9E9E9E' size={200}/>
                    <Text style={{textAlign: 'center', color:'#9E9E9E' }}>No visited placemarks yet</Text>
                </View>);
        }
    }
}

export default connect(state => ({
    myPlacemarks: state.data.myPlacemarks
}),(dispatch) => bindActionCreators({
    getMyPlacemarks: getMyPlacemarks
}, dispatch))(MyPlacemarkList);