import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelected
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          className="list-group-item"
          key={items[item][valueProperty]}
          role="button"
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelected: PropTypes.func.isRequired
};

export default GroupList;
