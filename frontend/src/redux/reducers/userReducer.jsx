import { createReducer } from '@reduxjs/toolkit'

export const userReducer = createReducer({ isAuthentication: false }, {
    LOGIN_REQUEST: (state) => {
        state.loading = true
    },
    LOGIN_SUCCESS: (state, action) => {
        state.loading = false,
            state.isAuthentication = true,
            state.token = action.payload.token
        state.message = action.payload.message
    },
    LOGIN_FAIL: (state, action) => {
        state.loading = false,
            state.isAuthentication = false,
            state.error = action.payload
    },
    REGISTER_REQUEST: (state) => {
        state.loading = true
    },
    REGISTER_SUCCESS: (state, action) => {
        state.loading = false,
            state.message = action.payload.message
    },
    REGISTER_FAIL: (state, action) => {
        state.loading = false,
            state.isAuthentication = false,
            state.error = action.payload
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    },
    CLEAR_ERROR: (state) => {
        state.error = null
    }
})