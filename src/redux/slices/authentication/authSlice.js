import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    apiError : "",
    isAuth : true,
    userProfileInfo : [],
}

const authentication = createSlice({
    name: "authentication",
    initialState,
    reducers : {
        handleLoading : (state, { payload }) => {
            state.isLoading = payload;
        },
        handleApiError : (state, { payload }) => {
            state.apiError = payload
        },
        handleIsAuth : (state, { payload}) => {
            state.isAuth = payload
        }, 
        handleUserProfileInfo : (state, { payload }) => {
            state.userProfileInfo = payload
        }
    }

})

export const {
    handleLoading,
    handleApiError,
    handleIsAuth,
    handleUserProfileInfo
} = authentication.actions 

export default authentication.reducer