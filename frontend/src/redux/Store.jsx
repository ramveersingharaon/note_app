import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { noteReducer } from './reducers/noteReducer'



const store = configureStore({
    reducer: {
        user: userReducer,
        note: noteReducer
    }
})

export default store;