import React from "react";
import PropTypes from "prop-types";
import TextField from "./textField";

const SearchForm = ({ value, onChange, placeHolder }) => {
    return (
        <div>
            <TextField
                name="searchField"
                onChange={onChange}
                value={value}
                placeHolder={placeHolder}
            />
        </div>
    );
};

SearchForm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string
};

export default SearchForm;
