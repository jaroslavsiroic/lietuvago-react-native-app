import React from 'react';
import { View, Modal, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { showModal, hideModal } from '../actions/modalActions';
import * as css from '../containers/Styles';

const withModalAndSpinner = Component => {
    class WithModalAndSpinner extends React.Component {
        render() {
            const { isLoading, loadingText, showModal, hideModal, modalText, isModalVisible } = this.props;
            return (
                <View>
                    <Component {...this.props} />
                    <Spinner
                        visible={isLoading}
                        textContent={loadingText}
                        textStyle={{color: '#FFF'}} />
                    <Modal
                        animationType={'fade'}
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={hideModal} >
                        <View style={css.global.v_container}>
                            <View>
                                <Text>{modalText}</Text>
                                <TouchableHighlight onPress={() => {hideModal()}}>
                                <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                </View>
            );
        }
    }

    return connect(state => ({
        isLoading: state.communication.loading.isLoading,
        loadingText: state.communication.loading.loadingText,
        isModalVisible: state.communication.modal.showModal,
        modalText: state.communication.modal.modalText,
    }),
        (dispatch) => bindActionCreators({
            showModal: showModal,
            hideModal: hideModal
    }, dispatch))(WithModalAndSpinner);
}

module.exports = withModalAndSpinner;