import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { qs } from '../utils/Functions/Functions'
import Bubble from '../components/Bubble'

import '../styles/chats.css'

export default function ChatsView({ presenter, viewModel }) {

  document.title = `Tous les salons`;

  const [search, setSearch] = useState("")
  
  return (
    <div className="chats-wrapper">
        <div className="title-zone">
          <h1>Tous les chats</h1>
        </div>
        <div id="search-zone">
            <div id="search-box">
              <input
              type="text"
              placeholder="Rechercher un chat"
              onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

        <h1 className="group-title">Les chats officiels</h1>
        <div className="official-chats-group-wrapper">
            
          {viewModel.officialChats
          &&
          viewModel.officialChats.filter(chat => chat.title.toLowerCase().includes(search.toLowerCase())).map(chat => (
            <Link key={chat.id} to={`/chats/${chat.type}/${chat.id}`}>
            <div className="chat-bubble-wrapper" key={chat.id}>
              <img src={chat.img} />
              <h2>{chat.title}</h2>
            </div>
            </Link>
          ))}
        </div>

        <h1 className="group-title">Les chats de la communauté</h1>
        <div className="official-chats-group-wrapper">
        
          {viewModel.communityChats
          &&
          viewModel.communityChats.filter(chat => chat.title.toLowerCase().includes(search.toLowerCase())).map(chat => (
          <Link key={chat.id} to={`/chats/${chat.type}/${chat.id}`}>
            <div className="chat-bubble-wrapper" key={chat.id}>
              <img src={chat.img} />
              <h2>{chat.title}</h2>
            </div>
            </Link>
          ))}
        </div>
      </div>
  )
}