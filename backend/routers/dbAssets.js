// assets.js file
const fs = require('fs');

const mongoose = require('mongoose');

// model names and schema Objects
const playerModelName = "players";
const clubModelName = "clubs";
const competitionModelName = "competitions";
const gameModelName = "games";
const internationalGameModelName = "internationalGames";

// function to convert csv file to object
function csvToObject(fileString, callback){
    if(fileString != null){
        let lines = fileString.toString().split("\n");
        const keys = lines[0].split(",");

        lines.shift(); // remove keys line from lines
        

        const objects = [] // store all entry in here
        
        for(let line0 of lines){
            const object = {}; // to store the object's props
            const line = line0.split(","); //convert line string to an array of values

            for(let i = 0; i < line.length; i++){
                object[keys[i]] = line[i];
            }
            objects.push(object)
        }

        //return objects;
        callback(objects);
    }else{
        console.log("CSV file must not be null!");
    }
    
}
// function to convert csv file to object
//End From assets.js file to handle csv files

const playerSchema = new mongoose.Schema(
    {
        player_id:String,
        first_name:String,
        last_name:String,
        name:String,
        last_season:String,
        current_club_id:String,
        player_code:String,
        country_of_birth:String,
        city_of_birth:String,
        country_of_citizenship:String,
        date_of_birth:String,
        sub_position:String,
        position:String,
        foot:String,
        height_in_cm:String,
        contract_expiration_date:String,
        agent_name:String,
        image_url:String,
        url:String,
        current_club_domestic_competition_id:String,
        current_club_name:String,
        market_value_in_eur:String,
        highest_market_value_in_eur:String,
    }
);

const clubSchema = new mongoose.Schema(
    {
        club_id:String,
        club_code:String,
        name:String,
        domestic_competition_id:String,
        total_market_value:String,
        squad_size:String,
        average_age:String,
        foreigners_number:String,
        foreigners_percentage:String,
        national_team_players:String,
        stadium_name:String,
        stadium_seats:String,
        net_transfer_record:String,
        coach_name:String,
        last_season:String,
        filename:String,
        url:String,
    }
);

const competitionSchema =new mongoose.Schema(
    {
        competition_id:String,
        competition_code:String,
        name:String,
        sub_type:String,
        type:String,
        country_id:String,
        country_name:String,
        domestic_league_code:String,
        confederation:String,
        url:String,
        is_major_national_league:String,
    }
);

const gameSchema =new mongoose.Schema(
    {
        game_id:String,
        competition_id:String,
        season:String,
        round:String,
        date:String,
        home_club_id:String,
        away_club_id:String,
        home_club_goals:String,
        away_club_goals:String,
        home_club_position:String,
        away_club_position:String,
        home_club_manager_name:String,
        away_club_manager_name:String,
        stadium:String,
        attendance:String,
        referee:String,
        url:String,
        home_club_formation:String,
        away_club_formation:String,
        home_club_name:String,
        away_club_name:String,
        aggregate:String,
        competition_type:String,
    }
);

// international Games Schema
const internationalResultSchema =new mongoose.Schema({
    date:String,
    home_team:String,
    away_team:String,
    home_score:String,
    away_score:String,
    tournament:String,
    city:String,
    country:String,
    neutral:String,
});

const internationalformerNameSchema =new mongoose.Schema({
    current:String,
    former:String,
    start_date:String,
    end_date:String,
});

const internationalGoalScorerSchema =new mongoose.Schema({
    date:String,
    home_team:String,
    away_team:String,
    team:String,
    scorer:String,
    minute:String,
    own_goal:String,
    penalty:String,
});

const internationalshootoutSchema =new mongoose.Schema({
    date:String,
    home_team:String,
    away_team:String,
    winner:String,
    first_shooter:String,
});

