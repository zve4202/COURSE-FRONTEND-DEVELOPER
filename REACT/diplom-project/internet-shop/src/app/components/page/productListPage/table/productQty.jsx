import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import {
    addBasket,
    getBasketCountById,
    removeBasket
} from "../../../../store/basket";

import { curs } from "../../../../config.json";

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
};

ProductQty.propTypes = {
    productId: PropTypes.number.isRequired,
    max: PropTypes.number,
    price: PropTypes.number
};
export default ProductQty;
