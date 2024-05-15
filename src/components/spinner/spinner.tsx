// import PropTypes from "prop-types";
import logo from "../../logo.svg";
import style from "./spinner.module.css";
import { FC } from "react";

interface IBurgerSpinnerProps {
    height?: number;
}

export const BurgerSpinner: FC<IBurgerSpinnerProps> = ({ height }) => {
    return (<img style={{ height }} src={logo} className={style.spinner} alt="spinner" />)
}

// BurgerSpinner.propTypes = {
//     height: PropTypes.number,
// }
