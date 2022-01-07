import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css'

//import store for contian data from back-end
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

