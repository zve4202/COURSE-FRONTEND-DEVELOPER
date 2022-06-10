import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const RoleControl = ({ children }) => {
    const { isAdmin } = useAuth();
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
