import React from 'react';
import ReactDOM from 'react-dom/client';
import {useRef, useState, useEffect} from 'react';
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import {Link, Outlet} from 'react-router-dom';
import './css/router.css';

// importing components
import International from "./components/International";
import {store, updateStore, updateGlobalState} from './components/Stores';


let dataOutput;
let mainOutput, setMainOutput;
const serverURL = "http://localhost:4500";

const App = (props) => {
    [mainOutput, setMainOutput] = useState(store.getState().mainOutput);//useState("Hello Main Output");
    //dataOutput = useRef();

    useEffect(() => {
        setMainOutput(store.getState().mainOutput);
    }, [store.getState().mainOutput]);

    return (
        <div id="App">
            <BrowserRouter>
                <div id="br-router">
                    <header>
                    <span>Football-Game-Result Prediction App </span>
                    <i>by Mfinda Adriano</i>
                    </header>
                    <div id="body">
                        <div id="left-side-nav">
                            <nav id="intern-domesticos">
                                <ul>
                                    <li><Link to="/" ></Link> </li>
                                    <li><Link to="/domestic"></Link> </li>
                                    

                
                                </ul>

                                {/**/}
                                <div id="nav-ouput">
                                    <Routes>
                                        <Route index  element={<International />} />
                                        <Route path="/" element={<International />} />
                                    </Routes>   
                                </div>
                                

                            </nav>
                            
                        </div>
                        <div id="data-output">{mainOutput/*store.getState().mainOutput*/}</div>
                    </div>
                    


                {/* 
                <nav id="nav-menu">
                        <ul>
                        
                            <li><Link to="/"> Home Page</Link></li>
                            <li><Link to="/aboutus">About Us</Link></li>
                            <li> <Link to="/contacts">Contacts</Link> </li>
                        </ul>
                    </nav>

                    <nav id="output">
                        <Routes>
                            <Route index  element={<Home />} />
                            <Route path="/aboutus" element={<Aboutus />} />
                            <Route path="/contacts" element={<Contacts />} />
                        </Routes>
                    </nav>*/}
                    
                </div>
                    
            </BrowserRouter>
                    
        </div>
        
    )
}

export {setMainOutput, dataOutput, serverURL};
export default App;
