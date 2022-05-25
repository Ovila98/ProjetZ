import React, { useEffect} from 'react'
import '../styles/events.css'

export default function Events({ presenter, viewModel }) {
  /* Using useEffect hook because background image won't reappear when going back to the page */
  document.title = "Tous les évènements";
return (
    <>
      <div className="events-wrapper">
        <div id="events-title-zone">
          <h1
          className="displayed-events-title"
          onClick={() => presenter.showCategories()}>
            Tous &#9662;</h1>
          <div className="events-category-selector">
            <button>A la une</button>
            <button>Rap</button>
            <button>Pop</button>
            <button>Edm</button>
            <button>Samba</button>
            <button>Jazz</button>
          </div>
        </div>
        <div className="events-group-wrapper">
        {viewModel.events.map(event => (
        <div className="events-single-card" key={event.id} onClick={() => presenter.goto(event.id)}>
          <img className="hovering" src={event.img} alt={event.category}/>
          <h1>{event.title}</h1>
          <div className="event-date-location"><p>{event.date}</p><p>{event.location}</p></div>
          <p className="event-desc">{event.desc}</p>
        </div>

        ))}
        </div>
      </div>
    </>
  )
}
