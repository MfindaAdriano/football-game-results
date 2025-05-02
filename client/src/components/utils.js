import {store, updateStore, updateGlobalState} from './Stores';
import {serverURL} from '../App';

// function to convert csv file to object
function csvToObject(fileString, callback){
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
}

//const file = fich.files[0];
function pickCsvFile(file, callback){
    //alert(file.name);

    const read = new FileReader();

    read.addEventListener("load", (event) => {
        
        const result = event.target.result;
        
        // do something with the result
        //alert(result);
        callback(result.toString());
    });

    read.readAsText(file);
}

// seed function to seed data to our database
function dbSeedData(dbURL, objs){

    //for (const obj of objs){
        fetch(dbURL, 
            {
                method:"POST",
                //headers: new Headers().set("content-type", "application/json"),
                //headers: {"Content-Type": "application/json"},
                body: JSON.stringify(objs), // ({name:"Mfinda", idade: 48}),
            }
        )
        .then((data) => console.log("After Seeding: ", data))
        .catch(err => console.log("Seeding Error",  err))
    //}
    
}

// seed function to seed string to our database
function dbSeedString(dbURL, str){

    //for (const obj of objs){
        fetch(dbURL, 
            {
                method:"POST",
                //headers: new Headers().set("content-type", "application/json"),
                //headers: {"Content-Type": "application/json"},
                body: JSON.stringify(str), // ({name:"Mfinda", idade: 48}),
            }
        )
        .then((data) => console.log("After Seeding: ", data))
        .catch(err => console.log("Seeding Error",  err))
    //}
    
}


