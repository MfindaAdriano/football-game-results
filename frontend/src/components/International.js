// International.js
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "../css/router.css";

import InternationalClub from './InternationalClub';

export default function International(props) {
    return (
        <div id="intern-output">
            <ul>
                <li><Link to="/club">Club</Link></li>
                <li><Link to="/country">Country</Link></li>
                <li><Link to="competition">Competition</Link></li>
            </ul>

            
            <nav>
            {/*
            <BrowserRouter>
                <Routes>
                    <Route path="/international/club" element={<InternationalClub/>}></Route>
                </Routes>
            </BrowserRouter>
            */}
            </nav>
            
        </div>
        
    )
}