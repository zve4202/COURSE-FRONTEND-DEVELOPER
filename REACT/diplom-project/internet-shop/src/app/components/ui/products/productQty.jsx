import React, { useState } from "react";
import PropTypes from "prop-types";

const ProductQty = ({ productId, max, index }) => {
    const [count, setCount] = useState("");
    const handleChange = ({ target }) => {
        setCount(target.value);
    };

    const handleBlur = () => {
        if (!count) return;
        const numCount = String(Math.min(max, Math.max(0, Number(count))));

        if (numCount === "0") setCount("");
        else setCount(numCount);
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
        <div
            className="input-group"
            title="Введите количество чтобы добавить товар в корзину"
        >
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
            />
            <span className="input-group-text">
                <i className="bi bi-cart" />
            </span>
        </div>
    );
};

ProductQty.propTypes = {
    productId: PropTypes.number.isRequired,
    max: PropTypes.number,
    index: PropTypes.number
};
export default ProductQty;
