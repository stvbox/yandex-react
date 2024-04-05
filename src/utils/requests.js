

const BASE_URL = 'https://norma.nomoreparties.space/api';
const GET_INGRIDIENTS_URL = BASE_URL + '/ingredients';
const CHECKOUT_ORDER_URL = BASE_URL + '/orders';

export function getIngredients(okHandler, failHandler) {
    fetch(GET_INGRIDIENTS_URL).then(async (response) => {
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
    fetch(CHECKOUT_ORDER_URL, {
        method: "POST",
        headers: {
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

async function expectNoOk(response) {
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(
            `http status ${response.status} ${response.statusText} ${responseText}`
        );
    }
}
