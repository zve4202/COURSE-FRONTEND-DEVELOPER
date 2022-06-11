exports.generateSimpleEntity = (data, model) => {
  return Promise.all(
    data.map(async (example) => {
      try {
        const exm = await model.find({
          name: example.name,
        });

        if (exm.length !== 0) {
          return exm[0];
        }
        const example_id = example._id;
        delete example._id;
        const newExm = new model(example);
        example._id = example_id;
        await newExm.save();
        return newExm;
      } catch (error) {
        return error;
      }
    })
  );
};

exports.generateSimpleEntity_AsIs = (data, model) => {
  return Promise.all(
    data.map(async (example) => {
      try {
        const exm = await model.find({
          _id: example._id,
        });

        if (exm.length !== 0) {
          return exm[0];
        }
        const newExm = new model(example);
        await newExm.save();
        return newExm;
      } catch (error) {
        return error;
      }
    })
  );
};

exports.getNewId = (mockId, data, mockData) => {
  const newItem = mockData.find((el) => el._id === mockId);
  return data.find((el) => el.name === newItem.name)._id;
};

exports.findNewIds = (mockIds, data, mockData) => {
  const newArray = [];
  for (const mockItem of mockData) {
    for (const mockId of mockIds) {
      if (mockId === mockItem._id) {
        for (const dataItem of data) {
          if (dataItem.name === mockItem.name) newArray.push(role._id);
        }
      }
    }
  }
  return newArray;
};
