import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const AddQualityPage = () => {
  const history = useHistory();
  const { addQuality, error } = useQualities();
  const handleSubmit = (data) => {
    addQuality(data).then((data) => {
      if (data) {
        history.push("/");
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <>
      <h1>Add Quality</h1>
      <QualityForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddQualityPage;
