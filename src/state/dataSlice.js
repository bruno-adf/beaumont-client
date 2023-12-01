import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    project: null,
    list: null
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        set: (state, action) => {
            state.project = action.payload
        },
        clear: (state) => {
            state.project = null;
        },
        load: (state, action) => {
            state.list = action.payload
        }
    }
});

export const { set, clear, load } = dataSlice.actions

export default dataSlice.reducer