import { changePassword, registerUser, updateUserInfo } from "../actions/auth";
import { authActions, authReducer } from "./auth";
import { AuthActions, IAuthState } from "./auth.types";

const initialState: IAuthState = {
    wait: false,
    email: null,
    name: null,
    errorMessage: null
}

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

    it('Регистрация пользователя меняет состояние', () => {
        const action = { type: registerUser.pending.type };
        let state = authReducer(initialState, action);
        expect(state.wait).toBeTruthy();

        const rejectAction = {
            type: registerUser.rejected.type,
            error: { message: ERROR },
        };
        state = authReducer({ ...initialState, wait: true }, rejectAction);
        expect(state.wait).toBeFalsy();

        const fulfilledAaction = { type: changePassword.fulfilled.type };
        state = authReducer(initialState, fulfilledAaction);
        expect(state.wait).toBeFalsy();

    });
});