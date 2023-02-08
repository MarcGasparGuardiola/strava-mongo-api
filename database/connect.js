const mongoose = require('mongoose');

module.exports.createConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(process.env.DB_URL);
    console.log('DB Connected!');

    mongoose.connection.db.listCollections().toArray(function(err, names) {
      if (err) {
          console.log(err);
      }
      else {
          names.forEach(function(e,i,a) {
              //mongoose.connection.db.dropCollection(e.name);
              console.log("--->>", e.name);
          });
      }
  });
    mongoose.connection.on('error', (error) => {
      console.log('ERROR The connection was interrupted: ', error);
    });
  } catch (err) {
    console.log('ERROR Cannot connect to the DB: ', err);
  }
};