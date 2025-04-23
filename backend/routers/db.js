// db router
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const DBName = process.env.DBName;

// create a dbApp for the db application implementation and middleware
const router = express.Router();

async function openDb (db){
    await mongoose.connect(db)
    .then(db => {
        console.log("Connected to DB")
    })
    .catch(error => console.log("ERROR to open DB"));
    
}

openDb(DBName);


//middleware
router.use(express.text());


// routes
router.get("/", (req, res) => {
    console.log("Hello db Router!");
});

router.get("/international", (req, res) => {
    res.json([{country:"Angola", competition:"Girabola"}, {country:"Italia", competition: "Italinelli"}]);
})

router.post("/international", (req, res) => {
    console.log("Post Method active");
    console.log(JSON.parse(req.body));

    //const playerSchema = new mongoose.Schema(JSON.parse(req.body));
    //const playerModel = mongoose.model("players", playerSchema);
})


module.exports = router;