import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../components/profile-navigation/profile-navigation';
import style from './profile-page.module.css';


export function ProfilePage() {
    return (<>
        <section className={`${style['section-wrapper']} pt-6`} >
            <div className={`${style['block']}`} >
                <ProfileNavigation />
                {/* <main className={style['profile-body']} >
                    <Outlet />
                </main> */}
                <Outlet />
            </div>
        </section >
    </>);
}
