// International.js
import {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";

import InternationalClub from './InternationalClub';
import {dataOutput} from '../App';
import {handleSelectedCountry, handleSelectedCompetition, pickCsvFile, csvToObject} from './utils';

export default function International(props) {
    const [InternationNav, setInternationNav] = useState({});
    const [dbURL, setDbURL] = useState("http://localhost:4500/dbs/international");
    
    const [objecto1, setObjecto1] = useState([<option>Angola</option>]);
    const [objecto2, setObjecto2] = useState([<option>Girabola</option>]);

    const CountrySelect = useRef();
    const CompetitionSelect = useRef();
    const fich = useRef();
    //const output = dataOutput;

    useEffect(() => {
        
        //const fich = document.querySelector("#file1");
        // onchange event
        
        fich.current.addEventListener("change", (event) => {
            const [file] = event.target.files;
            
            if(file.name.indexOf(".csv") != -1){
                // invoke the function passing file
                pickCsvFile(file, (data) =>{
                    //output.innerHTML = data;
                    const objects = csvToObject(data);

                    const keys = Object.keys(objects[0]);
                    
                    // create schema
                    const schema = {};
                    for(let key of keys){
                        schema[key] = new String();
                    }

                    let out = "";
                    for(let object of objects){
                        out += "<p>";
                        for(let prop in object){
                            out += prop +": <b>"+object[prop] + "</b><br/>";
                        }
                            out += "</p>";
                    }

                    //dataOutput.current.innerHTML = JSON.stringify(schema);
                    dataOutput.current.innerHTML = out;

                })
            }else{
                alert("File must have .csv extension!");
            }
            
        });

    }, [])

    const handleCountry = function(){
        handleSelectedCountry(dbURL, setObjecto1, setObjecto2);
    }

    function handleCompetition () {
        handleSelectedCompetition(dbURL, setObjecto1, setObjecto2)
    }

    return (
        <div id="intern-output">
            <ul>
                <li onClick={handleCountry}>Country</li>
                <li onClick={handleCompetition}>Competition</li>
            </ul>

            <input type="file" ref={fich} />

            <nav id="output">
                <select ref={CountrySelect}>
                    {objecto1}
                    {/*<option >{InternationNav.selectList1}</option>*/}
                </select>
                <select ref={CompetitionSelect}>
                    {objecto2}
                    {/*<option>{InternationNav.selectList2}</option>*/}
                </select>
            </nav>
            
        </div>
        
    )
}