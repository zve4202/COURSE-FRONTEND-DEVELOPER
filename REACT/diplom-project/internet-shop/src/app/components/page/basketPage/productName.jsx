import React from "react";
import PropTypes from "prop-types";

const ProductName = ({ data }) => {
    const { article, artist, title } = data.title;
    return (
        <div className="small">
            <div className="text-muted">art: {article}</div>
            <div>{artist.name}</div>
            <div>{title}</div>
        </div>
    );
};

ProductName.propTypes = {
    data: PropTypes.object.isRequired
};
export default ProductName;
