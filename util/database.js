const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

require('dotenv').config();

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.ATLAS_URI)
  .then(result => {
    console.log('Connected@');
    callback(result);
  }).catch(err => {
    console.log(err);
  });
};

module.exports = mongoConnect;