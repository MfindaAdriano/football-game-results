// db router
const express = require('express');
const mongoose = require('mongoose');
const fs = require("fs");
const DbAssets = require('./dbAssets.js');

require("dotenv").config();

const DBName = process.env.DBName;

// create a dbApp for the db application implementation and middleware
const router = express.Router();


/*
// Seeding initial data to the database
let folderCsv = process.cwd() + "/seedData/from-transfermarkt/";
let folderInterCsv = process.cwd() + "/seedData/inter-foot-1872-2025/";
let filename = "";
//filename = folderCsv + 'competitions.csv';
//filename = folderCsv +'clubs.csv';
//filename =  folderCsv + 'players.csv';
//filename = folderCsv + 'games.csv';

//international games
//filename = folderInterCsv + "former_names.csv";
//filename = folderInterCsv + "goalscorers.csv";
//filename = folderInterCsv + "shootouts.csv";
filename = folderInterCsv + "results.csv";
// Seeding initial data to the database
*/


//Database implementation
//Open Database
DbAssets.openDb(DBName)
.then(() => {
    /*
    DbAssets.segregateDataFromDB(DbAssets.dbModels.InternationalResultModel, "home_team", (arr) => {
        console.log(arr);
    })
    
    //Seeding data from CSVs file to objects and to the Database
    // From assets.js file to handle csv files
    fs.readFile(filename, (error, csvString) => {
        //console.log();
        //console.log(csvToObject(csvString));
        DbAssets.csvToObject(csvString, dataObj => {
            //for(obj of dataObj) {console.log(dataObj);}
            //DbAssets.writeObjToDb(DbAssets.dbModels.CompetitionModel, dataObj[0]);
           DbAssets.seedCollection(DbAssets.dbModels.InternationalResultModel, dataObj);
        })
    })
    */
});
//Database implementation



//middleware
router.use(express.text());


// routes
router.get("/", (req, res) => {
    console.log("Hello db Router!");
});

router.get("/international", async (req, res) => {
   //const dbResult = await DbAssets.readFromDb(DbAssets.dbModels.InternationalResultModel, {home_team: 'italy'});
   DbAssets.segregateDataFromDB(DbAssets.dbModels.InternationalResultModel, "home_team", "away_team", "tournament", (arr) => {
        console.log(arr);
        res.json(arr); 
    })
   //res.json(dbResult); 
   //res.json([{country:"Angola", competition:"Girabola"}, {country:"Italia", competition: "Italinelli"}]);
})

router.post("/international", (req, res) => {
    const seedObj = JSON.parse(req.body);
    //console.log("Post Method active");
    console.log(seedObj);

    //const playerSchema = new mongoose.Schema(JSON.parse(req.body));
    //const playerModel = mongoose.model("players", playerSchema);
})


module.exports = router;