import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

import { qs, setCurrentSubjectType } from '../utils/Functions/Functions';
import '../styles/events.css'

export default function Event({ presenter, viewModel }) {
  document.title = `${viewModel.event.title}`
  
  return (
    <>
      <div className="event-wrapper">
        <header className="header-container">
          <div className="event-header">
            <h1 className="clr--accent">{viewModel.event.title}</h1>
            
            <h2 className="outlined">
                Sed placerat condimentum laoreet. Etiam et erat id nunc gravida lacinia non consectetur dolor. Aliquam vulputate tortor sagittis lorem varius, ut volutpat eros tristique. Phasellus a tortor ut leo vehicula faucibus in vel tellus. Cras viverra gravida dui, vel blandit metus dictum sit amet.
            </h2>

            <div className="event-buttons-container">
              <Link
              to={`/chats/official/${viewModel.event.officialChatId}`}
              className="bg--primary"
              id="event-chat-button"
              onClick={() => setCurrentSubjectType("event")}>Chat de l'évènement</Link>
              <Link to="#" className="bg--primary" id="event-ticketing">Billeterie</Link>
            </div>
            <div className="social-buttons">
              <a href="#" className="fa fa-facebook"></a>
              <a href="#" className="fa fa-twitter"></a>
              <a href="#" className="fa fa-instagram"></a>
              <a href="#" className="fa fa-google"></a>
            </div>
          </div>
        </header>
        <div className="event-content">
            <h1 className="clr--accent">Ces évènements pourrait vous intéresser !</h1>
            
        </div>
      </div>
    </>
  )
}
