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

function getHeaders() {
    return {
        'Authorization': getAccessToken(),
        'Content-Type': 'application/json',
    };
}

export function logoutUser(okHandler, failHandler) {
    const token = getRefreshToken();
    fetchWithRefresh(AUTH_LOGOUT_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ token }),
    }).then(async (response) => {

        const _okHandler = (response) => {
            storeTokens(response);
            okHandler(response);
        };

        await expectNoOk(response, _okHandler, failHandler);
    }).catch((error) => {
        console.log('logoutUser: ', error);
    });
}

export function loadUserInfo(okHandler, failHandler) {
    fetchWithRefresh(USER_INFO_URL, {
        method: "GET",
        headers: getHeaders(),
    }).then(async (response) => {
        await expectNoOk(response, okHandler, failHandler);
    }).catch((error) => {
        console.log('loadUserInfo: ', error);
    });
}

export function updateUserInfo(params, okHandler, failHandler) {
    const { email, password, name } = params;
    fetchWithRefresh(USER_INFO_URL, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name }),
    }).then(async (response) => {
        expectNoOk(response, okHandler, failHandler);
    }).catch((error) => {
        console.log('updateUserInfo: ', error);
    });
}

export function authLogin(params, okHandler, failHandler) {
    const { email, password } = params;

    try {
        fetchWithRefresh(AUTH_LOGIN_URL, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ email, password }),
        }).then(async (response) => {

            const _okHandler = (response) => {
                storeTokens(response);
                okHandler(response);
            };

            expectNoOk(response, _okHandler, failHandler);
        }).catch((error) => {
            console.log('inner updateUserInfo: ', error);
            //failHandler(error);
        });
    } catch (error) {
        console.log('try updateUserInfo: ', error);
        //failHandler(error);
        //console.log('error: ', error);
    }
}

export function registerUser(params, okHandler, failHandler) {
    const { email, password, name } = params;
    fetchWithRefresh(REGISTE_USER_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then(async (response) => {
        expectNoOk(response, okHandler, failHandler);
        // const responseBody = await response.json();
        // storeTokens(responseBody);
        // okHandler(responseBody);
    }).catch((error) => {
        console.log('registerUser: ', error);
        //failHandler(error);
    });
}

export function changePassword(params, okHandler, failHandler) {
    const { password, token } = params;
    fetchWithRefresh(PASSWORD_CHANGE_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ password, token }),
    }).then(async (response) => {
        expectNoOk(response, okHandler, failHandler);
        // const responseBody = await response.json();
        // okHandler(responseBody);
    }).catch((error) => {
        console.log('changePassword: ', error);
        // failHandler(error);
    });
}

export function resetPassword(email, okHandler, failHandler) {
    fetchWithRefresh(PASSWORD_RESET_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
    }).then(async (response) => {
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
        headers: getHeaders(),
    }).then(async (response) => {
        expectNoOk(response, okHandler, failHandler);
        // const responseBody = await response.json();
        // okHandler(responseBody);
    }).catch((error) => {
        console.log('getIngredients: ', error);
        //failHandler(error);
    });
}

export function checkoutOrder(ingredients, okHandler, failHandler, busyState) {

    busyState(true);

    const requestBody = JSON.stringify({ ingredients });
    fetchWithRefresh(CHECKOUT_ORDER_URL, {
        method: "POST",
        headers: getHeaders(),
        mode: "cors",
        body: requestBody,
    }).then(async (response) => {
        await expectNoOk(response, okHandler, failHandler);
        // const responseBody = await response.json();
        // okHandler(responseBody);
    }).catch((error) => {
        console.log('checkoutOrder: ', error);
        //failHandler(error);
    }).finally(() => {
        if (busyState) {
            busyState(false);
        }
    });
}

export function expectNoOk(response, resolvHandler, failHandler) {
    const json = response.json;
    if (!response.ok) {
        const json = response.json;
        const textBody = JSON.stringify(json);
        const message = `http status ${response.status} ${response.statusText} ${textBody}`;
        failHandler({ message, json })
        return;
    }
    if (resolvHandler) resolvHandler(json);
}

class BurgerError extends Error {
    constructor(message, jsonBody) {
        super(message);
        this.json = jsonBody;
    }
}


// {
//     success: true,
//     message: 'Reset email sent'
// }

// {
//     "success": true,
//     "user": {
//         "email": "stvbox@yandex.ru",
//         "name": "Сергей"
//     },
//     "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjAwNTNhOTdlZGUwMDAxZDA2NjI0NyIsImlhdCI6MTcxMzM3NDUyMiwiZXhwIjoxNzEzMzc1NzIyfQ.RPUvzsFGpUmqUWweZHTekc1QIIMWf6ZtlLIUJ65DB0Y",
//     "refreshToken": "0dbb228085e66803afd224129f1cf3a251315ecc7f3116970fd07875bc55144965b727552e548c33"
// }

