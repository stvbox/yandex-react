import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export function ProtectedRouteElement({ element, ifAuth, ifNotAuth }) {

    const { email } = useSelector(store => ({
        email: store.burgerAuth.email,
    }));

    if (email) {
        if (ifAuth) {
            return (typeof ifAuth == 'string')
                ? (<Navigate to={ifAuth} />) : ifAuth;
        }
    } else {
        if (ifNotAuth) {
            return (typeof ifNotAuth == 'string')
                ? (<Navigate to={ifNotAuth} />) : ifNotAuth;
        }
    }

    return element;
}