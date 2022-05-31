import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    if (!isLoading) {
        return (
            <>
                {qualities.map((qualKey) => {
                    const qual = getQuality(qualKey);
                    return <Quality key={qualKey} {...qual} />;
                })}
            </>
        );
    }
    return <p>Loading...</p>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
