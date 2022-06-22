import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import {
    setAccessToken,
    getAccessToken,
    removeAccessToken
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const history = useHistory();

    async function getUser() {
        const onBoard = getAccessToken();
        if (onBoard) {
            try {
                const { content } = await authService.getAuthUser(onBoard);
                setUser(content);
            } catch (error) {}
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setAdmin(currentUser && currentUser.role === "admin");
    }, [currentUser]);

    async function signIn({ email, password }) {
        try {
            const data = await authService.signIn({
                email,
                password
            });
            console.log(data);
            setAccessToken(data);
            setUser(data.content);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                    case "INVALID_PASSWORD":
                        throw new Error("Email или пароль введены некорректно");
                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позже"
                        );
                }
            }
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const data = await authService.signUp({
                email,
                password,
                ...rest
            });
            setAccessToken(data);
            setUser(data.content);
        } catch (error) {
            console.log(error);
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
            // throw new Error
        }
    }

    function signOut() {
        removeAccessToken();
        setUser(null);
        history.push("/");
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider
            value={{ signUp, signIn, signOut, currentUser, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