// function to check if the two selected team have played games
async function playedGames (team1, team2, internOrDomestic,setoutputState, setSummary, summaryIni){

    if(team1 === team2){
        store.dispatch({payload: <h2 style={{color:"yellow", marginLeft:"2vw"}}>You must select two different teams</h2>, type:"footballAppStore/mainOutputState"});
            setoutputState(store.getState().mainOutput);

            return 0;
    }

    function handleGames(callback){
        const url = `${serverURL}/dbs/playedgames`;

        let data = {
            team1: team1,
            team2: team2,
            internOrDomestic,
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(d => {
            callback(d);
        })
    }

    handleGames(data0 => {

        // if the data does not exist 
        if(!Array.isArray(data0)){
            // Output message in case we find nothing in the database
            store.dispatch({payload: <h2 style={{color:"red", marginLeft:"2vw"}}>Sorry, we found no game records between the two selected teams!</h2>, type:"footballAppStore/mainOutputState"});
            setoutputState(store.getState().mainOutput);

            return 0;
        }

        if(internOrDomestic){ // if international game
            //const data = JSON.stringify(data0);
            const data = data0 //[0]["home_team"];

            let renderDiv = [];

            // variable to handle rendering data
            let tournam;
            let date;
            let city;
            let country;
            let team1;
            let team2;
            let score1;
            let score2;

            // variables for Summary output data
            const summaryTeam1 = data[0]["home_team"];
            const summaryTeam2 = data[0]["away_team"];
            let team1HomeVict = 0;
            let team1AwayVict = 0;
            let team1TotVict = 0;

            let team2HomeVict = 0;
            let team2AwayVict = 0;
            let team2TotVict = 0;
            let totalGames = 0;
            let drawGames = 0;
            

            for(const obj of data){
                let trs = [];

                tournam = obj["tournament"];
                date = obj["date"];
                city = obj["city"];
                country = obj["country"];
                team1 = obj["home_team"];
                team2 = obj["away_team"];
                score1 = parseInt(obj["home_score"]);
                score2 = parseInt(obj["away_score"]);
            
                let col1 = "white", col2 = "white";
                let resultMes = "Wins";


                // Summary implementation

                totalGames ++; // total games disputed by the two teams

                if(score1 === score2){
                    drawGames ++;
                }
                else if(score1 > score2){
                    if(summaryTeam1 === obj["home_team"]){
                        team1HomeVict ++;
                        team1TotVict ++;
                    }else{
                        team2HomeVict ++;
                        team2TotVict ++;
                    }
                    
                }else{
                    if(summaryTeam1 === obj["home_team"]){
                        team2AwayVict ++;
                        team2TotVict ++;
                    }else{
                        team1AwayVict ++;
                        team1TotVict ++;
                    }
                }  
                    
                // End Summary

        
                trs.push(<tr><td colSpan={2}>{tournam} | {date}</td></tr>);
                trs.push(<tr><td colSpan={2}>{city} | {country}</td></tr>);
                trs.push(<tr><td>{team1}</td><td>{team2}</td></tr>);
                trs.push(<tr><td>{score1}</td><td>{score2}</td></tr>);

                if(score1 === score2){
                    resultMes = "Draw Game";
                    trs.push(<tr><td colSpan={2}>{resultMes}</td></tr>);
                }
                else if(score1 > score2){
                    col1 = "green";
                    const style = {backgroundColor:col1};
                    trs.push(<tr><td style={style}>{resultMes}</td><td></td></tr>);
                }
                else{
                    col2 = "green";
                    const style = {backgroundColor:col2};
                    trs.push(<tr><td></td><td style={style}>{resultMes}</td></tr>);
                }

                const table = <table border={1} style={{margin:"2vw", width:"90%", borderBottom: ".4vw solid gray"}}>{trs}</table>


                renderDiv.push(table);

            }

        

            // update mainOutput state
            store.dispatch({payload: <div>{renderDiv}</div>, type:"footballAppStore/mainOutputState"});

            // render mainOutput data
            setoutputState(store.getState().mainOutput);

            // summary rendering
            setSummary(
                <div>
                    <b>{summaryIni}</b>
                    <div>
                        <table border={1}>
                            <tr><th colSpan={3}>{summaryTeam1}</th></tr>
                            <tr><td>Home</td><td>Away</td><td>Total</td></tr>
                            <tr><td>{team1HomeVict}</td><td>{team1AwayVict}</td><td>{team1TotVict}</td></tr>

                            <tr><th colSpan={3}>{summaryTeam2}</th></tr>
                            <tr><td>Home</td><td>Away</td><td>Total</td></tr>
                            <tr><td>{team2HomeVict}</td><td>{team2AwayVict}</td><td>{team2TotVict}</td></tr>
                            <tr><td colSpan={3}>Total: {totalGames} | Draw: {drawGames}</td></tr>
                        </table>
                    </div>
                </div>
            );
        }else { // if a domestic game
            const data = data0[0] //[0]["home_team"];

            let renderDiv = [];

            // variable to handle rendering data
            let tournam = data0[1];
            let date;
            let stadium;
            //let country;
            let team1;
            let team2;
            let score1;
            let score2;

            // variables for Summary output data
            const summaryTeam1 = data[0]["home_club_name"];
            const summaryTeam2 = data[0]["away_club_name"];
            let team1HomeVict = 0;
            let team1AwayVict = 0;
            let team1TotVict = 0;

            let team2HomeVict = 0;
            let team2AwayVict = 0;
            let team2TotVict = 0;
            let totalGames = 0;
            let drawGames = 0;
            

            for(const obj of data){
                let trs = [];

                //tournam = obj["tournament"];
                date = obj["date"];
                stadium = obj["stadium"];
                //country = obj["country"];
                team1 = obj["home_club_name"];
                team2 = obj["away_club_name"];
                score1 = parseInt(obj["home_club_goals"]);
                score2 = parseInt(obj["away_club_goals"]);
            
                let col1 = "white", col2 = "white";
                let resultMes = "Wins";


                // Summary implementation

                totalGames ++; // total games disputed by the two teams

                if(score1 === score2){
                    drawGames ++;
                }
                else if(score1 > score2){
                    if(summaryTeam1 === obj["home_club_name"]){
                        team1HomeVict ++;
                        team1TotVict ++;
                    }else{
                        team2HomeVict ++;
                        team2TotVict ++;
                    }
                    
                }else{
                    if(summaryTeam1 === obj["home_club_name"]){
                        team2AwayVict ++;
                        team2TotVict ++;
                    }else{
                        team1AwayVict ++;
                        team1TotVict ++;
                    }
                }  
                    
                // End Summary

        
                trs.push(<tr><td colSpan={2}>{tournam} | {date}</td></tr>);
                trs.push(<tr><td colSpan={2}>{stadium}}</td></tr>);
                trs.push(<tr><td>{team1}</td><td>{team2}</td></tr>);
                trs.push(<tr><td>{score1}</td><td>{score2}</td></tr>);

                if(score1 === score2){
                    resultMes = "Draw Game";
                    trs.push(<tr><td colSpan={2}>{resultMes}</td></tr>);
                }
                else if(score1 > score2){
                    col1 = "green";
                    const style = {backgroundColor:col1};
                    trs.push(<tr><td style={style}>{resultMes}</td><td></td></tr>);
                }
                else{
                    col2 = "green";
                    const style = {backgroundColor:col2};
                    trs.push(<tr><td></td><td style={style}>{resultMes}</td></tr>);
                }

                const table = <table border={1} style={{margin:"2vw", width:"90%", borderBottom: ".4vw solid gray"}}>{trs}</table>


                renderDiv.push(table);

            }

        

            // update mainOutput state
            store.dispatch({payload: <div>{renderDiv}</div>, type:"footballAppStore/mainOutputState"});

            // render mainOutput data
            setoutputState(store.getState().mainOutput);

            // summary rendering
            setSummary(
                <div>
                    <b>{summaryIni}</b>
                    <div>
                        <table border={1}>
                            <tr><th colSpan={3}>{summaryTeam1}</th></tr>
                            <tr><td>Home</td><td>Away</td><td>Total</td></tr>
                            <tr><td>{team1HomeVict}</td><td>{team1AwayVict}</td><td>{team1TotVict}</td></tr>

                            <tr><th colSpan={3}>{summaryTeam2}</th></tr>
                            <tr><td>Home</td><td>Away</td><td>Total</td></tr>
                            <tr><td>{team2HomeVict}</td><td>{team2AwayVict}</td><td>{team2TotVict}</td></tr>
                            <tr><td colSpan={3}>Total: {totalGames} | Draw: {drawGames}</td></tr>
                        </table>
                    </div>
                </div>
            );
        }
        
    })

    // while waiting the asynchronous function to process the data
    store.dispatch({payload: "Getting Data from the Database ...", type:"footballAppStore/mainOutputState"});
    setoutputState(store.getState().mainOutput);
    
}

