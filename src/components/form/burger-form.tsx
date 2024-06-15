import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-form.module.css";
import { FC, ReactNode, SyntheticEvent } from "react";

export interface IInputItem {
    setValue(value: string): unknown;
    value: string;
    placeholder: string | undefined;
    type: "text" | "email" | "password" | undefined;
    name: string;

}

interface ICompArgs {
    children?: ReactNode;
    inputs: Array<IInputItem>;
    title?: string;
    buttonTitle?: string;
    buttonHandler?: (e: SyntheticEvent<Element, Event>) => void;
}

export const BurgersForm: FC<ICompArgs> = ({ children, inputs, title, buttonTitle, buttonHandler }) => {

    // const value = '';
    // const setValue = (value) => {
    //     console.log(`value: ${value}`);
    // };

    return (
        <div className={style['form-wrapper']} >
            <div className="text text_type_main-medium pb-6" >
                {title}
            </div>
            {inputs.map((input, index) => {
                return (<div className="pb-6" key={input.name + index} >
                    <Input
                        data-cy={`form-field-${input.name}`}
                        type={input.type}
                        placeholder={input.placeholder}
                        onChange={e => {
                            input.setValue(e.target.value);
                        }}
                        //icon={'CurrencyIcon'}
                        value={input.value}
                        name={input.name}
                        error={false}
                        //ref={inputRef}
                        //onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                </div>);
            })}
            {buttonTitle && (<>
                <div className="pt-6" >
                    <Button
                        data-cy={`form-button-submit`}
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={buttonHandler}
                    >
                        {buttonTitle}
                    </Button>
                </div>
                <div className="pt-20" >
                    {children}
                </div>
            </>)
            }
        </div>
    );
}