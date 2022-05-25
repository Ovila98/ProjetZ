import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/bubble.css';

/* Create a function to replace the "window.location" line that takes into account every case where the link should be hidden*/


export default function Bubble({props}) {
  return (
    <div className="bubble-body hovering">
      <Link to={`${props.href}`}></Link>
      <img src={props.img} alt={props.id} />
      <h3 className="bubble-title clr--white">{props.title}</h3>
    </div>
    
  )
}
