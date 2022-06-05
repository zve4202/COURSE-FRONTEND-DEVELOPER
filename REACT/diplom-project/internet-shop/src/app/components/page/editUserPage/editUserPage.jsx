import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useRole } from "../../../hooks/useRoles";
// import { useUser } from "../../../hooks/useUsers";

const EditUserPage = () => {
    // const { userId } = useParams();
    // const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    // const { users } = useUser();
    const [data, setData] = useState({
        name: "",
        email: "",
        roles: []
    });
    const { roles } = useRole();
    // const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});
    // const getRoles = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in roles) {
    //             if (elem.value === roles[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: roles[quality].value,
    //                     name: roles[quality].label,
    //                     color: roles[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // const { roles } = data;
        console.log(data);
        // api.users
        //     .update(userId, {
        //         ...data,
        //         profession: getProfessionById(profession),
        //         roles: getRoles(roles)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`));
        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     roles: getRoles(roles)
        // });
    };
    // const transformData = (data) => {
    //     return data.map((qual) => ({ label: qual.name, value: qual._id }));
    // };
    // useEffect(() => {
    //     setLoading(true);
    //     api.users.getById(userId).then(({ profession, roles, ...data }) =>
    //         setData((prevState) => ({
    //             ...prevState,
    //             ...data,
    //             roles: transformData(roles),
    //             profession: profession._id
    //         }))
    //     );
    //     api.professions.fetchAll().then((data) => {
    //         const professionsList = Object.keys(data).map((professionName) => ({
    //             label: data[professionName].name,
    //             value: data[professionName]._id
    //         }));
    //         setProfession(professionsList);
    //     });
    //     api.roles.fetchAll().then((data) => {
    //         const qualitiesList = Object.keys(data).map((optionName) => ({
    //             value: data[optionName]._id,
    //             label: data[optionName].name,
    //             color: data[optionName].color
    //         }));
    //         setRoles(qualitiesList);
    //     });
    // }, []);
    useEffect(() => {
        if (data._id) setLoading(false);
    }, [data]);

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
                    {!isLoading && roles.length > 0 ? (
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
                            <TextField
                                label="Пароль"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <MultiSelectField
                                defaultValue={data.roles}
                                options={roles}
                                onChange={handleChange}
                                name="roles"
                                label="Роли пользователя"
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
