import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-form.module.css";


export function BurgersForm({ children, inputs, title, buttonTitle, buttonHandler }) {

    const value = '';

    const setValue = (value) => {
        console.log(`value: ${value}`);
    };

    return (
        <div className={style['form-wrapper']} >
            <div className="text text_type_main-medium pb-6" >
                {title}
            </div>
            {inputs.map((input, index) => {
                return (<div className="pb-6" key={input.name + index} >
                    <Input
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
                    <Button htmlType="button" type="primary" size="medium" onClick={buttonHandler} >
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