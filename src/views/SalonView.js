import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Bubble from '../components/Bubble';
import CardCarousel from '../components/CardCarousel';
import GoogleIcon from '../components/GoogleIcon';
import '../styles/salon.css'

import { qs } from '../utils/Functions/Functions';

export default function SalonView({ presenter, viewModel }) {

  document.title = `${viewModel.salonData.title}`

  const [eventsTabOpened, setEventsTabOpened] = useState(true);

  function switchTabs(e) {
    setEventsTabOpened(e.target.id === "events-tab-btn" ? true : false);
    let wait;
    // wait = setTimeout(() => {document.querySelector(".tab-content").scrollIntoView(true); clearTimeout(wait)}, 50);
    wait = setTimeout(() => {qs("#main-content").scrollTop = qs("#tab-links-search").offsetTop; clearTimeout(wait)}, 50);
}
  return (
    <>
      <div id="salon-wrapper">
        {/* SALON HEADER */}
        <div className="header-container">
          <div className="salon-header ">
            <div className="bubble-body">
              <img src={viewModel.salonData.img} alt={viewModel.salonData.id} />
              <h3 className="bubble-title clr--white">{viewModel.salonData.title}</h3>
            </div>
            <Link
            className="salon-chat-link bg--primary"
            to={`/chats/official/${viewModel.salonData.officialChatId}`}>Accéder au chat du salon</Link>
            <h2 className="clr--white outlined">
              Sed placerat condimentum laoreet. Etiam et erat id nunc gravida lacinia non consectetur dolor. Aliquam vulputate tortor sagittis lorem varius, ut volutpat eros tristique. Phasellus a tortor ut leo vehicula faucibus in vel tellus. Cras viverra gravida dui, vel blandit metus dictum sit amet.
            </h2>
            
          </div>
        </div>
        
        {/* SALON CONTENT */}
        <div className="salon-content">
          {/* Carousel évènements à la une */}
          {/* <CardCarousel data={starred} /> */}

          {/* Chats à la une */}
          <h1 className="clr--accent">Les chats les plus populaires !</h1>
          <div className="popular-chats-view">
            {viewModel.salonChats && viewModel.salonChats.slice(0, 4).map((chat) => {return <Bubble key={chat.id} props={chat}/>})}
          </div>

          {/* CHATS & TABS */}
          <div className="all-chats-events">
            <div id="tab-links-search">
            {/* Tablinks */}
              <div className={`chats-events-tab tab-${eventsTabOpened ? "events":"chats"}`}>
                <button id="events-tab-btn" className={`tablinks clr--accent ${eventsTabOpened ? "active": ""}`} onClick={(e) => switchTabs(e)}>Évènements</button>
                <button id="chats-tab-btn" className={`tablinks clr--accent ${eventsTabOpened ? "": "active"}`} onClick={(e) => switchTabs(e)}>Chats</button>
              </div>

              {/* Search bar */}
              <div className="tab-search-wrapper">
                <div className="tab-search-container">
                  <input
                  type="text"
                  id="tab-search"
                  name="tab-search"
                  placeholder={`Rechercher un ${eventsTabOpened?"évènement":"chat"}`}
                  />
                  <button
                  className="tab-search-btn"
                  onClick={() => {document.querySelector("#tab-search").classList.toggle("active")}}><GoogleIcon icon="search"/></button>
                </div>
              </div>
            </div>

            {/* CHATS & EVENTS TABS CONTENT*/}
            <div className="tab-content-wrapper">
              
            {
              eventsTabOpened?
              <div className="all-salon-events tab-content">
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                <div style={{
                  width: "200px",
                  aspectRatio: "1",
                  backgroundColor: "white",
                  borderRadius: "100%"
                }}></div>
                {/* {events.map(event => {return <Bubble key={event.id} props={event}/>})}
                {events.map(event => {return <Bubble key={event.id} props={event}/>})}
                {events.map(event => {return <Bubble key={event.id} props={event}/>})} */}
              </div>
              :
              <div className="all-salon-chats tab-content">
                {/* {events.map(chat => {return <Bubble key={chat.id} props={chat}/>})}
                {events.map(chat => {return <Bubble key={chat.id} props={chat}/>})}
                {events.map(chat => {return <Bubble key={chat.id} props={chat}/>})}
                {events.map(chat => {return <Bubble key={chat.id} props={chat}/>})} */}
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
