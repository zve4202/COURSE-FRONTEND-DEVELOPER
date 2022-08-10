import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import {
    addBasket,
    getBasketCountById,
    removeBasket
} from "../../../../store/basket";
import {
    addReminder,
    getReminder,
    loadReminders,
    removeReminder,
    updateReminder
} from "../../../../store/reminders";
import { curs } from "../../../../config.json";

const ProductQty = ({ data }) => {
    const { title, price, count: max } = data;
    const inputEl = useRef(null);
    const qty = useSelector(getBasketCountById(data._id));
    const [count, setCount] = useState(String(qty || ""));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadReminders());
    }, []);

    const reminder = useSelector(getReminder(title._id));

    const checkValue = (value) => {
        const result = Math.min(max, Math.max(0, Number(value || "0")));
        setCount(result || "");
        return result;
    };
    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^\d]/, "");
        const numCount = checkValue(value);
        if (numCount === 0) {
            dispatch(removeBasket(data._id));
        } else {
            dispatch(
                addBasket({
                    id: data._id,
                    qty: numCount,
                    price: price * curs
                })
            );
        }
    };

    const removeOne = () => {
        inputEl.current.focus();
        const numCount = checkValue(Number(count || "0") - 1);
        if (numCount < 0) return;
        if (numCount === 0) {
            dispatch(removeBasket(data._id));
        } else {
            dispatch(
                addBasket({
                    id: data._id,
                    qty: numCount,
                    price: price * curs
                })
            );
        }
    };
    const addOne = () => {
        inputEl.current.focus();
        const numCount = checkValue(Number(count || "0") + 1);
        dispatch(
            addBasket({
                id: data._id,
                qty: numCount,
                price: price * curs
            })
        );
    };

    const handleBlur = () => {
        if (count === "0") {
            setCount("");
            return;
        } else if (!count) return;

        const numCount = Math.min(max, Math.max(0, Number(count)));
        if (numCount === 0) {
            dispatch(removeBasket(data._id));
        } else {
            dispatch(
                addBasket({
                    id: data._id,
                    qty: numCount,
                    price: price * curs
                })
            );
        }
    };

    const handleToggle = ({ target }) => {
        if (target.nodeName !== "SPAN") {
            target = target.parentNode;
        }

        if (target.nodeName === "SPAN") {
            if (target.id === "nothing" && !reminder) return;
            if (reminder === target.id) return;

            if (target.id === "nothing") {
                dispatch(removeReminder(title._id));
            } else if (!reminder) {
                dispatch(
                    addReminder({ titleId: title._id, reminder: target.id })
                );
            } else {
                dispatch(
                    updateReminder({
                        titleId: title._id,
                        reminder: target.id
                    })
                );
            }
        }
    };

    if (max > 0) {
        return (
            <div className="input-group flex-nowrap">
                <span
                    className="input-group-text"
                    title="Удалить 1"
                    role="button"
                    onClick={removeOne}
                >
                    <i className="bi bi-dash-circle"></i>
                </span>
                <input
                    ref={inputEl}
                    type="text"
                    className="form-control table-input text-center"
                    style={{ width: "45px" }}
                    placeholder="нет"
                    min={0}
                    max={max}
                    value={count}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    title="Введите количество чтобы добавить товар в корзину"
                />
                <span
                    className="input-group-text"
                    title="Добавить 1"
                    role="button"
                    onClick={addOne}
                >
                    <i className="bi bi-plus-circle"></i>
                </span>
            </div>
        );
    } else {
        return (
            <div
                className="btn-group mt-2 w-100"
                role="group"
                onClick={handleToggle}
            >
                <span
                    id="notify-me"
                    className={classNames({
                        "btn btn-outline-info": true,
                        active: reminder === "notify-me"
                    })}
                    title="Оповестить меня, в случае постуаления"
                >
                    <i className="bi bi-envelope" />
                </span>

                <span
                    id="to-order"
                    className={classNames({
                        "btn btn-outline-danger": true,
                        active: reminder === "to-order"
                    })}
                    title="При поступлении добавить в заказ, и оповестить меня"
                >
                    <i className="bi bi-bag" />
                </span>

                {reminder && (
                    <span
                        id="nothing"
                        className="btn btn-outline-secondary"
                        title="Ничего не нужно"
                    >
                        <i className="bi bi-x-circle" />
                    </span>
                )}
            </div>
        );
    }
};

ProductQty.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductQty;