// to handle search starting with a selected country
function handleSelectedCountries(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setoutputState,  setExtraOutput, setSelectedCountry){
    // while waiting the asynchronous function to process the data
    store.dispatch({payload: "Getting Data from the Database ...", type:"footballAppStore/mainOutputState"});
    setoutputState(store.getState().mainOutput);

    fetch(dbURL)
    .then(response => {
        if(response.ok){
            //alert("Response OK");
            return response.json();
        }
    })
    .then(data=> {
        //cont.innerHTML = data[0][0] +  " " + data[0][0];

        const detailsCountry = async (event) => {
            const countryName = event.target.id;
            const countryObj = data[1].find((obj) => countryName === obj["home_team"] || countryName === obj["away_team"]);

            setExtraOutput(
            <table border={2} style={{width:"90%"}}>
                {/*<tr><th>Country</th></tr>
                <tr><td>{countryObj["country"]}</td></tr>*/}
                <tr><th>Tournament</th></tr>
                <tr><td>International</td></tr>
            </table>)

        }
        

        // Main output Container Config and output

        let JSX1 = [];
        let JSX2 = [];

        let lis = [];
        let dataArr = data[0][0];

        setSelectedCountry(dataArr);
        
        for (let i = 0; i <dataArr.length; i++){
            lis.push(<li id={dataArr[i]} onClick={detailsCountry} style={{backgroundColor:"transparent"}}>{dataArr[i]}</li>);
            JSX1.push(<option>{dataArr[i]}</option>);
            JSX2.push(<option>{dataArr[i]}</option>);
        }

        let outData = <ol style={{color:"yellow", backgroundColor:"transparent", fontSize: "2vw"}}> {lis} </ol>;

        store.dispatch({payload: outData, type:"footballAppStore/mainOutputState"});

        setoutputState(store.getState().mainOutput);
        
        // End of Main output Container Config and output

        setSelectionTitle(titleText);

        //let JSX1 = [];
        //let JSX2 = [];
        //let JSX3 = [];
        

        //select1.current.options.length = 0;
        //select2.current.options.length = 0;

        /*
        //for(const obj of data[0]){
        for(let ind = 0; ind < data[0].length; ind++){    
            JSX1.push(<option>{data[0][ind]}</option>);
            JSX2.push(<option>{data[1][ind]}</option>);
            //JSX3.push(<option>{data[2][ind]}</option>);
                        
        }
        */

        setObjecto1(JSX1);
        setObjecto2(JSX2);
        //setCompetObject(JSX3);
        
        
    });

    //alert(select1.current.options.length);
    //alert(select1.current.options[select1.current.selectedIndex].value);
}
// end of handleSelectedCountries() function

