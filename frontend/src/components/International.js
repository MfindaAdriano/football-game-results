// International.js
import {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";

import InternationalClub from './InternationalClub';
import {handleSelectedCountry, handleSelectedCompetition} from './utils';

export default function International(props) {
    const [InternationNav, setInternationNav] = useState({});
    const [dbURL, setDbURL] = useState("http://localhost:4500/dbs/international");
    
    const [objecto1, setObjecto1] = useState([<option>Angola</option>]);
    const [objecto2, setObjecto2] = useState([<option>Girabola</option>]);

    const CountrySelect = useRef();
    const CompetitionSelect = useRef();

    useEffect(() => {
        
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