import React from 'react';
import { Link } from 'react-router-dom';

import {  toggleSidebar, closeSidebar } from '../utils/Functions/Functions';
import GoogleIcon from './GoogleIcon';

import '../styles/nav.css';


export default function Nav() {
  return (<>
    <nav id="main-nav">
      <div id="nav-left">
        <button id="menu-btn" className="l-hide" onClick={toggleSidebar}>&#8546;</button>
        <Link to="/" onClick={closeSidebar} id="main-logo"><h2 className="s-hide clr--primary">Frips</h2></Link>
      </div>
        
      <div id="nav-right">
        <div className="search-zone">
          <input type="text" id="nav-search" placeholder="Chercher un évènement ou un salon.." />
          <button type="submit" id="nav-search-btn"><GoogleIcon icon="search"/></button>
        </div>
      </div>
        
    </nav>
    </>
   )
}
