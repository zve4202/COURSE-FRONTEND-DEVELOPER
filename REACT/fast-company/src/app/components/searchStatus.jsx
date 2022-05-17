import React from "react";
import PropTypes from "prop-types";
import SearchForm from "./searchForm";
const SearchStatus = ({ value, length, onHandleSeharch }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "человек тусанет";
        }
        if (lastOne === 1) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        return "человек тусанет";
    };

    return (
        <div>
            <div className="d-flex flex-row">
                <h2>
                    <span
                        className={
                            "badge " + (length > 0 ? "bg-primary" : "bg-danger")
                        }
                    >
                        {length > 0
                            ? `${
                                  length + " " + renderPhrase(length)
                              }   с тобой сегодня`
                            : "Никто с тобой не тусанет"}
                    </span>
                </h2>
            </div>
            <SearchForm
                value={value}
                onChange={onHandleSeharch}
                placeHolder="Search..."
            />
        </div>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number,
    value: PropTypes.string,
    onHandleSeharch: PropTypes.func
};

export default SearchStatus;
