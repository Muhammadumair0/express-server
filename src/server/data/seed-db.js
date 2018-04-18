require("dotenv").config();

const users = require("./users.json");
const contacts = require("./contacts.json");

const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const path = require("path");

function seedCollection(collectionName, initialRecords) {

  MongoClient.connect(process.env.DB_CONN, (err, db) => {
    console.log("Connected to mongoDB driver!!");
    if (err) {

      console.log(err);

    } else {
      const collection = db.collection(collectionName);

      collection.remove();

      initialRecords.forEach((item) => {
        if (item.password) {

          item.password = bcrypt.hashSync(item.password, 10);

        }
      });

      collection.insertMany(initialRecords, (err, result) => {

        console.log(`Number of data inserted:${result.insertedCount}`);
        console.log("closing connection!!");
        db.close();
      });
    }
  });
}


seedCollection('users', users);
seedCollection('contacts', contacts);



// require('dotenv').config();

// const users = require('./users');
// const contacts = require('./contacts');

// const MongoClient = require('mongodb').MongoClient;
// const bcrypt = require('bcrypt');

// function seedCollection(collectionName, initialRecords) {
//   MongoClient.connect(process.env.DB_CONN, (err, db) => {
//     console.log('connected to mongodb...');
// if(err) { console.log("the error is ", err); } else { 
//     const collection = db.collection(collectionName);

//     collection.remove();

//     initialRecords.forEach((item) => {
//       if (item.password) {
//         item.password = bcrypt.hashSync(item.password, 10);
//       }
//     });

//     collection.insertMany(initialRecords, (err, result) => {
//       console.log(`${result.insertedCount} records inserted.`);
//       console.log('closing connection...');
//       db.close();
//       console.log('done.');
//     });
//   }});
// }

// seedCollection('users', users);
// seedCollection('contacts', contacts);