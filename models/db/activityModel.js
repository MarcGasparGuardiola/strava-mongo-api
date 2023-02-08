const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  resource_state: Number,
  location_country: String
});

module.exports = mongoose.model('Activity', activitySchema);
