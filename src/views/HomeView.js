import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import CardCarousel from '../components/CardCarousel';
import Header from '../components/Header';
import Bubble from '../components/Bubble';
import Slideshow from '../components/Slideshow'


export default function HomeView({ presenter, viewModel }) {

  return (
    <>
    
    {sessionStorage.getItem("no-header") !== "true" && <Header img={viewModel.headerImg}/>}


    <div className="home" id="home">
      <Slideshow data={{...viewModel.popularEventsSection, popularEvents: viewModel.popularEvents}} />

      <div className="bubble-view">
        <div className="bubble-text-section">
          <a href="/salons" className='bubble-view-title clr--primary outlined'>Salons populaires <span className="material-icons md-18">north_east</span></a>
          <p className="clr--white s-hide outlined">Les catégories les plus suivies en ce moment, tu seras certain de croiser du beau monde ici !</p>
        </div>

        <div className="bubble-group">
          {viewModel.popularSalons.map(salon => {return <Bubble key={salon.id} props={salon} />;})}
        </div>
      </div>

    </div>

    <Outlet />
    
    </>
  )
}
