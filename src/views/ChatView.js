import React, { useState, useEffect } from 'react'

import Message from '../components/Message';
import { qs, getMessagesIntoView } from '../utils/Functions/Functions'
import arrowDown from "../res/arrow-down.svg"

export default function ChatView({ presenter, viewModel }) {

  async function handleSendMessage(e){
    if(toSend !== ""){
      e.target.value = ""
      setToSend("")
      await presenter.sendMessage(viewModel.chatDetails.type, viewModel.chatDetails.id, toSend, viewModel.currentLoggedUser)
  }
  }

  const [toSend, setToSend] = useState("");

  // useEffect pour le bouton de défilement automatique
  useEffect(() => {
    let observing;
    let lastMsgEl;
    if(viewModel?.messages.length > 0){
    console.log(!!viewModel.messages)
    
      lastMsgEl = qs("#messages-container").querySelector('.message-element:last-of-type');
      observing = new IntersectionObserver((entries) => {
      const toLast = qs('#to-last-message')
      const inputs = qs('#chat-inputs')
      entries.forEach(entry => {
        const isVisible = entry.boundingClientRect.top > inputs.getBoundingClientRect().top
        toLast.classList.toggle('hide', !isVisible);
      })
    })

    observing.observe(lastMsgEl)

    }

    return () => { if(observing) observing.unobserve(lastMsgEl)}
  }, [viewModel?.messages]);

  // useEffect pour cacher la barre sur mobile
  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches){
      qs("#main-nav").style.display = "none";
    }
    

    return () => {
      if(qs("#main-nav") && window.getComputedStyle( qs("#main-nav") ).display === "none") qs("#main-nav").style.display = "flex";
    }
  }, [])

  return (
    <div id="chat-wrapper">
      <header id="chat-header">
        <div id="chat-header-left" className="header-part">
          <button id="back-btn" onClick={() => window.history.back()}>&#9666;</button>
          <h2 onClick={() => presenter.goto(viewModel.chatDetails.subjectType, viewModel.chatDetails.subjectId)}>{viewModel.chatDetails.title}</h2>
        </div>
        <div id="chat-header-right" className="header-part">
          <button id="chat-menu-btn">&#8546;</button>
        </div>
      </header>
      <section id="messages-container">
        {viewModel.messages.map(message =>
          (<Message key={message.id} details={message} currentUser={viewModel.currentLoggedUser} />)
          )
        }

        <img
        id="to-last-message"
        className="hide"
        src={arrowDown}
        onClick={getMessagesIntoView}/>
      </section>
      <div id="chat-inputs">
      {viewModel.currentLoggedUser?
        <div id="search-box">
          
          <input value={toSend}
          onChange={(e) => setToSend(e.target.value)}
          type="text"
          placeholder="Envoyer un message dans le groupe..." />
          

          <button
          onClick={handleSendMessage}>{">"}</button>
        </div>
        :
        <div id="search-box">
          
        <input value=""
        type="text"
        placeholder="Veuillez vous connecter pour participer au chat"
        disabled />
        <button disabled>{">"}</button>
      </div>
        }
      </div>
    </div>
  )
}
