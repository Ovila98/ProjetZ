import React, { useState, useEffect } from 'react'

import Loading from '../components/Loading';
import ChatsView from '../views/ChatsView'
import { ChatsPresenter } from '../utils/Presenters/ChatsPresenter'

export default function Chats() {

    const [isLoading, setIsLoading] = useState(true);

    const [officialChats, setOfficialChats] = useState([]);
    const [communityChats, setCommunityChats] = useState([]);
    const [privateChats, setPrivateChats] = useState([]);


    const presenter = new ChatsPresenter(
        {
            officialChats: officialChats,
            communityChats: communityChats,
            privateChats: privateChats
        },
        {
            "setOfficialChats": setOfficialChats,
            "setCommunityChats": setCommunityChats,
            "setPrivateChats": setPrivateChats
        }
    );

    useEffect(() => {

        let isMounted = true;
        if(isMounted){
            presenter.loadChatsView().then(res => setIsLoading(res));
        }

        return () => {isMounted = false}
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isLoading?<Loading />:<ChatsView presenter={presenter} viewModel={presenter.model} />
}
