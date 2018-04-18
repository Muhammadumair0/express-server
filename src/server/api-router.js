const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkJWT = require("express-jwt");

function apiRouter(database) {

    const router = express.Router();

    router.use(
        checkJWT({ secret: process.env.JWT_SECRET }).unless({ path: "/api/authenticate" }));

    router.use((err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
            res.status(401).json({ error: err.message });
        }
    });

    router.get("/api/contacts", function (req, res) {

        let contactCollections = database.collection("contacts");

        contactCollections.find({}).toArray((err, docs) => {

            res.send(docs);

        });

    });

    router.post("/api/contacts", (req, res) => {
        const user = req.body;
        const contactCollections = database.collection("contacts");

        contactCollections.insertOne(user, (err, r) => {

            if (err) {
                res.status(500).json("Error while inserting new record");
            }

            const newRecord = r.ops[0];
            return res.status(201).json(newRecord);
        });
    });

    router.post("/api/authenticate", (req, res) => {
        const user = req.body;
        const userCollection = database.collection("users");

        userCollection.findOne(
            { username: user.username }, (err, results) => {
                if (!results) {
                    res.status(404).json({ error: "User not found" });
                }

                if (!bcrypt.compareSync(user.password, results.password)) {
                    res.status(401).json({ error: "Wrong Password" });

                }
                const payLoad = {
                    "userName": results.userName,
                    "admin": results.admin
                };
                const token = jwt.sign(payLoad, process.env.JWT_SECRET, { "expiresIn": "6h" });

                return res.json({
                    "message": "Successfully Authenticated",
                    "token": token
                });
            });
    });

    return router;

}

module.exports = apiRouter;