// {
//     "success": true,
//     "data": [
//       {
//         "_id": "643d69a5c3f7b9001cfa093c",
//         "name": "Краторная булка N-200i",
//         "type": "bun",
//         "proteins": 80,
//         "fat": 24,
//         "carbohydrates": 53,
//         "calories": 420,
//         "price": 1255,
//         "image": "https://code.s3.yandex.net/react/code/bun-02.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0941",
//         "name": "Биокотлета из марсианской Магнолии",
//         "type": "main",
//         "proteins": 420,
//         "fat": 142,
//         "carbohydrates": 242,
//         "calories": 4242,
//         "price": 424,
//         "image": "https://code.s3.yandex.net/react/code/meat-01.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa093e",
//         "name": "Филе Люминесцентного тетраодонтимформа",
//         "type": "main",
//         "proteins": 44,
//         "fat": 26,
//         "carbohydrates": 85,
//         "calories": 643,
//         "price": 988,
//         "image": "https://code.s3.yandex.net/react/code/meat-03.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0942",
//         "name": "Соус Spicy-X",
//         "type": "sauce",
//         "proteins": 30,
//         "fat": 20,
//         "carbohydrates": 40,
//         "calories": 30,
//         "price": 90,
//         "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0943",
//         "name": "Соус фирменный Space Sauce",
//         "type": "sauce",
//         "proteins": 50,
//         "fat": 22,
//         "carbohydrates": 11,
//         "calories": 14,
//         "price": 80,
//         "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa093f",
//         "name": "Мясо бессмертных моллюсков Protostomia",
//         "type": "main",
//         "proteins": 433,
//         "fat": 244,
//         "carbohydrates": 33,
//         "calories": 420,
//         "price": 1337,
//         "image": "https://code.s3.yandex.net/react/code/meat-02.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0940",
//         "name": "Говяжий метеорит (отбивная)",
//         "type": "main",
//         "proteins": 800,
//         "fat": 800,
//         "carbohydrates": 300,
//         "calories": 2674,
//         "price": 3000,
//         "image": "https://code.s3.yandex.net/react/code/meat-04.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa093d",
//         "name": "Флюоресцентная булка R2-D3",
//         "type": "bun",
//         "proteins": 44,
//         "fat": 26,
//         "carbohydrates": 85,
//         "calories": 643,
//         "price": 988,
//         "image": "https://code.s3.yandex.net/react/code/bun-01.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0944",
//         "name": "Соус традиционный галактический",
//         "type": "sauce",
//         "proteins": 42,
//         "fat": 24,
//         "carbohydrates": 42,
//         "calories": 99,
//         "price": 15,
//         "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0945",
//         "name": "Соус с шипами Антарианского плоскоходца",
//         "type": "sauce",
//         "proteins": 101,
//         "fat": 99,
//         "carbohydrates": 100,
//         "calories": 100,
//         "price": 88,
//         "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0946",
//         "name": "Хрустящие минеральные кольца",
//         "type": "main",
//         "proteins": 808,
//         "fat": 689,
//         "carbohydrates": 609,
//         "calories": 986,
//         "price": 300,
//         "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0947",
//         "name": "Плоды Фалленианского дерева",
//         "type": "main",
//         "proteins": 20,
//         "fat": 5,
//         "carbohydrates": 55,
//         "calories": 77,
//         "price": 874,
//         "image": "https://code.s3.yandex.net/react/code/sp_1.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0948",
//         "name": "Кристаллы марсианских альфа-сахаридов",
//         "type": "main",
//         "proteins": 234,
//         "fat": 432,
//         "carbohydrates": 111,
//         "calories": 189,
//         "price": 762,
//         "image": "https://code.s3.yandex.net/react/code/core.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa0949",
//         "name": "Мини-салат Экзо-Плантаго",
//         "type": "main",
//         "proteins": 1,
//         "fat": 2,
//         "carbohydrates": 3,
//         "calories": 6,
//         "price": 4400,
//         "image": "https://code.s3.yandex.net/react/code/salad.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
//         "__v": 0
//       },
//       {
//         "_id": "643d69a5c3f7b9001cfa094a",
//         "name": "Сыр с астероидной плесенью",
//         "type": "main",
//         "proteins": 84,
//         "fat": 48,
//         "carbohydrates": 420,
//         "calories": 3377,
//         "price": 4142,
//         "image": "https://code.s3.yandex.net/react/code/cheese.png",
//         "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
//         "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
//         "__v": 0
//       }
//     ]
//   }