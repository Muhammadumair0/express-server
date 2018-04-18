let express = require("express");
const ExpressApp = require("./create-expres-app");
let app = express();

const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();



MongoClient.connect(process.env.DB_CONN, (err, db) => {

    if (err) {
        console.log(err);
    } else {
        ExpressApp(db).listen(3000, function (err) {
            if (err) { console.log("port is not working!!") } else {

                console.log("Listening on port 3000");
            }
        });
    }
});
