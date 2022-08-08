import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PaginationWrapper from "../pagination/paginationWrapper";
import { updateSetting } from "../../../store/setting";

class Table extends Component {
    constructor(props) {
        super(props);

        // this.state = { inputs: null };
        this.name = this.props.name;
        this.config = this.props.config[this.name];
        this.handleKeyDown.bind(this);
        this.setInputs.bind(this);
        this.inputs = null;
    }

    setInputs() {
        this.inputs = document.querySelectorAll("input.table-input");
        console.log(this.inputs);
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.setInputs();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.length !== prevProps.data.length) {
            this.setInputs();
        }

        if (this.props.loading !== prevProps.loading) {
            if (this.props.loading) {
                const { inputs } = this;
                if (inputs && inputs.length > 0) {
                    inputs[0].focus();
                    inputs[0].select();
                } else window.scrollTo(0, 0);
            }
        }
    }

    handleKeyDown(event) {
        const { inputs } = this;
        if (!inputs || inputs.length === 0) return;
        console.log(event.keyCode);
        if ([9, 13, 40].includes(event.keyCode)) {
            event.preventDefault();
            const index =
                (inputs.indexOf(this.current.activeElement) + 1) %
                inputs.length;
            const input = inputs[index];
            input.focus();
            input.select();
        }
        if ([38].includes(event.keyCode)) {
            event.preventDefault();
            const index =
                (inputs.indexOf(document.activeElement) - 1) % inputs.length;
            console.log(index);
            const input = inputs[index >= 0 ? index : inputs.length - 1];
            input.focus();
            input.select();
        }
    }

    render() {
        const { name, onReload, columns, data, headered, loading } = this.props;
        return (
            <PaginationWrapper
                name={name}
                totalDocs={data.length}
                onChange={onReload}
            >
                <table
                    className={classNames({
                        "table table-hover": true,
                        "table-bordered": this.props.bordered,
                        "table-striped": this.props.striped
                    })}
                    onKeyDown={this.handleKeyDown}
                >
                    <TableHeader {...{ headered, name, onReload, columns }} />
                    <TableBody {...{ columns, data, loading }} />
                </table>
            </PaginationWrapper>
        );
    }
}

Table.defaultProps = {
    headered: true,
    bordered: false,
    striped: true,
    loading: false
};

Table.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array,
    loading: PropTypes.bool,
    columns: PropTypes.array,
    headered: PropTypes.bool,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    onReload: PropTypes.func,
    config: PropTypes.object,
    updateSetting: PropTypes.func
};

const mapStateToProps = (state) => ({
    config: state.setting.config
});

const mapDispatchToProps = {
    updateSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
