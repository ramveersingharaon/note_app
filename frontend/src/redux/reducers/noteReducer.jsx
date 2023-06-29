import { createReducer } from '@reduxjs/toolkit';

export const noteReducer = createReducer({ isAuthentication: false }, {
    GET_NOTES_REQUEST: (state) => {
        state.loading = true
        state.isAuthentication = false
    },
    GET_NOTES_SUCCESS: (state, action) => {
        state.loading = false,
            state.notes = action.payload.notes
        state.isAuthentication = true
        state.error = null
    },
    GET_NOTES_FAIL: (state, action) => {
        state.error = action.payload
    },
    CREATE_NOTES_REQUEST: (state) => {
        state.loading = true
    },
    CREATE_NOTES_SUCCESS: (state, action) => {
        state.loading = false,
            state.notes = action.payload.notes
        state.message = action.payload.message
    },
    CREATE_NOTES_FAIL: (state, action) => {
        state.error = action.payload
    },
    DELETE_NOTES_REQUEST: (state) => {
        state.loading = true
    },
    DELETE_NOTES_SUCCESS: (state, action) => {
        state.loading = false,
            state.notes = action.payload.note._id
        state.message = action.payload.message
    },
    DELETE_NOTES_FAIL: (state, action) => {
        state.error = action.payload
    },
    EDIT_NOTES_REQUEST: (state) => {
        state.loading = true
    },
    EDIT_NOTES_SUCCESS: (state, action) => {
        state.loading = false,
            state.note = action.payload.note
        state.message = action.payload.message
    },
    EDIT_NOTES_FAIL: (state, action) => {
        state.error = action.payload
    },
    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }
})