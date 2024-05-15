import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthActions, IAuthState } from "./auth.types";
import { authUser, changePassword, getUserInfo, logoutUser, registerUser, updateUserInfo } from "../actions/auth";


const initialState: IAuthState = {
    wait: true,
    email: null,
    name: null,
    errorMessage: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        [AuthActions.RESET_AUTH_ERROR]: (state) => {
            state.errorMessage = null;
        },
        [AuthActions.SET_USER_INFO]: (state, action: PayloadAction<{ email: string, name: string }>) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
    },
    extraReducers(builder) {

        // changePassword
        builder.addCase(changePassword.pending, (state) => {
            state.wait = true;
        });
        builder.addCase(changePassword.rejected, (state) => {
            state.wait = false;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.wait = false;
        });

        // updateUserInfo
        builder.addCase(updateUserInfo.pending, (state) => {
            state.wait = true;
        });
        builder.addCase(updateUserInfo.rejected, (state) => {
            state.wait = false;
        });
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            console.log('updateUserInfo.fulfilled: ', action);
            state.wait = false;
        });

        // registerUser
        builder.addCase(registerUser.pending, (state) => {
            state.wait = true;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log('registerUser.rejected: ', action);
            state.errorMessage = String(action.error.message);
            state.wait = false;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log('registerUser.fulfilled: ', action);
            state.email = action.payload.json.user.email;
            state.name = action.payload.json.user.name;
            state.wait = false;
        });

        // authUser
        builder.addCase(authUser.pending, (state) => {
            state.wait = true;
        });
        builder.addCase(authUser.rejected, (state, action) => {
            console.log('authUser.rejected: ', action);
            state.errorMessage = String(action.error.message);
            state.email = null;
            state.name = null;
            state.wait = false;
        });
        builder.addCase(authUser.fulfilled, (state, action) => {
            console.log('authUser.fulfilled: ', action);
            state.email = action.payload.json.user.email;
            state.name = action.payload.json.user.name;
            state.wait = false;
        });

        // getUserInfo
        builder.addCase(getUserInfo.pending, (state, action) => {
            state.wait = true;
            console.log('getUserInfo.pending: ', action);
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            console.log('getUserInfo.fulfilled: ', action);
            state.email = null;
            state.name = null;
            state.wait = false;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            console.log('getUserInfo.fulfilled: ', action);
            state.email = action.payload.json.user.email;
            state.name = action.payload.json.user.name;
            state.wait = false;
        });

        // logoutUserAction
        builder.addCase(logoutUser.fulfilled, (state) => {
            console.log('logoutUserAction.fulfilled');
            state.email = null;
            state.name = null;
        });
    }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;


// export const burgerAuth = (state = initialState, action: IAuthAction) => {
//     switch (action.type) {
//         case IAuthActions.WAIT_USER_INFO:
//             return { ...state, wait: action.payload };
//         case IAuthActions.SET_USER_INFO:
//             const { email, name } = action.payload;
//             return { ...state, email, name };
//     }
//     return state;
// };