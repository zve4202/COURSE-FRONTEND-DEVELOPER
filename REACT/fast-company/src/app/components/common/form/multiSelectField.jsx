import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  value: options[optionName]._id,
                  label: options[optionName].name
              }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                isMulti
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func
};

export default MultiSelectField;
