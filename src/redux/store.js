import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication/authSlice"

export const store = configureStore({
    reducer : {
        authenticationState: authenticationReducer
    }
})
