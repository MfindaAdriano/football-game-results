import {store, updateStore, updateGlobalState} from './Stores';

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
async function playedGames (team1, team2, internOrDomestic, callback){
    const url = "http://localhost:4500/dbs/playedgames";

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

// to handle search starting with a selected country
function handleSelectedCountries(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setoutputState, setSelectedCountry){
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

        

        // Main output Container Config and output
        //store.dispatch({payload: data[0][0] +  " " + data[0][0], type:"footballAppStore/mainOutputState"});
        //setoutputState(store.getState().mainOutput);

        let JSX1 = [];
        let JSX2 = [];

        let lis = [];
        let dataArr = data[0];

        setSelectedCountry(dataArr);
        
        for (let i = 0; i <dataArr.length; i++){
            lis.push(<li style={{backgroundColor:"transparent"}}>{dataArr[i]}</li>);
            JSX1.push(<option>{dataArr[i]}</option>);
            JSX2.push(<option>{dataArr[i]}</option>);
        }

        let outData = <ol style={{color:"yellow", backgroundColor:"transparent", fontSize: "3vw"}}> {lis} </ol>;

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
function handleSelectedClubs(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setoutputState, setSelectedClub){
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
        const data = data0.sort();
        setSelectedClub(data);

        let JSX1 = [];
        let JSX2 = [];

        let lis = [];
        for (let i = 0; i <data.length; i++){
            lis.push(<li style={{backgroundColor:"transparent"}}>{data[i]}</li>);
            JSX1.push(<option>{data[i]}</option>);
            JSX2.push(<option>{data[i]}</option>);
        }

        let outData = <ol style={{color:"yellow", backgroundColor:"transparent", fontSize:"3vw"}}> {lis} </ol>;

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