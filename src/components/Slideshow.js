import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import Card from './Card'
import "../styles/slideshow.css"

export default function Slideshow({data}) {

  const [pos, setPos] = useState(0);
  const timeoutRef = useRef(null);

  function mod(a, n){
    return ((( a % n ) + n) % n)
  }

  function resetTimeout(){
    if(timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      const nSlides = document.querySelectorAll('.slides').length;
      const slider = document.querySelector('.slider')
      var delay = 5000;
      resetTimeout();

      if(pos === 0){
        slider.style.transition = `left 750ms ease-in-out`
        delay = 2500;
      }
      if(pos !== 0 && pos < nSlides - 1){
        slider.style.transition = `left 750ms ease-in-out`
        delay = 5000;
      }
      if(pos === nSlides - 1){
        slider.style.transition = `left 0ms ease-in-out`
        delay = 2500;
      }

      timeoutRef.current = setTimeout(() => {
        setPos(prev => mod(prev + 1, nSlides));
      }, delay)
    }

    return () => {
      resetTimeout();
      isMounted = false;
    }
  }, [pos])

  
  
  return (
    <div className={`slideshow-wrapper ${data.className}`}>
      <div className="slideshow-text-section">
        <Link to={`${data.href}`} className='slideshow-title clr--primary outlined'>{data.title} <span className="material-icons md-18">north_east</span></Link>
        <p className="s-hide outlined">{data.desc}</p>
      </div>

      <div className="slideshow">
        <div className="slider" style={{left: `-${pos*100}%`}}>

          {data.popularEvents.map(event => {return <div key={event.id} className="slides"><Card props={event}/></div>})}
          <div  className="slides duplicate"><Card props={data.popularEvents.at(0)}/></div>
        </div>
      </div>
    </div>
  )
}
