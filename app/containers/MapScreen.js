import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Modal, TouchableHighlight, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import MapView from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

import * as css from './Styles';
import CustomCallout from '../components/CustomCallout';
import { getPlacemarks, visitPlacemark } from '../actions/placemarkActions';
import { locationStateChange, getDistance } from '../actions/locationActions';
import MapStyle from '../resources/mapstyle';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

const earthRadiusInKM = 6371;

const radiusInKM = 1.5;
const aspectRatio = 1;
const centerLat = 54.686530;
const centerLong = 25.290625;

class MapScreen extends Component {

    watchID: ?number = null;

    constructor(props) {
        super(props);

        this.deg2rad = this.deg2rad.bind(this);
        this.rad2deg = this.rad2deg.bind(this);
        this.calcRegion = this.calcRegion.bind(this);
        this.setPlaceIcon = this.setPlaceIcon.bind(this);
        this.markerPress = this.markerPress.bind(this);
        this.locationDialogCheck = this.locationDialogCheck.bind(this);
    }

    componentWillMount() {
        const { getPlacemarks, placemarks } = this.props;
        if (!placemarks.length > 0) {
            getPlacemarks();
        }
    }

    componentDidMount() {
        this.locationDialogCheck();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    locationDialogCheck() {
        const self = this;
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: '<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/>',
            ok: 'YES',
            cancel: 'NO'
        }).then((success) => {
                navigator.geolocation.getCurrentPosition((position) => {
                    self.props.locationStateChange({coords: position.coords, timestamp: position.timestamp});
                }, error => this.locationDialogCheck(), { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 });
                this.watchID = navigator.geolocation.watchPosition((position) => {
                    self.props.locationStateChange({coords: position.coords, timestamp: position.timestamp});
                }, error => this.locationDialogCheck(), { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 });
        }).catch((error) => {
            console.log(error.message); // error.message => 'disabled'
            this.locationDialogCheck();
        });
    }

    deg2rad(angle) {
        return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
    }

    rad2deg(angle) {
        return angle * 57.29577951308232 // angle / Math.PI * 180
    }

    calcRegion() {
        let radiusInRad = radiusInKM / earthRadiusInKM;
        let longitudeDelta = this.rad2deg(radiusInRad / Math.cos(this.deg2rad(centerLat)));
        let latitudeDelta = aspectRatio * this.rad2deg(radiusInRad);

        return { latitude: centerLat, longitude: centerLong, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
    }

    setPlaceIcon(placemark) {
        const { style } = placemark;
        let name = 'map-marker';
        let color = 'red';
        let type = 'material-community';
        // material-community, zocial, font-awesome, octicon,
        // ionicon, foundation, evilicon, simple-line-icon, or entypo

        switch(style) {
            case '#icon-1598-A52714': //castle
                name = 'castle';
                color = '#2196F3'; //blue
            break;
            case '#icon-1706-0097A7': //church
                name = 'church';
                color = '#3F51B5';
            break;
            case '#icon-1720-558B2F': //trees
                name = 'trees';
                color = '#009688'; //green, or teal
                type = 'foundation';
            break;
            case '#icon-1502-FBC02D': //star
                name = 'star';
                color = '#FBC02D'; //yellow
            break;
            case '#icon-1596-757575': //hiking
                name = 'walk';
                color = '#795548'; //brown
            break;
            case '#icon-1636-01579B': //museum
                name = 'medium';
                color = '#00BCD4'; //cyan
                type = 'entypo';
            break;
            case '#icon-1621-795548': //tower
                name = 'tower-fire';
                color = '#263238'; //blue grey
            break;
            case '#icon-1592-9C27B0': //puzzle
                name = 'puzzle';
                color = '#FF9800'; //orange
            break;
            case '#icon-1577-F57C00': //food
                name = 'food-variant';
                color = '#FF5722'; //deep orange
            break;
        }
        return <Icon name={name} color={color} type={type}/>;
    }

    markerPress(placemark) {
        const { visitedPlacemarks, currentLocation, visitPlacemark } = this.props;
        const { _id } = placemark;

        for (let i = 0; i < visitedPlacemarks.length; i++) {
            if (visitedPlacemarks[i]._id === _id) {
                return; // if already visited
            }
        }
        const userLocation = {
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude
        };
        const placemarkLocation = {
            lat: placemark.latitude,
            lng: placemark.longitude
        };

        const distance = getDistance(userLocation, placemarkLocation);
        // console.log(distance);
        if (distance < 500) {
            visitPlacemark(_id);
        }
    }


    render() {
        const { placemarks, mapStyle } = this.props;
        const { navigate } = this.props.navigation;

        const somePlaces = placemarks.slice(0, 300);
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    customMapStyle={MapStyle[mapStyle]}
                    region={this.calcRegion()}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    rotateEnabled={false}
                    showsPointsOfInterest={false}>

                    {somePlaces.map((placemark) =>
                        <MapView.Marker
                            key={placemark._id}
                            title={placemark.title}
                            description={placemark.description}
                            onPress={() => this.markerPress(placemark)}
                            coordinate={{
                                latitude: placemark.latitude,
                                longitude: placemark.longitude,
                                latitudeDelta: 0,
                                longitudeDelta: 0,
                            }}>
                            {this.setPlaceIcon(placemark)}
                            <MapView.Callout onPress={() => navigate('PlacemarkInfo', {...placemark})}>
                                <CustomCallout {...placemark} />
                            </MapView.Callout>
                        </MapView.Marker>
                    )}
                </MapView>
            </View>
        );
    }
}

export default connect(state => ({
        placemarks: state.data.placemarks,
        visitedPlacemarks: state.data.myPlacemarks,
        currentLocation: state.session.location.currentLocation,
        mapStyle: state.session.settings.mapStyle
    }),
    (dispatch) => bindActionCreators({
        getPlacemarks: getPlacemarks,
        locationStateChange: locationStateChange,
        visitPlacemark: visitPlacemark
    }, dispatch)
)(MapScreen);