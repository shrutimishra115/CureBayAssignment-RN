import {configureStore} from '@reduxjs/toolkit';
import vitalsReducer from './VitalSlice';

const store = configureStore({
  reducer: {
    vitals: vitalsReducer,
  },
});

export default store;
