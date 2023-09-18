// Import your individual reducer files
import { combineReducers} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ipAddressReducer from './ipAddressSlice';

// Combine your reducers into a root reducer
export  const rootReducer = combineReducers({
  auth: authReducer,
  ipAddress:ipAddressReducer
  // Add more reducers as needed
});
export default rootReducer;
