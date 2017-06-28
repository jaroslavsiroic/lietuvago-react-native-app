import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormLabel, FormInput } from 'react-native-elements';

import { userLogin } from '../actions/userActions';
import Button from '../components/Button';
import * as css from './Styles';

class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        const { userLogin, showModal } = this.props;

        const data = {
            username: this.refs.loginname.refs.username._lastNativeText,
            password: this.refs.loginpass.refs.password._lastNativeText
        };
        // todo check for empty fields and show modal
        if(data.username === '' || data.password === '') {
            showModal('Hey! Input fields can\'t be empty!');
        } else {
            userLogin(data);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        //style={css.global.v_container}
        return (
            <View>
                <FormLabel>Username</FormLabel>
                <FormInput
                    ref='loginname'
                    textInputRef='username' />
                <FormLabel>Password</FormLabel>
                <FormInput
                    secureTextEntry={true}
                    ref='loginpass'
                    textInputRef='password'/>
                <Button text='Login' onClick={this.login}/>
                <Button
                    text='Register'
                    backgroundColor={css.colors.background_medium}
                    onClick={()=> navigate('Register')}/>
            </View>
        );
    }
}

export default connect(state => ({}),
    (dispatch) => bindActionCreators({
        userLogin: userLogin
}, dispatch))(Login);