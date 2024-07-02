import { createSlice } from '@reduxjs/toolkit'

export const jsonReducer = createSlice({

    name: 'jsonPlaceholder',

    initialState: {
        receivedList: [],
        savedList: [],
        disable: false,
    },

    reducers: {
        refreshReceived(state, action) {
            state.receivedList = action.payload;
        },
        addItemToSaved(state, action) {
            state.savedList.push(action.payload);
        },
        removeItemFromSaved(state, action) {
            state.savedList = state.savedList.filter(item => item.id !== action.payload);
        },
        clearReceived(state) {
            state.receivedList = [];
        },
        clearSaved(state) {
            state.savedList = [];
        },
        disableButtons(state) {
            state.disable = true;
        },
        enableButtons(state) {
            state.disable = false;
        },
    },
})

export const {
    refreshReceived,
    addItemToSaved,
    removeItemFromSaved,
    clearReceived,
    clearSaved,
    disableButtons,
    enableButtons
} = jsonReducer.actions;

export default jsonReducer.reducer;