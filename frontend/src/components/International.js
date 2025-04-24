// International.js
import {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";

import InternationalClub from './InternationalClub';
import {dataOutput} from '../App';
import {handleSelectedCountry, handleSelectedCompetition,dbSeedData, pickCsvFile, csvToObject} from './utils';

export default function International(props) {
    const [InternationNav, setInternationNav] = useState({});
    const [dbURL, setDbURL] = useState("http://localhost:4500/dbs/international"); //useState("http://localhost:4500/keys");
    
    //const dbURL = "http://localhost:4500/dbs/international";
    
    const [objecto1, setObjecto1] = useState([]); //useState([<option>Angola</option>]);
    const [objecto2, setObjecto2] = useState([]);//useState([<option>Girabola</option>]);
    const [competObject, setCompetObject] = useState([]);

    const CountrySelect1 = useRef();
    const CountrySelect2 = useRef();
    const CompetitionSelect = useRef();
    

    useEffect(() => {

    }, []);

    const handleCountry = function(){
        handleSelectedCountry(dbURL, setObjecto1, setObjecto2,setCompetObject, dataOutput.current);
    }

    function handleCompetition () {
        //handleSelectedCompetition(dbURL, setObjecto1, setObjecto2)
    }

    return (
        <div id="intern-output">
            <ul>
                <li onClick={handleCountry}>Country</li>
                <li onClick={handleCompetition}>Competition</li>
            </ul>

            <nav id="output">
                <select ref={CountrySelect1}>
                    {objecto1}
                    {/*<option >{InternationNav.selectList1}</option>*/}
                </select>
                <select ref={CountrySelect2}>
                    {objecto2}
                    {/*<option>{InternationNav.selectList2}</option>*/}
                </select>

                <select ref={CompetitionSelect}>
                    {competObject}
                    {/*<option>{InternationNav.selectList2}</option>*/}
                </select>
            </nav>
            
        </div>
        
    )
}