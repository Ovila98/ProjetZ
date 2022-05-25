import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom';

import { getGroupType, groupTypeToCollection, getURLSegments, getMessagesIntoView } from '../utils/Functions/Functions';
import { CurrentUserContext } from '../components/AuthProvider';
import { ChatPresenter } from '../utils/Presenters/ChatPresenter';
import ChatView from '../views/ChatView'
import Loading from '../components/Loading'

export default function Chat() {
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const currentLoggedUser = useContext(CurrentUserContext)
    const [chatDetails, setChatDetails] = useState();
    const [messages, setMessages] = useState();
    const [currentChatUsers, setCurrentChatUsers] = useState();
    
    const presenter = useMemo(() => {
      const currentMessagesCollectionPath = [
        groupTypeToCollection(getGroupType(getURLSegments(window.location.href))), params.id, "messages"
      ]
      return new ChatPresenter(
        {
          chatDetails: chatDetails,
          messages: messages,
          currentLoggedUser: currentLoggedUser,
          currentChatUsers: currentChatUsers
        },
        {
          "setChatDetails": setChatDetails,
          "setMessages": setMessages,
          "setCurrentLoggedUser": undefined,
          "setCurrentChatUsers": setCurrentChatUsers
        },
        currentMessagesCollectionPath)}, [params.id, messages])
        

    useEffect(() => {
      const unsubscribe = presenter.configure()

      return () => {if(!!unsubscribe)  unsubscribe()}

    }, [params.id, messages]);

    useEffect(() => {
      let isMounted = true;
      
      
      if(isMounted){
        presenter.loadChatView().then(res => setIsLoading(res))
        getMessagesIntoView()

      }

      return () => { isMounted = false }
    }, [params.id])
  return isLoading?<Loading />:<ChatView presenter={presenter} viewModel={presenter.model}/>
}
