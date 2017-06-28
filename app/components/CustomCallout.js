import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions,
    Modal,
    TouchableHighlight,
    Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';


class CustomCallout extends React.Component {
    render() {
        const { description, image, name } = this.props;
        let shortDescription = '';
        if (description) {
            shortDescription = description.replace(/<(.*?)>/g, '').slice(0,100);
        }
        return (
            <View style={styles.container}>
                <Text>{name}</Text>
                <Image
                    source={{uri: image }}
                    style={{flex: 1, width: 200, height: 100}}/>
                <HTMLView
                    value={`${shortDescription}...`}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width / 2)
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

module.exports = CustomCallout;