import React, {useState, useEffect } from 'react'

import Loading from '../components/Loading'
import SalonsView from '../views/SalonsView'
import { SalonsPresenter } from '../utils/Presenters/SalonsPresenter';

export default function Salons() {
    const [isLoading, setIsLoading] = useState(true);

    const [salons, setSalons] = useState([]);

    const presenter = new SalonsPresenter(
        {
            salons: salons
        },
        {
            "setSalons": setSalons
        }
    )

    useEffect(() => {
        document.title = "Tous les salons"
        let isMounted = true;

        if(isMounted){
            try{
                presenter.loadSalonsView().then(res => setIsLoading(res))
            } catch(e) {
                //handle error
                console.log(e);
            }
        }

        return () => {isMounted = false}
    }, [])
  return isLoading?<Loading />:<SalonsView presenter={presenter} viewModel={presenter.model} />
}
