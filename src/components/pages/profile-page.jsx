import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../profile-navigation/profile-navigation';
import style from './profile-page.module.css';


export function ProfilePage() {
    return (
        <section className={`${style['section-wrapper']}`} >
            <div className={`${style['block']}`} >
                <ProfileNavigation />
                <main className={style['profile-body']} >
                    <Outlet />
                </main>
            </div>
        </section >
    );
}
