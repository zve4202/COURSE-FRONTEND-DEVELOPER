import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import Quality from "./quality";
import {
    getQualitiesLoading,
    getQualityByIdis,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    const isLoading = useSelector(getQualitiesLoading());
    if (isLoading) return "Loading...";
    const quals = useSelector(getQualityByIdis(qualities));
    return (
        <>
            {quals.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
