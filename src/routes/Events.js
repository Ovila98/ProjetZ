import React, { useState, useEffect } from 'react'

import Loading from '../components/Loading';
import EventsView from '../views/EventsView'
import { EventsPresenter } from '../utils/Presenters/EventsPresenter'

export default function Events() {

    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [backgroundImg, setBackgroundImg] = useState()


    const presenter = new EventsPresenter(
        {
            events: events
        },

        {
            "setEvents": setEvents
        }
        )

    useEffect(() => {

        let isMounted = true;
        if(isMounted){
            presenter.loadEventsView().then(res => setIsLoading(res));
        }

        return () => {isMounted = false}
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

      
  return isLoading ? <Loading /> : <EventsView presenter={presenter} viewModel={presenter.model}/>
}
