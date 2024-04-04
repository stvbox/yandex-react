import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { INGRIDIENTS_TYPES } from "../burger-ingredients";
import PropTypes from "prop-types";
import style from "./tabs.module.css";

export const Tabs = ({ current, setCurrent }) => {
    //const [current, setCurrent] = React.useState("one");
    return (
        <div className={style.tabs}>
            {Object.keys(INGRIDIENTS_TYPES).map(key => {
                return (<Tab key={key} value={key} active={current === key} onClick={setCurrent}>
                    {INGRIDIENTS_TYPES[key].title}
                </Tab>);
            })}
        </div>
    );
};

Tabs.propTypes = {
    current: PropTypes.string,
}
