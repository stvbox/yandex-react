import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../..";

interface ICmpProps {
    element: ReactNode;
    ifAuth?: ReactNode | string;
    ifNotAuth?: ReactNode | string;
}

export const ProtectedRoute: FC<ICmpProps> = ({ element, ifAuth, ifNotAuth }) => {

    const { email } = useSelector((store: RootState) => ({
        email: store.auth.email,
    }));

    if (email) {
        if (ifAuth) {
            element = (typeof ifAuth == 'string')
                ? (<Navigate to={ifAuth} />) : ifAuth;
        }
    } else {
        if (ifNotAuth) {
            element = (typeof ifNotAuth == 'string')
                ? (<Navigate to={ifNotAuth} />) : ifNotAuth;
        }
    }

    return (<>{element}</>);
}