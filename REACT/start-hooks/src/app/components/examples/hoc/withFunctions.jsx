import React, { useEffect, useState } from "react";
import CardWrapper from "../../common/Card";

const withFunctions = (Component) => (props) => {
    const auth = localStorage.getItem("auth");
    const [isAuth, setIsAuth] = useState(auth != null);
    useEffect(() => {
        if (isAuth) {
            localStorage.setItem("auth", "token");
        } else {
            localStorage.removeItem("auth");
        }
    }, [isAuth]);
    //
    const onLogin = () => {
        setIsAuth(true);
    };
    const onLogOut = () => {
        setIsAuth(false);
    };

    return (
        <CardWrapper>
            <Component
                {...props}
                onLogin={onLogin}
                onLogOut={onLogOut}
                isAuth={isAuth}
            />
        </CardWrapper>
    );
};

export default withFunctions;
