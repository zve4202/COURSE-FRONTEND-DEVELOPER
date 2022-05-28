import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import axios from "axios";

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.log("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const EditQualityPage = () => {
  const id = useParams().id;
  const qualityEnPoint = `http://localhost:4000/api/v1/quality/${id}`;
  const [quality, setQuality] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(qualityEnPoint);
      setQuality(data.content);
    }
    fetchData();
  }, [qualityEnPoint]);

  const handleSubmit = async (data) => {
    try {
      await axios
        .put(qualityEnPoint + "ajaj", data)
        .then((res) => console.log(res.data.content));
    } catch (error) {
      console.log("Expected error");
    }
  };

  return (
    <>
      <h1>Edit Quality Page</h1>{" "}
      {quality === null ? (
        "Loading..."
      ) : (
        <EditForm data={quality} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default EditQualityPage;
