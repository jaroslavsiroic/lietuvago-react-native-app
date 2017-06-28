import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';
import Layout from './Layout';

const store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(thunk),//, logger),
        // applyMiddleware(thunk, logger),
        autoRehydrate()
    )
);

// begin periodically persisting the store
persistStore(store, {blacklist: ['communication'], storage: AsyncStorage});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}
