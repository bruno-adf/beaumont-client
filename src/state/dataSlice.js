import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    project: null,
    list: null,
    dark: false
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
        },
        darkMode: (state) => {
            state.dark = !state.dark
        }
    }
});

export const { set, clear, load, darkMode } = dataSlice.actions

export default dataSlice.reducer