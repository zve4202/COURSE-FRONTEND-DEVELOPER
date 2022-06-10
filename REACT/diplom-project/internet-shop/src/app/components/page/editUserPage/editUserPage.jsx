import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import BackHistoryButton from "../../common/backButton";
import { useRole } from "../../../hooks/useRoles";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { currentUser, isAdmin } = useAuth();
    const { userId } = useParams();
    // const history = useHistory();
    const user = useUser().getUser(userId);
    const [data, setData] = useState({});
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
        new_password: {
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
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
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
                            {currentUser && currentUser.id === data._id && (
                                <TextField
                                    label="Новый пароль"
                                    type="password"
                                    name="new_password"
                                    value={data.new_password}
                                    onChange={handleChange}
                                    error={errors.new_password}
                                />
                            )}
                            {isAdmin && (
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
                            )}
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
