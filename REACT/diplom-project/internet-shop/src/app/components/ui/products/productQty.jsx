import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import {
    addBasket,
    getBasketCountById,
    removeBasket
} from "../../../store/basket";

import { curs } from "../../../config.json";
import { Link } from "react-router-dom";

const ProductQty = ({ productId, max, price }) => {
    const qty = useSelector(getBasketCountById(productId));
    const [count, setCount] = useState(String(qty || ""));
    const dispatch = useDispatch();
    const handleChange = ({ target }) => {
        setCount(target.value);
        if (target.value === "") {
            dispatch(removeBasket(productId));
        } else {
            const numCount = Math.max(0, Number(target.value));
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

    const handleKeyDown = (event) => {
        if ([9, 13].includes(event.keyCode)) {
            event.preventDefault();
            const inputs = Array.prototype.slice.call(
                document.querySelectorAll("input.table-input")
            );

            const index =
                (inputs.indexOf(document.activeElement) + 1) % inputs.length;
            const input = inputs[index];
            input.focus();
            input.select();
        }
    };

    return (
        <div className="input-group">
            <input
                type="number"
                className="form-control table-input"
                placeholder="нет"
                min={0}
                max={max}
                value={count}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                title="Введите количество чтобы добавить товар в корзину"
            />
            <span
                className="input-group-text"
                title="Перейти в корзину"
                role="button"
            >
                <Link aria-current="page" to="/basket">
                    <i className="bi bi-cart" />
                </Link>
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
