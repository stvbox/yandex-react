import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { INGRIDIENTS_TYPES_TITLES } from "../burger-ingredients";
import { FC } from "react";
import style from "./tabs.module.css";


interface TabsCompProps {
    current: string;
    className: string;
    setCurrent: (e: string) => void;
}

export const Tabs: FC<TabsCompProps> = ({ current, setCurrent }) => {
    //const [current, setCurrent] = React.useState("one");
    return (
        <div className={style.tabs}>
            {Object.keys(INGRIDIENTS_TYPES_TITLES).map(key => {
                return (<Tab
                    key={key}
                    value={key}
                    active={current === key}
                    onClick={setCurrent}>
                    {INGRIDIENTS_TYPES_TITLES[key].title}
                </Tab>);
            })}
        </div>
    );
};

// Tabs.propTypes = {
//     current: PropTypes.string,
//     setCurrent: PropTypes.func,
// }
