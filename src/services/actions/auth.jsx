import { loadUserInfo, logoutUser } from "../../utils/requests";

export const WAIT_USER_INFO = 'WAIT_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';

export const logoutUserAction = () => {
    return function (dispatch) {
        logoutUser((response) => {
            dispatch({ type: SET_USER_INFO, payload: { email: null, name: null } });
            dispatch(getUserInfo());
        }, (error) => {
            console.log('logoutHandler(error): ', error);
        });
    }
};

export const getUserInfo = () => {

    return function (dispatch) {

        console.log(' ------------------------------------------------- ');

        dispatch({ type: WAIT_USER_INFO, payload: true });

        loadUserInfo(response => {

            console.log('getUserInfo: ', response);

            const { email, name } = response['user'];
            dispatch({ type: SET_USER_INFO, payload: { email, name } });
            dispatch({ type: WAIT_USER_INFO, payload: false });
        }, error => {
            try {
                const { message } = error.json;
                if (message == 'jwt expired') {
                    dispatch({ type: SET_USER_INFO, payload: { email: null, name: null } });
                }
                dispatch({ type: WAIT_USER_INFO, payload: false });
            } catch (error) {
                console.log('error: ', error);
                dispatch({ type: WAIT_USER_INFO, payload: false });
            }
        });
    }
};