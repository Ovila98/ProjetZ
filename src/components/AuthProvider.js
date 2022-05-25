import React, { useState, useEffect, useMemo, useRef } from 'react'

import AuthModal from './AuthModal';
import { Authentication } from '../utils/Firebase/Authentication'
import { closeModal } from '../utils/Functions/Functions';

export const CurrentUserContext = React.createContext();


export default function AuthProvider({ children }) {

    const [loggedUser, setLoggedUser] = useState();
    const loggedUserRef = useRef() // Using useRef to access latest state in event listener
    const updateLoggedUser = (user) => {
        setLoggedUser(user)
        loggedUserRef.current = user
    }
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const authenticator = useMemo(() => (new Authentication(updateLoggedUser)), [])

    const handleHashChange = () => {
        
        switch(window.location.hash){
            case "#authentication":{
                if(loggedUserRef.current){
                    closeModal();
                } else {
                    setIsAuthOpen(true);
                }
                break;
            }
    
            case "#logout":{
                if(loggedUserRef.current){
                    authenticator.signOut().then(() => closeModal())
                }
                break;
            }
            case "#":
            case "":
                setIsAuthOpen(false);
                break;
            default:{
                closeModal();
                break;
            }
        }
    
    }

    useEffect(() => {
        let isMounted = true;

        if(isMounted){
            setIsAuthOpen(!loggedUser && window.location.hash === "#authentication");
            window.addEventListener("hashchange", handleHashChange);
        }
        

        if(window.location.pathname !== "/"){sessionStorage.setItem("no-header", "true")}

        return () => {isMounted = false}
    }, [])


    return (
        <CurrentUserContext.Provider value={loggedUser}>
            {isAuthOpen && <AuthModal authenticator={authenticator}/>}
            { children }
        </CurrentUserContext.Provider>
    )
}
