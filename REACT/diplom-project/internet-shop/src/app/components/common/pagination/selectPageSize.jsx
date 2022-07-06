import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string
};

const sizeItems = [
    { value: 10, label: "10 / стр. " },
    { value: 50, label: "50 / стр." },
    { value: 100, label: "100 / стр." },
    { value: 200, label: "200 / стр." },
    { value: 500, label: "500 / стр." }
];
// const defaultProps = {
//     value: 50
// };

class SelectPageSize extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {};
    // }

    handleChange = ({ target }) => {
        this.props.onChange({ name: target.name, value: target.value });
    };

    render() {
        return (
            <div className="page-item ms-3">
                <select
                    className="form-select"
                    id={this.props.name}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.handleChange}
                >
                    {sizeItems.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

SelectPageSize.propTypes = propTypes;
// SelectPageSize.defaultProps = defaultProps;
export default SelectPageSize;
