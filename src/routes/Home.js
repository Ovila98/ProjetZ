import React, { useState, useEffect } from 'react'

import Loading from '../components/Loading';
import HomeView from '../views/HomeView'
import { HomePresenter } from '../utils/Presenters/HomePresenter'

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);

    const [popularEventsSection, setPopularEventsSection] = useState();
    const [popularEvents, setPopularEvents] = useState();
    const [headerImg, setHeaderImg] = useState();
    const [popularSalons, setPopularSalons] = useState();

    const presenter = new HomePresenter(
        {
            popularEventsSection: popularEventsSection,
            popularEvents: popularEvents,
            headerImg: headerImg,
            popularSalons: popularSalons
        },
        {
            "setPopularEventsSection": setPopularEventsSection,
            "setPopularEvents": setPopularEvents,
            "setHeaderImg": setHeaderImg,
            "setPopularSalons": setPopularSalons
        }
    )
  
  useEffect(() => {
    document.title = "Frips | Friends & Trips !"

    let isMounted = true;

    if(isMounted){
        try{
            presenter.loadHomeView().then(res =>{
                setIsLoading(res);
            })
        } catch(e){
            /* handle error */
            console.log(e);
        }
        
    } 

    return () => {isMounted = false;}
}, [])

  return (isLoading?
  <Loading />
  :
  <HomeView presenter={presenter} viewModel={presenter.model} />)
}
