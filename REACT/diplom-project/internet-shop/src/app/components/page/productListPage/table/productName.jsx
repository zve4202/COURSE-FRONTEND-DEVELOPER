import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductName = ({ data }) => {
    const { _id: productId, article } = data;
    const { artist, title } = data.title;
    return (
        <div className="small">
            <div className="text-muted text-decoration-none">
                art: {article}
            </div>
            <div>
                <Link
                    className="text-decoration-none"
                    to={`artist/${artist._id}`}
                >
                    {artist.name}
                </Link>
            </div>
            <div>
                <Link
                    className="text-decoration-none"
                    to={`product/${productId}`}
                >
                    {title}
                </Link>
            </div>
        </div>
    );
};

ProductName.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductName;
