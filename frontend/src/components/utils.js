
// function to convert csv file to object
function csvToObject(fileString){
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

    return objects;
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
function dbSeedData(dbURL){


    fetch(dbURL, 
                {
                    method:"POST",
                    //headers: new Headers().set("content-type", "application/json"),
                    //headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name:"Mfinda", idade: 48}),
                }
            )
}

// to handle search starting with a selected country
function handleSelectedCountry(dbURL, setObjecto1, setObjecto2){
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

        setObjecto1(JSX1);
        setObjecto2(JSX2);
        
    });

    //alert(select1.current.options.length);
    //alert(select1.current.options[select1.current.selectedIndex].value);
}

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

export {handleSelectedCountry, handleSelectedCompetition, pickCsvFile, csvToObject};