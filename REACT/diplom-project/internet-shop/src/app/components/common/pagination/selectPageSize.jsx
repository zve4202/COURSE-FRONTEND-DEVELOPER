import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    value: PropTypes.number,
    onChangePageSize: PropTypes.func.isRequired,
    name: PropTypes.string
};

const sizeItems = [
    { value: 10, label: "10 / стр. " },
    { value: 50, label: "50 / стр." },
    { value: 100, label: "100 / стр." },
    { value: 200, label: "200 / стр." },
    { value: 500, label: "500 / стр." }
];

class SelectPageSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
        this.props.onChangePageSize(Number(target.value));
    };

    render() {
        return (
            <div className="page-item ms-3">
                <select
                    className="form-select"
                    id={this.props.name}
                    name={this.props.name}
                    value={this.state.value}
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
export default SelectPageSize;