import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import {
    addBasket,
    getBasketCountById,
    removeBasket
} from "../../../../store/basket";

import { curs } from "../../../../config.json";
import { Link } from "react-router-dom";

const ProductQty = ({ productId, max, price }) => {
    const inputEl = useRef(null);
    const qty = useSelector(getBasketCountById(productId));
    const [count, setCount] = useState(String(qty || ""));
    const dispatch = useDispatch();
    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^\d]/, "");

        setCount(value);
        if (value === "") {
            dispatch(removeBasket(productId));
        } else {
            const numCount = Math.max(0, Number(value));
            if (numCount === 0) {
                dispatch(removeBasket(productId));
            } else {
                dispatch(
                    addBasket({
                        id: productId,
                        qty: numCount,
                        price: price * curs
                    })
                );
            }
        }
        // setCount(target.value);
    };

    const removeOne = () => {
        inputEl.current.focus();
        const numCount = Number(count) - 1;
        if (numCount < 0) return;
        if (numCount === 0) {
            inputEl.current.value = "";
            return;
        }

        setCount(numCount);
        dispatch(
            addBasket({
                id: productId,
                qty: numCount,
                price: price * curs
            })
        );
    };
    const addOne = () => {
        inputEl.current.focus();
        const numCount = Number(count) + 1;
        setCount(numCount);
        dispatch(
            addBasket({
                id: productId,
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
            dispatch(removeBasket(productId));
        } else {
            dispatch(
                addBasket({ id: productId, qty: numCount, price: price * curs })
            );
        }
    };

    // const handleKeyDown = (event) => {
    //     console.log(event.keyCode);
    //     if ([9, 13, 40].includes(event.keyCode)) {
    //         event.preventDefault();
    //         const inputs = Array.prototype.slice.call(
    //             document.querySelectorAll("input.table-input")
    //         );

    //         const index =
    //             (inputs.indexOf(document.activeElement) + 1) % inputs.length;
    //         const input = inputs[index];
    //         input.focus();
    //         input.select();
    //     }
    //     if ([38].includes(event.keyCode)) {
    //         event.preventDefault();
    //         const inputs = Array.prototype.slice.call(
    //             document.querySelectorAll("input.table-input")
    //         );

    //         const index =
    //             (inputs.indexOf(document.activeElement) - 1) % inputs.length;
    //         console.log(index);
    //         const input = inputs[index >= 0 ? index : inputs.length - 1];
    //         input.focus();
    //         input.select();
    //     }
    // };

    return (
        <div className="input-group flex-nowrap">
            <span
                className="input-group-text"
                title="Перейти в корзину"
                role="button"
            >
                <Link aria-current="page" to="/basket">
                    <i className="bi bi-cart" />
                </Link>
            </span>
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
                className="form-control table-input"
                style={{ width: "45px" }}
                placeholder="нет"
                min={0}
                max={max}
                value={count}
                onChange={handleChange}
                onBlur={handleBlur}
                // onKeyDown={handleKeyDown}
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
};

ProductQty.propTypes = {
    productId: PropTypes.number.isRequired,
    max: PropTypes.number,
    price: PropTypes.number
};
export default ProductQty;
