
module.exports.selectById = async (data) => {
  console.log("-------Select By Id--------")
  console.log(data)
  let response = { status: false };
  try {
    const doc = await data.model.findById(data._id, data.projection);
    console.log("---------Select By Id Result--------")
    console.log(doc)
    response = {
      status: true,
      result: doc,
    };
  } catch (err) {
    console.log('ERROR-repository-selectById: ', err);
  }
  return response;
}

module.exports.selectAll = async (data) => {
  let response = { status: false };
  try {
    console.log(data.skip)
    console.log(data.limit)
    const doc = await data.model.find(data.findQuery, data.projection).skip(data.skip).limit(data.limit);
    response = {
      status: true,
      result: doc,
    };
  } catch (err) {
    console.log('ERROR-repository-selectAll: ', err);
  }
  return response;
}

module.exports.save = async (objToSave) => {
  let responseObj = { status: false };
  try {
    const doc = await objToSave.save();
    responseObj = {
      result: doc,
      status: true
    };
  } catch (error) {
    responseObj.error = error;
    console.log(`ERROR-crudRepository-save: ${error}`);
  }
  return responseObj;
};

module.exports.findOneAndUpdate = async (data) => {
  let responseObj = { status: false };
  try {
    const doc = await data.model.findOneAndUpdate(data.findQuery, data.updateQuery,
      { projection: data.projection, new: true });
    responseObj = {
      result: doc,
      status: true
    };
  } catch (error) {
    responseObj.error = error;
    console.log(`ERROR-crudRepository-findOneAndUpdate: ${error}`);
  }
  return responseObj;
};

module.exports.findOneAndDelete = async (data) => {
  let responseObj = { status: false };
  try {
    const doc = await data.model.findOneAndDelete(data.findQuery,
      { projection: data.projection });
    responseObj = {
      result: doc,
      status: true
    };
  } catch (error) {
    responseObj.error = error;
    console.log(`ERROR-crudRepository-findOneAndDelete: ${error}`);
  }
  return responseObj;
}; 