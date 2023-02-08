const express = require('express');
const router = express.Router();

const activityController = require('../controllers/activityController');
const joiMiddleware = require('../middlewares/joiMiddleware');
const activitySchemas = require('../models/joi/activitySchemas');

router.get('/details/:id',
  activityController.selectById
);

router.get('/list', activityController.selectAll
);

router.post('/create',
  activityController.create);

router.put('/update/:id', activityController.update);

router.delete('/delete/:id',
  activityController.delete);

module.exports = router;