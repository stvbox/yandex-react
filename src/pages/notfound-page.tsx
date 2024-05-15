import style from './notfound-page.module.css';


export function NotFound404() {
    return (<section className={`${style['section-wrapper']}`} >
        <h1>404 Not found</h1>
    </section>);
}