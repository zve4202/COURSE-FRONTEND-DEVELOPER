import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  const drawIcon = (item) => {
    if (selectedSort.path === item) {
      return (
        <i
          className={
            "bi " +
            (selectedSort.order === "asc"
              ? "bi-caret-up-fill"
              : "bi-caret-down-fill")
          }
        ></i>
      );
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {drawIcon(columns[column].path)}
          </th>
        ))}

        {/* <th role="button" onClick={() => handleSort("name")} scope="col">
          Имя
        </th>
        <th scope="col">Качества</th>
        <th
          role="button"
          onClick={() => handleSort("profession.name")}
          scope="col"
        >
          Провфессия
        </th>
        <th
          role="button"
          onClick={() => handleSort("completedMeetings")}
          scope="col"
        >
          Встретился, раз
        </th>
        <th role="button" onClick={() => handleSort("rate")} scope="col">
          Оценка
        </th>
        <th role="button" onClick={() => handleSort("bookmark")} scope="col">
          Избранное
        </th>
        <th /> */}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};
export default TableHeader;
