import { BASE_URL } from "./constants";
import { FetchResponse } from "./requests";


export const AUTH_TOKEN_URL = BASE_URL + '/auth/token';

interface IFetchOptions extends RequestInit {
    timeout?: number;
}

export interface IStoreTokens {
    accessToken?: string,
    refreshToken?: string,
}

export function storeTokens(responseBody: IStoreTokens) {
    const { accessToken, refreshToken } = responseBody;
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('timestampToken', String(Date.now()));
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('timestampToken');
    }
}

export function getAccessToken(): string {
    return localStorage.getItem('accessToken') || '';
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

interface IRefreshTokenResponse {
    "refreshToken": string;
    "accessToken": string;
    "success": boolean;
}

export const _refreshToken = (): Promise<Response> => {
    const refreshRequestBody = JSON.stringify({
        token: getRefreshToken(),
    });
    return fetch(AUTH_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: refreshRequestBody,
    }).then(async (response) => {
        const json = await response.json() as IRefreshTokenResponse;
        storeTokens(json);
        return response;
    });
};

export function fetchWithRefresh<T>(url: string, options: IFetchOptions): Promise<FetchResponse<T>> {
    const returnThing = fetch(url, {
        ...options, timeout: 6000
    } as RequestInit).then(async (response) => {
        const respJson = await response.json();

        if (respJson.message === "jwt expired") { // При истечение токена пробуем обновить
            return await _refreshToken().then(result => {
                console.log('_refreshToken(result): ', result);
                return fetchWithRefresh<T>(url, options);
            }).catch(error => {
                console.log('_refreshToken(error): ', error);
            });
        }

        return { ...response, json: respJson }; // замена

    }, (error) => {
        console.log('fetchWithRefresh: ', error);
    });

    return returnThing as Promise<FetchResponse<T>>;
};

// async function handleJwtExpire(response, url: string, options) {
//     const respJson = await response.json();

//     if (respJson.message === "jwt expired") {
//         const refreshData = await _refreshToken(); //обновляем токен
//         if (!refreshData.success) {
//             return Promise.reject(refreshData);
//         }

//         storeTokens(refreshData)

//         localStorage.setItem("refreshToken", refreshData.refreshToken);
//         localStorage.setItem("accessToken", refreshData.accessToken);

//         options.headers.authorization = refreshData.accessToken;
//         return await fetch(url, options); //повторяем запрос
//     }

//     return response;
// }