const mongoose = require('mongoose');
const Activity = require('../models/db/activityModel');
const activityRepository = require('../database/repository');
const c = require('../config/constants')

module.exports.selectById = async (activityId) => {
  const response = { status: false };
  try {
    const data = {
      _id: mongoose.Types.ObjectId(activityId),
      model: Activity,
      projection: {

      }
    };
    const resFromRepo = await activityRepository.selectById(data);
    console.log("------ID Service--------")
    console.log(resFromRepo)
    if (resFromRepo.status) {
      response.result = resFromRepo.result;
      response.status = true;
    }
  } catch (err) {
    console.log('ERROR-activityService-selectById: ', err);
  }
  return response;
}

module.exports.selectAll = async (queryParams, pagination) => {
  const response = { status: false };
  try {
    const data = {
      findQuery: queryParams,
      model: Activity,
      projection: {
        __v: false
      }
    };
    if (pagination.skip && pagination.limit) {
      data.skip = pagination.skip;
      data.limit = pagination.limit;
    }
    const resFromRepo = await activityRepository.selectAll(data);
    if (resFromRepo.status) {
      response.result = resFromRepo.result;
      response.status = true;
    }
  } catch (err) {
    console.log('ERROR-activityService-selectAll: ', err);
  }
  return response;
}

module.exports.create = async (dataFromController) => {
  const responseObj = { status: false };
  console.log(dataFromController)
  try {
    const activity = new activity(dataFromController);
    const responseFromRepository = await activityRepository.save(activity);
    if (responseFromRepository.status) {
      responseObj.result = responseFromRepository.result;
      responseObj.status = true;
    }
  } catch (error) {
    responseObj.error = error;
    console.log(`ERROR-activityService-create: ${error}`);
  }
  return responseObj;
};

module.exports.update = async (activity) => {
  const responseObj = { status: false };
  try {
    const data = {
      findQuery: { _id: mongoose.Types.ObjectId(activity.id) },
      model: activity,
      projection: { __v: false },
      updateQuery: {}
    };
    if (activity.toAirport) data.updateQuery.toAirport = activity.toAirport;
    if (activity.fromAirport) data.updateQuery.fromAirport = activity.fromAirport;
    if (activity.departureDate) data.updateQuery.departureDate = activity.departureDate;
    if (activity.arrivalDate) data.updateQuery.arrivalDate = activity.arrivalDate;
    if (activity.price) data.updateQuery.price = activity.price;
    if (activity.passangerName) data.updateQuery.passangerName = activity.passangerName;

    // TODO Add other activity parametres

    const responseFromRepository = await activityRepository.findOneAndUpdate(data);
    if (responseFromRepository.status) {
      responseObj.result = responseFromRepository.result;
      responseObj.status = true;
    }
  } catch (error) {
    responseObj.error = error;
    console.log(`ERROR-activityService-update: ${error}`);
  }
  return responseObj;
};

module.exports.delete = async (activityId) => {
  const responseObj = { status: false };
  try {
    const data = {
      findQuery: { _id: mongoose.Types.ObjectId(activityId) },
      model: Activity,
      projection: { __v: false}
    };
    const responseFromRepository = await activityRepository.findOneAndDelete(data);
    if (responseFromRepository.status) {
      if (responseFromRepository.result) {
        responseObj.result = responseFromRepository.result;
      } else {
        responseObj.result = c.status.notFound;
        responseObj.message = "activity not found";
      }

      responseObj.status = true;
    }
  } catch (error) {
    responseObj.error = error;
    console.log(`ERROR-activityService-delete: ${error}`);
  }
  return responseObj;
};