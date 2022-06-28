import React from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import Quality from "./quality";
import {
    getQualitiesLoading,
    getQualityByIdis
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoading());
    if (isLoading) return "Loading...";
    const quals = useSelector(getQualityByIdis(qualities));
    return (
        <>
            {quals.map((qual) => (
                <Quality key={qual._id} qual={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
