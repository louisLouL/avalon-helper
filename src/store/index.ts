import {createStore, compose} from "redux";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from "./reducers";

const persistConfig = {
    key: 'root',
    storage,
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store: any = createStore(persistedReducer, storeEnhancers());

export const persistor = persistStore(store);

