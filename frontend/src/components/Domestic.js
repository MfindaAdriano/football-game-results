// International.js

import {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";


export default function Domestic(props) {
    const [domesticNav, setDomesticNav] = useState("");

    const [clubOption, setClubOption] = useState(<option>PSG</option>);
    const [countryOption, setCountryOption] = useState(<option>France</option>);
    const [competitionOption, setCompetitionOption] = useState(<option>Coupe de France</option>);

    const clubSelect = useRef();
    const countrySelect = useRef();
    const competitionSelect = useRef();
    return (
        <div id="intern-output">
            <ul>
                <li>Club</li>
                <li>Country</li>
                <li>Competition</li>
            </ul>

            
            <div id="output">{domesticNav}</div>

            <nav id="output">
                <select ref={clubSelect}>
                    {clubOption}
                </select>
                <select ref={countrySelect}>
                    {countryOption}
                </select>
                <select ref={competitionSelect}>
                    {competitionOption}
                </select>
            </nav>
            
        </div>
        
    )
}