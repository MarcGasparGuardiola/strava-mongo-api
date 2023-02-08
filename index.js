const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connect = require('./database/connect');

connect.createConnection();

app.use(cors());
app.use(express.json()); // Parseja bodies de json (ajax)
app.use(express.urlencoded({extended: true})); //Parseja bodies de form


app.use('/api/v1/activities/', require('./routes/activityRoutes'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`My First API running on port: ${process.env.PORT}`);
});