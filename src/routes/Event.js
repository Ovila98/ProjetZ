import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import Loading from '../components/Loading';
import EventView from '../views/EventView'
import { EventPresenter } from '../utils/Presenters/EventPresenter'

export default function Event() {
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const location = useLocation();

    const [event, setEvent] = useState();

    const presenter = new EventPresenter(
        {
            event: event
        },
        {
            "setEvent": setEvent
        }
    )

    useEffect(() => {
        let isMounted = true;
        

        if(isMounted){
            try{
                presenter.loadEventView(params.id).then(res => setIsLoading(res))
            } catch (e){
                console.log(e)
            }
            
        }
    
        return () => {isMounted = false}
    }, [params.id])
  return isLoading?<Loading />:<EventView presenter={presenter} viewModel={presenter.model} />
}
