import React from "react";
import PropTypes from "prop-types";
import BackButton from "../../common/backButton";
// import classNames from "classnames";

const ProductCard = ({ product }) => {
    if (!product) {
        return null;
    }

    return (
        <div className="p-2 card">
            <div className="card-header d-flex p-2 g-2 align-items-center ">
                <BackButton tooltip="Вернуться к покупкам" />
                <span>
                    <i className="bi bi-hand-thumbs-up"></i>
                    Информация по товару
                </span>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object
};

export default ProductCard;
