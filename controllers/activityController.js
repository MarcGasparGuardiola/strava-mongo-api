const c = require('../config/constants');
const activityService = require('../services/activityService');

module.exports = {
  selectById: async (req, res) => {
    const response = { status: c.status.serverError, msg: 'Internal server error' };
    try {
      const activityId = req.params.id;
      console.log("----------------ID----------")
      console.log(activityId)
      const resFromService = await activityService.selectById(activityId);
      console.log("--------Controller--------")
      console.log(resFromService)
      if (resFromService.status) {
        if (resFromService.result) {
          response.status = c.status.ok;
          response.msg = 'activity found';
          response.body = resFromService.result;
        } else {
          response.status = c.status.notFound;
          response.msg = 'activity not found';
        }
      }
    } catch (err) {
      console.log('ERROR-activityController-selectById: ', err);
      response.error = err;
    }
    res.status(response.status).send(response);
  },

  selectAll: async (req, res) => {
    const response = { status: c.status.serverError, msg: 'Internal server error' };
    try {
      const queryParams = {};
      if (req.query.active) queryParams.active = req.query.active;
      const pagination = {};
      if (req.query.skip) pagination.skip = +req.query.skip;
      if (req.query.limit) pagination.limit = +req.query.limit;
      const resFromService = await activityService.selectAll(queryParams, pagination);
      if (resFromService.status) {
        // response.status = c.status.ok;
        // response.body = resFromService.result;
        if (resFromService.result) {
          response.status = c.status.ok;
          response.msg = 'activities found';
          response.body = resFromService.result;
        } else {
          response.status = c.status.notFound;
          response.msg = 'activities not found';
        }
      }
    } catch (err) {
      console.log('ERROR-activityController-selectAll: ', err);
      response.error = err;
    }
    res.status(response.status).send(response);
  },

  create: async (req, res) => {
    const responseObj = { status: c.status.serverError, message: 'Internal server error' };
    try {
      const data = req.body;
      const responseFromService = await activityService.create(data);
      if (responseFromService.status) {
        responseObj.body = responseFromService.result;
        responseObj.message = 'activity created successfully';
        responseObj.status = c.status.created;
      }
    } catch (error) {
      responseObj.error = error;
      console.log('ERROR-activityController-create: ${error}');
    }
    return res.status(responseObj.status).send(responseObj);
  },

  update: async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
      const activity = req.body;
      activity.id = req.params.id;
      const responseFromService = await activityService.update(activity);
      if (responseFromService.status) {
        responseObj.body = responseFromService.result;
        responseObj.message = `activity updated successfully`;
        responseObj.status = 200;
      }
    } catch (error) {
      responseObj.error = error;
      console.log(`ERROR-activityController-update: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
  },

  delete: async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
      const activityId = req.params.id;
      const responseFromService = await activityService.delete(activityId);
      if (responseFromService.status) {
        responseObj.body = responseFromService.result;
        responseObj.message = `activity removed successfully`;
        responseObj.status = 200;
      }
    } catch (error) {
      responseObj.error = error;
      console.log(`ERROR-activityController-delete: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
  },
};