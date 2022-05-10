import React from "react";

const Bookmark = ({ _id, bookmark, onToggleBookMark }) => {
  const iconClass = () => {
    return "bi " + (bookmark === true ? "bi-suit-heart-fill" : "bi-suit-heart");
  };
  const handleToggleBookMark = () => {
    onToggleBookMark(_id);
  };
  return <i className={iconClass()} onClick={handleToggleBookMark}></i>;
};

export default Bookmark;
