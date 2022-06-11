import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import BackHistoryButton from "../../common/backButton";
import { useRole } from "../../../hooks/useRoles";
import { useUser } from "../../../hooks/useUsers";
import RadioField from "../../common/form/radioField";
import PasswordControl from "./passwordControl";
import RoleControl from "./roleControl";

const defaultData = {
    name: "",
    email: "",
    password: "",
    sex: "male",
    role: "user"
};

const EditUserPage = () => {
    const { userId } = useParams();
    const user = useUser().getUser(userId);
    const [data, setData] = useState(defaultData);
    useEffect(() => {
        setData(user);
    }, [user]);

    const { roles } = useRole();
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        name: {
            isRequired: {
                message: "Введите имя пользователя"
            }
        },
        role: {
            isRequired: {
                message: "Введите роль пользователя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleShowPassvord = () => {
        setData((prevState) => ({
            ...prevState,
            password: "",
            new_password: true
        }));
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <BackHistoryButton />
                    {roles.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <PasswordControl
                                userId={data._id}
                                onShow={handleShowPassvord}
                            >
                                <TextField
                                    label="Новый пароль"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            </PasswordControl>
                            <RoleControl>
                                <SelectField
                                    label="Роль пользователя"
                                    defaultOption="Выбрать..."
                                    defaultValue={data.role}
                                    options={roles.map((role) => ({
                                        label: role.name,
                                        value: role._id
                                    }))}
                                    onChange={handleChange}
                                    name="role"
                                    value={data.role}
                                    error={errors.role}
                                />
                            </RoleControl>
                            <RadioField
                                options={[
                                    { name: "Мужчина", value: "male" },
                                    { name: "Женщина", value: "female" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
