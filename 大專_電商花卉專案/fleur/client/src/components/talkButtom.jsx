import React, { useState, useEffect } from 'react';
import "../css/talkHeader.css";
import Footer from "../components/footer";

const TalkButtom = () => {
    return (
        <div className='talkContainer2' >
            <img className="talkMain3" src="http://localhost:3001/public/images/talkButtom3.png" alt="" loading="lazy" />
            <div className='controlPeople'><img className="talkBackgroundPeople" src="http://localhost:3001/public/images/lookpeople.png" alt="" loading="lazy" /></div>
        </div>);
}

export default TalkButtom 