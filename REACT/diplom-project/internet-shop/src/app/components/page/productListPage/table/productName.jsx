import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductName = ({ data }) => {
    const { _id, article } = data;
    const { artist, name } = data.title;
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
                <Link className="text-decoration-none" to={`product/${_id}`}>
                    {name}
                </Link>
            </div>
        </div>
    );
};

ProductName.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductName;
