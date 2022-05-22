import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    const authClass = isAuth ? "secondary" : "primary";
    const authTitle = isAuth ? "Выйти из системы" : "Войти";
    const authFunc = isAuth ? onLogOut : onLogin;
    console.log(typeof authFunc);
    return (
        <button className={"btn btn-" + authClass} onClick={authFunc}>
            {authTitle}
        </button>
    );
};

SimpleComponent.propTypes = {
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func,
    isAuth: PropTypes.bool
};

export default SimpleComponent;
