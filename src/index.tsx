import React from 'react';
import ReactDOM from 'react-dom';
import Appold from './App';
import { Provider } from 'react-redux';
import store from './RootStore';

ReactDOM.render(
    <Provider store={store}>
        <Appold />
    </Provider>,
    document.getElementById('root')
);
