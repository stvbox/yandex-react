export enum AuthActions {
    WAIT_USER_INFO = 'WAIT_USER_INFO',
    SET_USER_INFO = 'SET_USER_INFO',
    RESET_AUTH_ERROR = "RESET_AUTH_ERROR",
}

export interface IAuthState {
    wait: boolean;
    email: string | null;
    name: string | null;
    errorMessage: string | null;
}

export interface ILoadUserInfoResult {
    success: boolean;
    user: { email: any; name: any; };
}

export interface IAuthUser {
    password: string,
    email: string,
}

export interface IAuthResult {
    success: boolean;
    message: string;
    refreshToken: string;
    accessToken: string;
    user: {
        email: string;
        name: string;
    };
}

export interface ILogingResult {
    success: boolean;
    message: string;
}

export interface IRegisterUserParams {
    email: string,
    password: string,
    name: string,
}

export interface IResetPasswordParams {
    email: string;
}

export interface IChangePasswordParams {
    password: string,
    token: string,
}

export interface IChangePasswordResult {
}