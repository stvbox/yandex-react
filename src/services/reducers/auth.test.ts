import { authUser, changePassword, getUserInfo, logoutUser, registerUser, updateUserInfo } from "../actions/auth";
import { authActions, authReducer, initialState } from "./auth";
import { AuthActions, IAuthState } from "./auth.types";

// const initialState: IAuthState = {
//     wait: false,
//     email: null,
//     name: null,
//     errorMessage: null
// }

const ERROR = 'error';

describe('authSlice', () => {
    it('Сброс ошибки авторизации', () => {
        const mockState = { ...initialState, errorMessage: ERROR };

        const action = authActions[AuthActions.RESET_AUTH_ERROR]();
        const state = authReducer(mockState, action);

        expect(state.errorMessage).toBeNull();
    });

    it('Установка информации о пользователе', () => {
        const action = authActions[AuthActions.SET_USER_INFO]({ name: 'Вася', email: 'foo@bar.foo' });
        const state = authReducer(initialState, action);

        expect(state.name).toBe('Вася');
        expect(state.email).toBe('foo@bar.foo');
    });

    it('Изменение пароля меняет статус ожидания', () => {
        let action = {
            type: changePassword.pending.type,
            payload: { password: 'foo@bar.foo', token: '!!!' }
        };
        let state = authReducer(initialState, action);
        expect(state.wait).toBeTruthy();

        action = { ...action, type: changePassword.rejected.type };
        state = authReducer(initialState, action);
        expect(state.wait).toBeFalsy();

        action = { ...action, type: changePassword.fulfilled.type };
        state = authReducer(initialState, action);
        expect(state.wait).toBeFalsy();
    });

    it('Обновление данных пользоветеля меняет статус ожидания', () => {
        let action = {
            type: updateUserInfo.pending.type,
            payload: { name: 'Вася', email: 'foo@bar.foo', password: 1 }
        };

        let state = authReducer(initialState, action);
        expect(state.wait).toBeTruthy();

        action = { ...action, type: changePassword.rejected.type };
        state = authReducer(initialState, action);
        expect(state.wait).toBeFalsy();

        action = { ...action, type: changePassword.fulfilled.type };
        state = authReducer(initialState, action);
        expect(state.wait).toBeFalsy();
    });

    it('Авторизация пользователя меняет состояние', () => {
        const action = { type: authUser.pending.type };
        let state = authReducer(initialState, action);
        expect(state.wait).toBeTruthy();

        const rejectAction = {
            type: authUser.rejected.type,
            error: { message: ERROR },
        };
        state = authReducer({ ...initialState, wait: true }, rejectAction);
        expect(state.wait).toBeFalsy();
        expect(state.errorMessage).toBe(ERROR);
        expect(state.name).toBeNull();
        expect(state.email).toBeNull();

        const fulfilledAaction = {
            type: authUser.fulfilled.type,
            payload: {
                json: {
                    user: {
                        name: 'Вася',
                        email: 'foo@bar.foo',
                    }
                }
            }
        };
        state = authReducer(initialState, fulfilledAaction);

        expect(state.wait).toBeFalsy();
        expect(state.name).toBe('Вася');
        expect(state.email).toBe('foo@bar.foo');
    });

    it('Выход пользователя меняет состояние', () => {
        const action = { type: logoutUser.fulfilled.type };
        let state = authReducer(initialState, action);
        expect(state.name).toBeNull();
        expect(state.email).toBeNull();
    });

    it('Запрос пользователя меняет состояние', () => {
        const action = { type: getUserInfo.pending.type };
        let state = authReducer(initialState, action);
        expect(state.wait).toBeTruthy();

        const rejectAction = {
            type: getUserInfo.rejected.type,
            error: { message: ERROR },
        };
        state = authReducer({ ...initialState, wait: true }, rejectAction);
        expect(state.wait).toBeFalsy();
        //expect(state.errorMessage).toBe(ERROR);
        expect(state.name).toBeNull();
        expect(state.email).toBeNull();

        const fulfilledAaction = {
            type: getUserInfo.fulfilled.type,
            payload: {
                json: {
                    user: {
                        name: 'Вася',
                        email: 'foo@bar.foo',
                    }
                }
            }
        };
        state = authReducer(initialState, fulfilledAaction);

        expect(state.wait).toBeFalsy();
        expect(state.name).toBe('Вася');
        expect(state.email).toBe('foo@bar.foo');
    });
});