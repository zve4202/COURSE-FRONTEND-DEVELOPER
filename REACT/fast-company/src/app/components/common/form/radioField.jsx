import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ value, onChange, name, options, label }) => {
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>{" "}
            {options &&
                options.map((option) => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            checked={option.value === value}
                            id={option.name + "_" + option.value}
                            value={option.value}
                            onChange={onChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
        </div>
    );
};

RadioField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.array,
    label: PropTypes.string
};

export default RadioField;
