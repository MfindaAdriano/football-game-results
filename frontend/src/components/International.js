// International.js
import {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";

import InternationalClub from './InternationalClub';
import {setMainOutput, dataOutput} from '../App';
import {handleSelectedCountries, handleSelectedClubs, handleSelectedCompetition,dbSeedData, pickCsvFile, csvToObject} from './utils';
import {store, updateStore, updateGlobalState} from './Stores';

export default function International(props) {
    const [InternationNav, setInternationNav] = useState({});
    const [dbURL, setDbURL] = useState("http://localhost:4500/dbs/international/countrynames"); //useState("http://localhost:4500/keys");
    
    //const dbURL = "http://localhost:4500/dbs/international";
    
    const [selectionTitle, setSelectionTitle] = useState();
    const [objecto1, setObjecto1] = useState([]); //useState([<option>Angola</option>]);
    const [objecto2, setObjecto2] = useState([]);//useState([<option>Girabola</option>]);
    const [competObject, setCompetObject] = useState([]);

    const CountrySelect1 = useRef();
    const CountrySelect2 = useRef();
    const CompetitionSelect = useRef();
    const searchBt = useRef();
    

    useEffect(() => {
        //store.dispatch({payload:"Mudou", type:"footballAppStore/mainOutputState"});
    }, []);

    const handleInternational = function(){
        //setDbURL("http://localhost:4500/dbs/international/countrynames");
        const dbURL = "http://localhost:4500/dbs/international/countrynames";
        const titleText = "Select the two Countries";
        
        handleSelectedCountries(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setMainOutput);
    }

    function handleDomestic () {
        //alert("Hello Domestic");
        //setDbURL("http://localhost:4500/dbs/domestic/clubnames");
        const dbURL = "http://localhost:4500/dbs/domestic/clubnames";
        const titleText = "Select the two Clubs";
        
        handleSelectedClubs(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setMainOutput);


        //handleSelectedCompetition(dbURL, setObjecto1, setObjecto2);
        
        //store.dispatch({payload:"Mfinda, you clicked it", type:"footballAppStore/mainOutputState"});
        //setMainOutput(store.getState().mainOutput);
    }

    return (
        <div id="intern-output">
            <ul style={{backgroundColor:"black", border:"1px solid yellow"}}>
                <li onClick={handleInternational}>International Games</li>
                <li onClick={handleDomestic}>Domestic Games</li>
            </ul>

            <div style={{color:"white", backgroundColor: "navy", textAlign:"center"}}>{selectionTitle}</div>

        
            <button ref={searchBt}>Search</button>
            
            <nav id="output">
                <select ref={CountrySelect1}>
                    {objecto1}
                    {/*<option >{InternationNav.selectList1}</option>*/}
                </select>
                <select ref={CountrySelect2}>
                    {objecto2}
                    {/*<option>{InternationNav.selectList2}</option>*/}
                </select>

                {/*
                <select ref={CompetitionSelect}>
                    {competObject}
                </select>
                */}
            </nav>
            
        </div>
        
    )
}