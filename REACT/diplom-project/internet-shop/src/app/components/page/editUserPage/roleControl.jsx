import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAdmin } from "../../../store/auth";

const RoleControl = ({ children }) => {
    const isAdmin = useSelector(getAdmin());

    if (isAdmin) {
        return children;
    }
    return null;
};

RoleControl.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default RoleControl;
