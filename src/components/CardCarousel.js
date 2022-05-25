import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import '../styles/cardcarousel.css'


// Inclure les sections dans ce composant
export default function CardCarousel({data}) {
  return (
    <div className={`card-carousel-wrapper ${data.sectionClassName}`}>
      <div className="text-section">
        <Link to={`${data.sectionHref}`} className='card-carousel-title clr--primary'>{data.sectionTitle} <span className="material-icons md-18">north_east</span></Link>
        <p className="s-hide">{data.sectionDesc}</p>
      </div>

      <div className="card-carousel">
        {data.sectionEvents.map(event => {return <Card key={event.id} props={event}/>})}
      </div>
    </div>
  )
}