const PlayerModel = mongoose.model("players", playerSchema);
const ClubModel = mongoose.model("clubs", clubSchema);
const CompetitionModel = mongoose.model("competitions", competitionSchema);
const GameModel = mongoose.model("games", gameSchema);
const InternationalResultModel = mongoose.model("inter_results", internationalResultSchema);
const InternationalformerNameModel = mongoose.model("inter_formernames", internationalformerNameSchema);
const InternationalGoalScorerModel = mongoose.model("inter_goalscorers", internationalGoalScorerSchema);
const InternationalshootoutModel = mongoose.model("inter_shootouts", internationalshootoutSchema);


const dbModels = {PlayerModel, ClubModel, CompetitionModel, GameModel, InternationalResultModel, InternationalformerNameModel, InternationalGoalScorerModel, InternationalshootoutModel};
// schema Objects and model names



async function openDb (db){
    await mongoose.connect(db)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(error => console.log("ERROR to open DB"));
    
}

async function writeObjToDb(model, obj){
    const entry = new model(obj);

    await entry.save()
    .then((d) => console.log("Entry written in the DB:\n", d))
    .catch(err => console.log("Error when writing the data:\n", err));
}

async function seedCollection(model, objects){
    for await (obj of objects){
        writeObjToDb(model, obj);
    }
}

//readAllFromDb() function
async function readAllFromDb(model) {
    
    const ar = await model.find(); // get the all array of data from the DB
    return ar;
}
// end readAllFromDb() function

// segregate country after getting countries obj from DB
async function segregateCountryFromDB(model, country1, country2, tournament, callback){
    const data = await readAllFromDb(model);

    let homeCountry = [];
    let awayCountry = [];
    let tournam = [];

    let outAr = [];
    function segregate(data){

        for(ob of data){
            //if(outAr.indexOf(ob[key])=== -1){outAr.push(ob[key]);}
            if(homeCountry.indexOf(ob[country1])=== -1){homeCountry.push(ob[country1]);}

            if(awayCountry.indexOf(ob[country2])=== -1){awayCountry.push(ob[country2]);}

            if(tournam.indexOf(ob[tournament])=== -1){tournam.push(ob[tournament]);}
        }
        
        outAr.push(homeCountry.sort());
        outAr.push(awayCountry.sort());
        outAr.push(tournam.sort());

        callback(outAr);
    }

    segregate(data)
    

}
// End of segregate country after getting countries obj from DB

// segregate club after getting clubs obj from DB
async function segregateClubFromDB(model, clubNameKey, callback){
    const data = await readAllFromDb(model);

    let clubs = [];
    //let awayCountry = [];
    //let tournam = [];

    //let outAr = [];
    function segregate(data){

        for(ob of data){
            //if(outAr.indexOf(ob[key])=== -1){outAr.push(ob[key]);}
            if(clubs.indexOf(ob[clubNameKey])=== -1){clubs.push(ob[clubNameKey]);}

            //if(awayCountry.indexOf(ob[country2])=== -1){awayCountry.push(ob[country2]);}

            //if(tournam.indexOf(ob[tournament])=== -1){tournam.push(ob[tournament]);}
        }
        
        //outAr.push(homeCountry.sort());
        //outAr.push(awayCountry.sort());
        //outAr.push(tournam.sort());

        //callback(outAr);
        callback(clubs);
    }

    segregate(data)
    

}
// End of segregate club after getting clubs obj from DB

async function readFromDb(model, obj) {
    const key = Object.keys(obj)[0]; // get the key
    //const value = Object.values(obj)[0]; // get the value using the key
    const value = obj[key];
    const skey = Symbol(key);

    const ar = await model.find(); // get the all array of data from the DB
    
    // find if some data match the search value
    
    //const result = ar.find((o) => (o[key]).toLowerCase() === value.toLowerCase()); 
    //let result = ar.filter((o, i, ar) => o[key].toLowerCase() === value.toLowerCase());
    let result = ar.find((o) => o[key].toLowerCase() === value.toLowerCase());

    console.log(result);
    return result;
}

async function playedGames(team1, team2, internOrDomestic, callback){}

// add variables to the object to export
const DbAssets = {playedGames, seedCollection, dbModels, openDb, csvToObject, writeObjToDb, readFromDb, segregateCountryFromDB, segregateClubFromDB};

// export DB Object containing all the db assets
module.exports = DbAssets;