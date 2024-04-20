import { AUTH_TOKEN_URL } from "./requests";
import { expectNoOk } from "./requests";


// setInterval(() => { // Обновление токенов за 1 секунду до наступления истечения
//     // localStorage.setItem('timestampToken', Date.now() - 1020000);
//     const timestampToken = localStorage.getItem('timestampToken');

//     if (!timestampToken) {
//         return;
//     }

//     if ((Number(timestampToken) + 1140000) < Date.now()) { // Пора обновить токен
//         refreshToken(response => {
//             console.log('refreshTokenTimerId(ok)', response);
//         }, error => {
//             console.log('refreshTokenTimerId(er)', error);
//         });
//     }
// }, 1000);

export function storeTokens(responseBody) {
    const { accessToken, refreshToken } = responseBody;
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('timestampToken', Date.now());
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('timestampToken');
    }
}

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

const checkReponse = (res) => {
    //return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    return res.ok ? res : res;
};

export const _refreshToken = () => {
    return fetch(AUTH_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        return await fetch(url, options).then(async (response) => {
            const respJson = await response.json();

            if (respJson.message === "jwt expired") {
                console.log(respJson);
            }

            return {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                json: async () => respJson,
            };
        }, (error) => {
            console.log(error);
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }
};

async function handleJwtExpire(response, url, options) {
    const respJson = await response.json();

    if (respJson.message === "jwt expired") {
        const refreshData = await _refreshToken(); //обновляем токен
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }

        storeTokens(refreshData)

        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);

        options.headers.authorization = refreshData.accessToken;
        return await fetch(url, options); //повторяем запрос
    }

    return response;
}