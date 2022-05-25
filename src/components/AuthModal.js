import React, { useEffect, useState } from 'react';

import { closeModal } from '../utils/Functions/Functions';
import '../styles/modals.css';
import googleSVG from "../res/google-svg.svg"


export default function AuthModal({ authenticator }) {

  const [isSignInTabOpen, setIsSignInTabOpen] = useState(true)
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e, isSignIn) => {
    e.preventDefault();
    if(isSignIn){
      authenticator.emailSignIn(email, password)
    } else {
      authenticator.createAccount(pseudo, email, password)
    }
  }
  return <div id="auth-modal-wrapper">
    <div id="modal-body" className="bg--primary">
      <button onClick={closeModal} id="close-modal-btn">&#10761;</button>

      <header id="modal-header">
        {isSignInTabOpen?<>
          <h1 id="auth-tab-title">Connexion</h1>
          <p id="change-auth-tab" onClick={() => setIsSignInTabOpen(false)}>Je n'ai pas de compte</p>
          </>:<>
          <h1 id="auth-tab-title">Inscription</h1>
          <p id="change-auth-tab" onClick={() => setIsSignInTabOpen(true)}>J'ai déjà un compte</p>
          </>}
      </header>
      <div id="modal-content">
        <form onSubmit={(e) => handleSubmit(e, isSignInTabOpen)}>
          {!isSignInTabOpen && <div className="input-field">
            <label htmlFor="pseudo-input">Nom d'utilisateur</label>
            <input
            type="text"
            id="pseudo-input"
            name="pseudo-input"
            placeholder="Veuillez rentrez votre nom d'utilisateur"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            required />
          </div>}

          <div className="input-field">
            <label htmlFor="email-input">Adresse mail</label>
            <input
            type="email"
            id="email-input"
            name="email-input"
            placeholder="Veuillez renseigner votre adresse mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required />
          </div>

          <div className="input-field">
            <label htmlFor="password-input">Mot de passe</label>
            <input
            type="password"
            id="password-input"
            name="password-input"
            placeholder="Veuillez rentrez un mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required />
          </div>

          <div className="process-btn">
            <button type="submit" id="submit-btn">{isSignInTabOpen?"Se connecter":"S'inscrire"}</button>
            <svg onClick={() => authenticator.googleSignIn()} width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
            </svg>
          </div>
        </form>
      </div>
      
    </div>
  </div>;
}
