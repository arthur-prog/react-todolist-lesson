import { configureStore } from '@reduxjs/toolkit';
import example2Reducer from './Example2Slice';

export default configureStore({
    reducer: {
        example2: example2Reducer,
    },
});