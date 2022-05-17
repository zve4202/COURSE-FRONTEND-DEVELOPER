import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";
const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    const validatorConfig = {
        email: {
            isRequered: {
                massage: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                massage: "Email введен не корректно"
            }
        },
        password: {
            isRequered: { massage: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                massage: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                massage: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                massage: "Пароль должен состоять минимум из 8-им символов",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <h3 className="mb-4">Login</h3>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeHolder="Электронная почта"
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
