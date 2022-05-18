import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ value, onChange, name, options, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
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
                                onChange={handleChange}
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
