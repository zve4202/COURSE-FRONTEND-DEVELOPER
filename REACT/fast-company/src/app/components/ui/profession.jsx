import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getProfession, getProfessionsLoading } from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoading());
    const prof = useSelector(getProfession(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
