import React from 'react'
import { Link } from 'react-router-dom';


export default function Message({ details, currentUser }) {
    let isSent = false;
    if(details.authorId === currentUser?.id){
        isSent = true;
    };

    const side = isSent?"sent":"received"
    const timestamp = details.timestamp.toDate();
    const formattedDate = `${timestamp.getDate().toString().padStart(2, "0")}/${timestamp.getMonth().toString().padStart(2, "0")}/${timestamp.getFullYear()}`
    const formattedTime = `${timestamp.getHours().toString().padStart(2, "0")}h${timestamp.getMinutes().toString().padStart(2, "0")}`
    
  return (
    <div className={`message-element ${side}`}>
        <div className={`message-body ${side}`}>
            <h3 className={`message-author ${side}`}><Link to={`/profile/${isSent?"me":details.authorId}`}>{details.author}</Link></h3>
            <div className={`message-content ${side}`}>
            <strong className={`message-date ${side}`}>{formattedDate}</strong>
            <p className={`message-text ${side}`}>{details.messageContent}</p>
            <strong className={`message-time ${side}`}>{formattedTime}</strong>
            </div>
        </div>
    </div>
  )
    
}
