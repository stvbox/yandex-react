import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    IAuthResult, IAuthUser, IChangePasswordParams, IChangePasswordResult,
    ILoadUserInfoResult, ILogingResult, IRegisterUserParams, IResetPasswordParams
} from "../reducers/auth.types";
import { fetchWithRefresh, getRefreshToken, storeTokens } from "../../utils/token";
import { BASE_URL } from "../../utils/constants";
import { getHeaders } from "../../utils/requests";


const PASSWORD_CHANGE_URL = BASE_URL + '/password-reset/reset';
const PASSWORD_RESET_URL = BASE_URL + '/password-reset';
const REGISTE_USER_URL = BASE_URL + '/auth/register';
const AUTH_LOGOUT_URL = BASE_URL + '/auth/logout';
const AUTH_LOGIN_URL = BASE_URL + '/auth/login';
const USER_INFO_URL = BASE_URL + '/auth/user';

export const registerUser = createAsyncThunk('user/register', (params: IRegisterUserParams) => {
    const { email, password, name } = params;
    return fetchWithRefresh<IAuthResult>(REGISTE_USER_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name }),
    }).then(response => {
        console.log('registerUser(response): ', response);
        if (response.json.success) {
            storeTokens({
                accessToken: response.json.accessToken,
                refreshToken: response.json.refreshToken,
            });
            return response;
        }

        storeTokens({});
        throw response.json;
    });
});

export const changePassword = createAsyncThunk('user/change', (params: IChangePasswordParams) => {
    const { password, token } = params;
    return fetchWithRefresh<IChangePasswordResult>(PASSWORD_CHANGE_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ password, token }),
    });
});

export const resetPassword = createAsyncThunk('user/reset', (params: IResetPasswordParams) => {
    return fetchWithRefresh<ILogingResult>(PASSWORD_RESET_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email: params.email }),
    });
});

export const updateUserInfo = createAsyncThunk('user/update', (params: IRegisterUserParams) => {
    const { email, password, name } = params;
    fetchWithRefresh<IRegisterUserParams>(USER_INFO_URL, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name }),
    });
});

export const getUserInfo = createAsyncThunk('user/info', () => {
    return fetchWithRefresh<ILoadUserInfoResult>(USER_INFO_URL, {
        method: "GET",
        headers: getHeaders(),
    }).then((result) => {
        if (!result.json.success) {
            throw { errorText: `${result.status} ${result.statusText}` };
        }
        return result;
    });
});

export const authUser = createAsyncThunk('user/auth', async (params: IAuthUser, thunkAPI) => {
    const { email, password } = params;
    return fetchWithRefresh<IAuthResult>(AUTH_LOGIN_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
    }).then((response) => {
        console.log('authUser(response):', response);

        if (!response.json.success) {
            console.error('error', response);
            throw response.json.message;
        }

        storeTokens({
            accessToken: response.json.accessToken,
            refreshToken: response.json.refreshToken,
        });

        //thunkAPI.fulfillWithValue(response);
        return response;
    });
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
    const token = getRefreshToken();
    return fetchWithRefresh<ILogingResult>(AUTH_LOGOUT_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ token }),
    }).then(response => {
        if (response.json.success) {
            storeTokens({}); // Сброс токенов при удачном разлогине
            return response;
        }
        throw response.json.message;
    });
});