import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/card.css'

//Titre, dates, url description = props à récuperer de la base de données.

export default function Card({props}) {
  return (
    <Link to={`/events/${props.id}`}>
    <div className="card-body hovering">
        <img className="card-background" src={props.img} alt="fest"/>
        <div className="card-content">
        <h2 className="clr--white outlined">{props.title}</h2>
        <div className='card-date-location'>
          <h3 className="clr--white outlined"><span className="material-icons md-inht clr--white outlined">calendar_month</span> {props.date}</h3>
          <h3 className="clr--white outlined"><span className="material-icons md-inht clr--white outlined">room</span>{props.location}</h3>
        </div>
        <div className="card-event-details">
          <p className="clr--white outlined">{props.desc}</p>
        </div>
        </div>
    </div>
    </Link>
  )
}