// to handle search starting with a selected clubs
function handleSelectedClubs(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setoutputState, setExtraOutput, setSelectedClub){
    // while waiting the asynchronous function to process the data
    store.dispatch({payload: "Getting Data from the Database ...", type:"footballAppStore/mainOutputState"});
    setoutputState(store.getState().mainOutput);

    fetch(dbURL)
    .then(response => {
        if(response.ok){
            //alert("Response OK");
            return response.json();
        }
    })
    .then(data0 => {
        const data = data0[0].sort();
        setSelectedClub(data);

        const detailsClub = async (event) => {
            const clubName = event.target.id;
            const clubObj = data0[1].find((obj) => clubName === obj["name"]);

            setExtraOutput(
                <table border={2} style={{width:"90%"}}>
                    <tr><th>Stadium</th></tr>
                    <tr><td>{clubObj["stadium_name"]}</td></tr>
                    <tr><th>Stadium Capacity</th></tr>
                    <tr><td>{clubObj["stadium_seats"]} Seats</td></tr>
                </table> 
                );

        }

        let JSX1 = [];
        let JSX2 = [];

        let lis = [];
        for (let i = 0; i <data.length; i++){
            lis.push(<li id={data[i]} onClick={detailsClub} style={{backgroundColor:"transparent"}}>{data[i]}</li>);
            JSX1.push(<option>{data[i]}</option>);
            JSX2.push(<option>{data[i]}</option>);
        }

        let outData = <ol style={{color:"yellow", backgroundColor:"transparent", fontSize:"2vw"}}> {lis} </ol>;

        setObjecto1(JSX1);
        setObjecto2(JSX2);
        

        // Main output Container Config and output
        store.dispatch({payload: outData, type:"footballAppStore/mainOutputState"});

        setoutputState(store.getState().mainOutput);
        // End of Main output Container Config and output

        setSelectionTitle(titleText);
    })
}
// end of handleSelectedClubs() function


// to handle search starting with a selected Competition
function handleSelectedCompetition(dbURL, setObjecto1, setObjecto2){
    fetch(dbURL)
    .then(response => {
        if(response.ok){
            //alert("Response OK");
            return response.json();
        }
    })
    .then(data => {
        
        let JSX1 = [];
        let JSX2 = [];

        //select1.current.options.length = 0;
        //select2.current.options.length = 0;

        for(const obj of data){    
            JSX1.push(<option>{obj.country}</option>);
            JSX2.push(<option>{obj.competition}</option>);
                        
        }

        setObjecto1(JSX2);
        setObjecto2(JSX1);
        
    });

    //alert(select1.current.options.length);
    //alert(select1.current.options[select1.current.selectedIndex].value);
}

export {playedGames, handleSelectedCountries, handleSelectedClubs, handleSelectedCompetition, dbSeedData, pickCsvFile, csvToObject};