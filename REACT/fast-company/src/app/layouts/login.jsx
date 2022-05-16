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
            }
        },
        password: {
            isRequered: { massage: "Пароль обязателен для заполнения" }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
