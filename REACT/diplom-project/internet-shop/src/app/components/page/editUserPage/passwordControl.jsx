import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const PasswordControl = ({ userId, onShow, children }) => {
    const { currentUser } = useAuth();
    const [change, setChange] = useState(false);
    const handleChange = () => {
        setChange((prevSatte) => !prevSatte);
        onShow();
    };

    if (currentUser && currentUser._id === userId) {
        if (change) {
            return children;
        } else {
            return (
                <div className="mb-4">
                    <span
                        role="button"
                        className="btn btn-warning btn-sm"
                        onClick={handleChange}
                    >
                        Изменить пароль
                    </span>
                </div>
            );
        }
    }
    return null;
};

PasswordControl.propTypes = {
    userId: PropTypes.string,
    onShow: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default PasswordControl;
