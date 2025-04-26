// International.js
import {useState, useEffect, useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";

import {setMainOutput, dataOutput} from '../App';
import {playedGames, handleSelectedCountries, handleSelectedClubs, handleSelectedCompetition,dbSeedData, pickCsvFile, csvToObject} from './utils';
import {store, updateStore, updateGlobalState} from './Stores';

export default function International(props) {
    const [InternationNav, setInternationNav] = useState({});
    const [dbURL, setDbURL] = useState("http://localhost:4500/dbs/international/countrynames"); //useState("http://localhost:4500/keys");
    
    //const dbURL = "http://localhost:4500/dbs/international";
    
    const [selectionTitle, setSelectionTitle] = useState();
    const [objecto1, setObjecto1] = useState([]); //useState([<option>Angola</option>]);
    const [objecto2, setObjecto2] = useState([]);//useState([<option>Girabola</option>]);
    //const [competObject, setCompetObject] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedClub, setSelectedClub] = useState([]);
    const [internOrDomestic, setInternOrDomestic] = useState(true);
    const [team11, setTeam1] = useState("");
    const [team22, setTeam2] = useState("");
    const [summary, setSummary] = useState("");

    let team1, team2;

    const CountrySelect1 = useRef();
    const CountrySelect2 = useRef();
    const CompetitionSelect = useRef();
    const searchBt = useRef();

    const outputSummary = useRef();
    const summaryIni = <div style={{textAlign:"center", borderBottom: "0.3vw solid yellow", width:"100%"}}>Sumary</div>
    

    useEffect(() => {
        setSummary(summaryIni);
        //store.dispatch({payload:"Mudou", type:"footballAppStore/mainOutputState"});
        //searchBt.current.addEventListener("click", (event) => {alert("Hello Search Button");})
    }, []);

    const searchGames = () => {
        let selectLength1 = CountrySelect1.current.options.length;
        let selectLength2 = CountrySelect2.current.options.length;

        let ind1, ind2;

        if( selectLength1 !== 0 && selectLength2 !== 0){

            //function handleTeamName(callback){
            ind1 = CountrySelect1.current.selectedIndex;
            ind2 = CountrySelect2.current.selectedIndex;

            //if international games are chosen
            if(internOrDomestic){
                team1 = selectedCountry[ind1];
                team2 = selectedCountry[ind2];

            }else{ // if domestic games chosen
                team1 = selectedClub[ind1];
                team2 = selectedClub[ind2];
            }

            
            playedGames(team1, team2, internOrDomestic, setMainOutput, setSummary, summaryIni); //(data) => { data.nome});
        
            //alert(team1 + "; " + team2);
            // do what you have to do with the name of the two selected team

        }else{
            alert("You did not select any team");
        }
    }
    // end of searchGames() function

    const handleInternational = function(){
        //setDbURL("http://localhost:4500/dbs/international/countrynames");
        const dbURL = "http://localhost:4500/dbs/international/countrynames";
        const titleText = "Select the two Countries";
        
        handleSelectedCountries(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setMainOutput, setSelectedCountry);

        setInternOrDomestic(true);
    }

    function handleDomestic () {
        //alert("Hello Domestic");
        //setDbURL("http://localhost:4500/dbs/domestic/clubnames");
        const dbURL = "http://localhost:4500/dbs/domestic/clubnames";
        const titleText = "Select the two Clubs";
        
        handleSelectedClubs(dbURL, setObjecto1, setObjecto2, setSelectionTitle, titleText, setMainOutput, setSelectedClub);

        setInternOrDomestic(false);
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

        
            <button ref={searchBt} onClick={searchGames}>Search</button>
            
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

            <div ref={outputSummary} style={{backgroundColor:"gray", marginTop: "2vh", height:"50vh", display:"flex", flexDirection:"column", alignItems: "center", width:"100%", overflowY:"scroll"}}>
                {summary}
            </div>
            
        </div>
        
    )
}