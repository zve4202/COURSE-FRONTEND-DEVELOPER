import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import QualitiesTable from "../components/ui/qualitiesTable";
import { useQualities } from "../hooks/useQualities";

const QualitiesListPage = () => {
  const history = useHistory();
  const { qualities, deleteQuality, error } = useQualities();
  const handleEdit = (param) => {
    history.push(`/edit/${param}`);
  };

  const handleDelete = (param) => {
    deleteQuality(param).then((data) => {
      if (!data) {
        toast.error(error);
      }
    });
  };

  return (
    <>
      <h1>Qualitites List Page</h1>
      <QualitiesTable
        onDelete={handleDelete}
        onEdit={handleEdit}
        data={qualities}
      />
    </>
  );
};

export default QualitiesListPage;
