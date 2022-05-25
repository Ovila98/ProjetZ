import React from 'react';
import '../styles/header.css';

function hideHeader(){
  let header = document.querySelector('#home-header');
  header.classList.add('hide-header');
  document.querySelector('main').classList.add("no-header");
  document.querySelector('nav').classList.remove("hide");
  sessionStorage.setItem("no-header", "true");
  setTimeout(() => {header.style.display = "none";}, 1000);
}
export default function Header( props ) {
  document.querySelector('nav')?.classList.add("hide");
  return (
    document.querySelector('main')?.classList.contains('no-header')
    ?
    <></>
    :
    <header id="home-header">
      <img className='parallax-bg carousel-1' src={props.img} alt="Carousel 1"/>
      <h2 className="main-logo outlined">Frips</h2>
      <h3 className="clr--white outlined">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo reprehenderit ut quis et, eius non.</h3>
      <button className="to-main clr--dark" onClick={hideHeader}>Accéder aux évènements</button>
    </header>
    
  )
}
