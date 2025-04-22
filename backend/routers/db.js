// db router
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const DBName = process.env.DBName;

async function openDb (db){
    await mongoose.connect(db)
    .then(db => {
        console.log("Connected to DB")
    })
    .catch(error => console.log("ERROR to open DB"));
    
}

openDb(DBName);


// create a dbApp for the db application implementation and middleware
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Hello db Router!");
});

router.get("/international", (req, res) => {
    res.json([{country:"Angola", competition:"Girabola"}, {country:"Italia", competition: "Italinelli"}]);
})


module.exports = router;