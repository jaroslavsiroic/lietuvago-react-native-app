import React, { PropTypes } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Image,
} from 'react-native';
import HTMLView from 'react-native-htmlview';


class PlacemarkInfo extends React.Component {
    render() {
        const { description, image, name } = this.props.navigation.state.params;

        let shortDescription = '';
        if (description) {
            shortDescription = description.replace(/^(.*?)>/i, '');
        }
        return (
            <ScrollView style={styles.container}>
                <Image
                    source={{uri: image }}
                    style={{flex: 1, width: Dimensions.get('window').width, height: 200}}/>
                <HTMLView
                    value={shortDescription}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    bubble: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#4da2ab',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    amount: {
        flex: 1,
        },
        arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#4da2ab',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        alignSelf: 'center',
        marginTop: -0.5,
    },
});

module.exports = PlacemarkInfo;