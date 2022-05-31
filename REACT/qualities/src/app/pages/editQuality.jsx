import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const EditQualityPage = () => {
  const id = useParams().id;
  const history = useHistory();
  const { getQuality, updateQuality, error } = useQualities();
  const quality = getQuality(id);

  const handleSubmit = (data) => {
    updateQuality({ ...data }).then((data) => {
      if (data) {
        history.push("/");
      } else {
        toast.error(error);
      }
    });

    if (error) toast.error(error);
  };

  return (
    <>
      <h1>Edit Quality Page</h1>
      <QualityForm data={quality} onSubmit={handleSubmit} />
    </>
  );
};

export default EditQualityPage;
