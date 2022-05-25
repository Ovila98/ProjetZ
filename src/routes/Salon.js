import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../components/Loading'
import SalonView from '../views/SalonView'
import { SalonPresenter } from '../utils/Presenters/SalonPresenter'
import { setupSalonStickyTabs } from '../utils/Functions/Functions'



export default function Salon() {
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    const [salonData, setSalonData] = useState();
    const [salonEvents, setSalonEvents] = useState([])
    const [salonChats, setSalonChats] = useState([])

    const presenter = new SalonPresenter(
        {
            salonData: salonData,
            salonEvents: salonEvents,
            salonChats: salonChats
        },
        {
            "setSalonData": setSalonData,
            "setSalonEvents": setSalonEvents,
            "setSalonChats": setSalonChats
        }
    )

    useEffect(() => {
        let isMounted = true;

        if(isMounted){
            ;
            try{
                presenter.loadSalonView(params.ref).then(res =>{
                    setIsLoading(res)
                    setupSalonStickyTabs()
                })
            } catch(e){
                //handle error
            }
        }

        return () => {isMounted = false}
    }, [params.ref])
  return isLoading?<Loading />:<SalonView presenter={presenter} viewModel={presenter.model} />
}
