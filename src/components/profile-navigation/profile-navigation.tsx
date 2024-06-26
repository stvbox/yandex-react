import { NavLink } from 'react-router-dom';
import { useCallback } from 'react';
import style from './profile-navigation.module.css';
import { useAppDispatch } from '../..';
import { logoutUser } from '../../services/actions/auth';


const PROFILE_ROOT_URL = '/profile';

const NAV_LINKS = [
    { to: PROFILE_ROOT_URL, title: 'Профиль' },
    { to: `${PROFILE_ROOT_URL}/orders`, title: 'История' },
];

export function ProfileNavigation() {
    const dispatch = useAppDispatch();

    const logoutHandler = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(logoutUser());
        //dispatch(logoutUserAction());
    }, []);

    return (
        <nav className={`${style['profile-nav']} text text_type_main-medium`} >
            {NAV_LINKS.map(link => {
                return (
                    <NavLink
                        to={link.to}
                        className={({ isActive }) => {
                            if (link.to == PROFILE_ROOT_URL && link.to != window.location.pathname) {
                                return 'p-3';
                            }
                            return (isActive ? style['active'] : '') + ' p-3';
                        }}
                        //className={`p-3 ${location.pathname == link.to && style['active']} `}
                        key={link.to} >
                        {link.title}
                    </NavLink>
                );
            })}
            <a className="p-3 false" href='#' onClick={logoutHandler} >Выход</a>
        </nav>
    );
}