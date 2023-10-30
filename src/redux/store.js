import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsSliceReducer from './contactsSlice';

const persistConfig = {
  key: 'contacts',
  storage,
  whiteList: ['posts'],
};
const persistedReducer = persistReducer(persistConfig, contactsSliceReducer);
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
