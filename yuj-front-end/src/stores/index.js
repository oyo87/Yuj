import { configureStore } from '@reduxjs/toolkit';
import studioSampleSlice from './studioSampleSlice'

const store = configureStore({
    reducer: {
        studioSample: studioSampleSlice.reducer,
    }
})

export default store;