import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { CurrentUserContext } from './AuthProvider'
import { qs, toggleSidebar } from '../utils/Functions/Functions'

import '../styles/sidebar.css'

import profilePicture from "../res/profile-picture.jpg"
import { openModal } from '../utils/Functions/Functions';

function toggleSidebarDropdown(e) {
    const contentToToggle = document.getElementById(`${e.target.id}-content`);
    contentToToggle.style.display = contentToToggle.style.display === "flex" ? "none" : "flex";
    e.target.textContent = contentToToggle.style.display === "flex" ? "\u25BE" : "\u25B8";
}


export default function Sidebar() {

    const currentUserData = useContext(CurrentUserContext);
    // fetch popular or followed events, salons and chats (3 results max.), with useEffect
    useEffect(() => {
        qs('#sidebar-wrapper').addEventListener('click', (e) => {
            if(e.target.matches("a") || e.target.matches(".closing")){
                toggleSidebar();
            }
        })
    }, [])

  return (
    <aside className="sidebar-wrapper" id="sidebar-wrapper" data-state="close">
        
        <div className="sidebar-container">
       
            { /* SIDEBAR TOP */}
            <div className="sidebar-top">
            <Link to="/" id="sidebar-main-logo" className="m-hide l-hide closing"><h2 className="clr--primary closing">Frips</h2></Link>
                <div id="sidebar-profile-wrapper">
                    <img id="sidebar-pfp" src={currentUserData?.photoUrl?currentUserData.photoUrl:profilePicture} alt=""/>
                    {currentUserData?
                    <button onClick={() => window.location.href = "/profile/me"} id="goto-profile-btn" className="closing bg--primary">{currentUserData.nickname}</button>
                    :
                    <button onClick={openModal} id="goto-profile-btn" className="closing bg--primary">Se connecter</button>}
                    
                </div>
                <div id="sidebar-top-container">
                    <div className="sidebar-element">
                        <Link to='/salons' className="sidebar-button thin">
                            Salons
                        </Link>
                        <button className="sidebar-dropdown" id="salons-dropdown" onClick={(e) => toggleSidebarDropdown(e)}> &#9656;</button>
                    </div>
                    <div className="sidebar-inner" id="salons-dropdown-content">
                        <p className="bg--primary">Suivis et populaires</p>
                        <Link to="/salons/rap">Rap</Link>
                        <Link to="/salons/edm">EDM</Link>
                        <Link to="/salons/pop">Pop</Link>
                    </div>


                    <div className="sidebar-element">
                        <Link to="/events" className="sidebar-button thin">Evènements</Link>
                        <button className="sidebar-dropdown" id="events-dropdown" onClick={(e) => toggleSidebarDropdown(e)}>&#9656;</button>
                    </div>
                    <div className="sidebar-inner" id="events-dropdown-content">
                        <p className="bg--primary">Suivis et populaires</p>
                        <Link to="/events/ZikejrTIyJYHddz8Cdtv">Electrobeach Music Festival</Link>
                        <Link to="/events/ufa973UbRmnOIIBHi8cB">Musilac</Link>
                        <Link to="/events/N49jxxwCd9SagMVwB5e4">Solidays 2022</Link>
                    </div>


                    <div className="sidebar-element">
                        <Link to="/chats" className="sidebar-button thin">Chats</Link>
                        <button className="sidebar-dropdown"  id="chats-dropdown" onClick={(e) => toggleSidebarDropdown(e)}>&#9656;</button>
                    </div>
                    <div className="sidebar-inner" id="chats-dropdown-content">
                        <p className="bg--primary">Chats du moment</p>
                        <Link to="/chats/official/ZikejrTIyJYHddz8Cdtv">Electrobeach Music Festival</Link>
                        <Link to="/chats/official/rap">Rap</Link>
                        <Link to="/chats/official/N49jxxwCd9SagMVwB5e4">Solidays 2022</Link>
                    </div>
                </div>
            </div>

            {/* SIDEBAR BOTTOM */}
            <div className="sidebar-bottom">
                <div className="sidebar-element">
                    {currentUserData &&
                    <button
                    className="sidebar-button closing thin"
                    style={{color: "red"}}
                    onClick={() => window.location.hash = "#logout"}>Se déconnecter</button>
                    }
                    
                </div>
                <div className="sidebar-element">
                    <Link to="/about" className="sidebar-button closing thin">À Propos — Contact</Link>
                </div>
                
            </div>
        
        </div>
      
    </aside>
  )
}
