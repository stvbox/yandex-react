import PropTypes from "prop-types";
import logo from "../../logo.svg";
import style from "./spinner.module.css";


export function BurgerSpinner({ height }) {
    return (<img style={{ height }} src={logo} className={style.spinner} alt="spinner" />)
}

BurgerSpinner.propTypes = {
    height: PropTypes.number,
}