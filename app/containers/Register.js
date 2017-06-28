import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput } from 'react-native-elements'

import Button from '../components/Button';

import { userRegister } from '../actions/userActions';
import * as css from './Styles';

class Register extends Component {
    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
    }

    register() {
        const { userRegister, showModal } = this.props;

        const data = {
            username: this.refs.registername.refs.username._lastNativeText,
            password: this.refs.registerpass.refs.password._lastNativeText
        };

        if(data.username === '' || data.password === '') {
            showModal('Hey! Input fields can\'t be empty!');
        } else {
            userRegister(data);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        //style={css.global.v_container}
        return (
            <View>
                <FormLabel>Username</FormLabel>
                <FormInput
                    ref='registername'
                    textInputRef='username'/>
                <FormLabel>Password</FormLabel>
                <FormInput
                    secureTextEntry={true}
                    ref='registerpass'
                    textInputRef='password'/>
                <Button text='Register' onClick={this.register}/>
            </View>
        );
    }
}

export default connect(state => ({}),
    (dispatch) => bindActionCreators({
        userRegister: userRegister
}, dispatch))(Register);