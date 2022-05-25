import React from 'react'

import '../styles/about.css'
export default function About() {
  return (
    <div id="about-wrapper">
        <div className="about-section-container">
            <h1 className="section-title first">A propos</h1>
            <h2 id="about-text">Tu souhaites aller à un concert ou un festival mais tu n'as personne pour t'accompagner ? Frips est LA solution !
                Trouve un évènement qui t'interesse et rejoins son chat pour découvrir et discuter avec tous les intéressés. Qui sait ? ça pourrait être le début d'une grande amitié !

                Frips te permet aussi de réserver des places pour un évènement mais aussi un hébergement, que tu peux payer en totalité plus tard ! Donc fini les plans dété entre amis qui tombent à l'eau faute de moyen, pars et amuse-toi ! 
            </h2>
        </div>
        <div id="about-separator"></div>
        <div className="about-section-container">
            <h1 className="section-title last">Nous contacter</h1>
            <div className="contact-element">
                <h2>Pour tout problème et retours, vous pouvez nous contacter à l'adresse suivante:</h2>
                <h2 className="support contact"><a href="mailto:support.frips@gmail.com"><span>support.frips@gmail.com</span></a></h2>
            </div>
            
            <div className="contact-element">
                <h2>Idée &#38; business model:</h2>
                <h2>Benchouba Zakaria</h2>
                <h2 className="contact"><a href="mailto:zaksg1@outlook.fr"><span>zaksg1@outlook.fr</span></a></h2>
            </div>
            <div className="contact-element">
                <h2>Développement du site:</h2>
                <h2>Acolatse Ovila</h2>
                <h2 className="contact"><a href="mailto:acolatse.kjr@gmail.com"><span>acolatse.kjr@gmail.com</span></a></h2>
            </div>
            
        </div>
    </div>
  )
}
