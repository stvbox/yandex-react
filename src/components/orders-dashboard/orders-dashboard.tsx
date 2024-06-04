import { FC, useMemo } from "react";
import { RootState, useAppSelector } from "../..";
import style from "./orders-dashboard.module.css";


interface ICompProps {

}

type IStatusCounters = { [index: string]: string[] }

export const OrdersDashboard: FC<ICompProps> = () => {

    const { totalToday, orders, total } = useAppSelector((store: RootState) => ({
        totalToday: store.orders.totalToday,
        orders: store.orders.feed,
        total: store.orders.total,
    }));

    const statusCounters = orders.reduce((memo, order, index) => {

        if (!memo[order.status]) {
            memo[order.status] = [];
        }

        if (memo[order.status].length < 10) {
            memo[order.status].push(order.number);
        }

        return memo;
    }, { pending: [], done: [] } as IStatusCounters);

    //{"pending":1,"done":49}

    statusCounters.done = statusCounters.done.fill("", statusCounters.done.length, 10)
    const doneSlices = [statusCounters.done.slice(0, 5), statusCounters.done.slice(5, 10)];

    statusCounters.pending = statusCounters.pending.fill("", statusCounters.pending.length, 10)
    const pendingSlices = [statusCounters.pending.slice(0, 5), statusCounters.pending.slice(5, 10)];

    return (<>
        <div className={`${style['dashboard-wrapper']} pt-32`} >
            <div className={`${style['statuses-wrapper']} mb-15`} >
                <div className={`${style['ready-block']}`} >
                    <p className="text text_type_main-medium mb-6">
                        Готовые:
                    </p>
                    <div className={`${style['numbers']}`} >
                        {doneSlices.map((slice, column) => {
                            return (<div className={`${style['slice']}`} key={column} >
                                {slice.map(number => {
                                    return number ? (<p key={`${column}-${number}`} className="text text_type_digits-default mb-2">
                                        {number}
                                    </p>) : (<></>);
                                })}
                            </div>);
                        })}
                    </div>
                </div>
                <div className={`${style['div-block']}`} ></div>
                <div className={`${style['proced-block']}`} >
                    <p className="text text_type_main-medium mb-6">
                        В работе:
                    </p>
                    <div className={`${style['numbers']}`}>
                        {pendingSlices.map((slice, column) => {
                            return (<div className={`${style['slice']}`} key={column}>
                                {slice.map(number => {
                                    return number ? (<p key={`${column}-${number}`} className="text text_type_digits-default mb-2">
                                        {number}
                                    </p>) : (<></>);
                                })}
                            </div>);
                        })}
                        {/* {statusCounters.pending.map(number => {
                            return (<p className="text text_type_digits-default mb-2">
                                {number}
                            </p>);
                        })} */}
                    </div>
                </div>
            </div>
            <div className="text text_type_main-medium mt-15">
                Выполнено за все время:
            </div>
            <div className={`${style['total-numbers']} text text_type_digits-medium`}>
                {total}
            </div>
            <div className="text text_type_main-medium">
                Выполнено за сегодня:
            </div>
            <div className={`${style['total-numbers']} text text_type_digits-medium`}>
                {totalToday}
            </div>
        </div>
    </>);
}