import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import contactsSlice from './contacts';


const rootReducer = combineReducers({
  auth: authSlice,
  contacts: contactsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
