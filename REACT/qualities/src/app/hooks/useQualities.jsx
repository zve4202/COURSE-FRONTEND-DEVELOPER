import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext();
export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currState = useState();
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        const { message } = error;
        setError(message);
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return content;
          } else {
            return item;
          }
        })
      );
      return content;
    } catch (error) {
      const { message } = error;
      setError(message);
    }
  };
  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (error) {
      const { message } = error;
      setError(message);
    }
  };
  const deleteQuality = async (id) => {
    currState.current = qualities;
    setQualities((prevState) => prevState.filter((item) => item._id !== id));
    try {
      const { content } = await qualityService.delete(id);
      return content;
    } catch (error) {
      const { message } = error;
      setError(message);
      setQualities(currState.current);
    }
  };

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
        error,
      }}
    >
      {!isLoading ? children : <h1>Загрузка...</h1>}
    </QualitiesContext.Provider>
  );
};
