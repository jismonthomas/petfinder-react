import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLogin: false,
    notification: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleLogin(state) {
            const currentState = state.showLogin;
            state.showLogin = !currentState;
        },
        showNotification(state, action) {
            if (action.payload === 'reset') {
                state.notification = null;
            }
            else {
                state.notification = {
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message
                }
            }
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;