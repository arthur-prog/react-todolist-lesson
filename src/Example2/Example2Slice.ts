import { createSlice } from '@reduxjs/toolkit';

interface State {
    name: string;
}

export const example2Slice = createSlice({
    name: 'example2',
    initialState: {
        name: 'blue',
    },
    reducers: {
        setName: (state: State, action: { payload: string }) => {
            state.name = action.payload;
        },
    }
});

export const { setName } = example2Slice.actions;

export default example2Slice.reducer;
