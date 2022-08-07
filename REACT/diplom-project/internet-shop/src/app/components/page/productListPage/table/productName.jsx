import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductName = ({ data }) => {
    const { _id, article } = data;
    const { artist, name } = data.title;
    return (
        <div className="small" title="Показать полную информацию">
            <Link className="text-decoration-none" to={`/product/${_id}`}>
                <div className="text-muted text-decoration-none">
                    art: {article}
                </div>
                <div>{artist.name}</div>
                <div>{name}</div>
            </Link>
        </div>
    );
};

ProductName.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductName;
