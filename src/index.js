import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, put as dispatch} from 'redux-saga/effects';
import axios from 'axios';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// Create the rootSaga generator function
function* rootSaga() {
    console.log('saga is always watching');
    yield takeEvery('FETCH_IMAGES', getImages);
    yield takeEvery('FETCH_TAGS', getAvailableTags);    
    yield takeEvery('FETCH_APPLIED_TAGS', getAppliedTags);

    yield takeEvery('ADD_NEW_TAG', addTag);
}

function* getImages(){
    try{
        const imagesResponse = yield axios.get('/api/images');
        yield dispatch({type: 'SET_IMAGES', payload: imagesResponse.data});
    }catch(err){
        console.log('Error in GET images request:', err);
    };
}

function* getAvailableTags(){
    try{
        const tagsResponse = yield axios.get('/api/tags');
        yield dispatch({type: 'SET_TAGS', payload: tagsResponse});
    }catch(err){
        console.log('Error in GET tags request:', err);
    };
}

function* getAppliedTags(action){
    try{
        const appliedTagsResponse = yield axios.get(`/api/tags/applied?imageId=${action.payload.id}`);
        yield dispatch({type: 'SET_APPLIED_TAGS', payload: appliedTagsResponse.data})
    }catch(err){
        console.log("Error in GET applied tags request:", err);
    }
}

function* addTag(action){
    try{
        console.log('in add tag with the payload:', action.payload);
        yield axios.post('/api/images/addtag', action.payload);
        yield dispatch({type: 'FETCH_APPLIED_TAGS', payload: {id: action.payload.image_id}});   
    }catch(err){
        console.log('Error in POST tag request:', err);
    };
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store images returned from the server
const images = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.)
const availableTags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

//this will store the applied tags to the image that is currently visible
const appliedTags = (state = [], action) => {
    switch (action.type) {
        case 'SET_APPLIED_TAGS':
            return action.payload;                
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        images,
        availableTags,
        appliedTags
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
