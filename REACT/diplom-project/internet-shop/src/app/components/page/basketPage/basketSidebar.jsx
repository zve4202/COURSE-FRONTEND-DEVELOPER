import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { getBasket, clearBasket } from "../../../store/basket";
import BackButton from "./backButton";
import ClearBasketButton from "./clearBasketButton";
import GoToPayButton from "./goToPayButton";

const BasketSidebar = () => {
    // console.log("BasketSidebar count", count);
    const basket = useSelector(getBasket());
    const dispatch = useDispatch();

    const nf = Intl.NumberFormat();

    const handleCheckAndPay = () => {
        console.log(basket);
    };

    const handleClearBasket = () => {
        dispatch(clearBasket());
    };

    return (
        <div className="sidebar_wrapper p-2 card bg-light flex-column me-2 h-100">
            <div
                className={classNames({
                    // "bg-secondary": true,
                    "mb-3": basket.totalQty > 0
                })}
            >
                <BackButton />
            </div>
            {basket.totalQty > 0 && (
                <ul className="list-group">
                    <div className="card-header list-group-item-success mb-3">
                        <i className="bi bi-cart-check me-2" />
                        Ваша корзина
                    </div>
                    <div className="card mb-3">
                        <div className="card-header">Итого заказно</div>
                        <div className="card-body">
                            <table className="table-borderless w-100">
                                <tbody>
                                    <tr>
                                        <td>Количество:</td>
                                        <td>
                                            <strong>{basket.totalQty}</strong>
                                        </td>
                                        <td>шт.</td>
                                    </tr>
                                    <tr>
                                        <td>На сумма:</td>
                                        <td>
                                            <strong>
                                                {nf.format(basket.totalPrice)}
                                            </strong>
                                        </td>
                                        <td>руб.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <li className="list-group-item list-group-item-danger mb-4">
                        <ClearBasketButton onAccept={handleClearBasket} />
                    </li>
                    <li className="list-group-item list-group-item-warning">
                        <GoToPayButton onAccept={handleCheckAndPay} />
                    </li>
                </ul>
            )}
        </div>
    );
};

export default BasketSidebar;
