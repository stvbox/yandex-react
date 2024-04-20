import { getRefreshToken, getAccessToken, storeTokens, fetchWithRefresh } from "./token";

const BASE_URL = 'https://norma.nomoreparties.space/api';
const GET_INGRIDIENTS_URL = BASE_URL + '/ingredients';
const CHECKOUT_ORDER_URL = BASE_URL + '/orders';
const PASSWORD_RESET_URL = BASE_URL + '/password-reset';
const PASSWORD_CHANGE_URL = BASE_URL + '/password-reset/reset';
const REGISTE_USER_URL = BASE_URL + '/auth/register';
const AUTH_LOGIN_URL = BASE_URL + '/auth/login';
const AUTH_LOGOUT_URL = BASE_URL + '/auth/logout';
const USER_INFO_URL = BASE_URL + '/auth/user';

export const AUTH_TOKEN_URL = BASE_URL + '/auth/token';

//https://norma.nomoreparties.space/api/password-reset/reset
//https://norma.nomoreparties.space/api/auth/register
//https://norma.nomoreparties.space/api/auth/register



export function logoutUser(okHandler, failHandler) {
    const token = getRefreshToken();
    fetchWithRefresh(AUTH_LOGOUT_URL, {
        method: "POST",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    }).then(async (response) => {
        try {
            await expectNoOk(response);
        } catch (error) {
            console.log('error: ', error);
        }

        const responseBody = await response.json();

        storeTokens(responseBody)

        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function loadUserInfo(okHandler, failHandler) {
    fetchWithRefresh(USER_INFO_URL, {
        method: "GET",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        await expectNoOk(response);
        const responseBody = await response.json();
        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function updateUserInfo(params, okHandler, failHandler) {
    const { email, password, name } = params;

    fetchWithRefresh(USER_INFO_URL, {
        method: "PATCH",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    }).then(async (response) => {
        expectNoOk(response);
        const responseBody = await response.json();
        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function authLogin(params, okHandler, failHandler) {
    const { email, password } = params;

    try {
        fetchWithRefresh(AUTH_LOGIN_URL, {
            method: "POST",
            headers: {
                'Authorization': getAccessToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(async (response) => {
            expectNoOk(response, async () => {
                const responseBody = await response.json();
                storeTokens(responseBody)
                okHandler(responseBody);
            }, failHandler);
        }).catch((error) => {
            failHandler(error);
        });
    } catch (error) {
        failHandler(error);
        //console.log('error: ', error);
    }
}

export function registerUser(params, okHandler, failHandler) {
    const { email, password, name } = params;
    fetchWithRefresh(REGISTE_USER_URL, {
        method: "POST",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then(async (response) => {

        // {
        //     "success": true,
        //     "user": {
        //         "email": "stvbox@yandex.ru",
        //         "name": "Сергей"
        //     },
        //     "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjAwNTNhOTdlZGUwMDAxZDA2NjI0NyIsImlhdCI6MTcxMzM3NDUyMiwiZXhwIjoxNzEzMzc1NzIyfQ.RPUvzsFGpUmqUWweZHTekc1QIIMWf6ZtlLIUJ65DB0Y",
        //     "refreshToken": "0dbb228085e66803afd224129f1cf3a251315ecc7f3116970fd07875bc55144965b727552e548c33"
        // }

        expectNoOk(response);
        const responseBody = await response.json();

        storeTokens(responseBody);

        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function changePassword(params, okHandler, failHandler) {
    const { password, token } = params;
    fetchWithRefresh(PASSWORD_CHANGE_URL, {
        method: "POST",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
    }).then(async (response) => {
        expectNoOk(response);
        const responseBody = await response.json();
        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function resetPassword(email, okHandler, failHandler) {
    fetchWithRefresh(PASSWORD_RESET_URL, {
        method: "POST",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    }).then(async (response) => {

        // {
        //     success: true,
        //     message: 'Reset email sent'
        // }

        expectNoOk(response);
        const responseBody = await response.json();
        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function getIngredients(okHandler, failHandler) {
    fetchWithRefresh(GET_INGRIDIENTS_URL, {
        method: "GET",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        expectNoOk(response);
        const responseBody = await response.json();
        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    });
}

export function checkoutOrder(ingredients, okHandler, failHandler, busyState) {

    busyState(true);

    const requestBody = JSON.stringify({ ingredients });
    fetchWithRefresh(CHECKOUT_ORDER_URL, {
        method: "POST",
        headers: {
            'Authorization': getAccessToken(),
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: requestBody,
    }).then(async (response) => {
        await expectNoOk(response);
        const responseBody = await response.json();
        okHandler(responseBody);
    }).catch((error) => {
        failHandler(error);
    }).finally(() => {
        if (busyState) {
            busyState(false);
        }
    });
}

export async function expectNoOk(response, resolvHandler, failHandler) {
    if (!response.ok) {
        const jsonBody = await response.json();
        const textBody = JSON.stringify(jsonBody);
        const message = `http status ${response.status} ${response.statusText} ${textBody}`;
        failHandler(new BurgerError(message, jsonBody))
        return;
    }

    if (resolvHandler) resolvHandler();
}

class BurgerError extends Error {
    constructor(message, jsonBody) {
        super(message);
        this.json = jsonBody;
    }
}