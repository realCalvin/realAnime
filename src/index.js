import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { createStore } from 'redux'
// import rootReducer from './store/reducers/rootReducer'
// import { Provider } from 'react-redux'
// import { getFirestore } from 'redux-firestore'
// import { getFirebase } from 'react-redux-firebase'

// const store = createStore(rootReducer);


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
