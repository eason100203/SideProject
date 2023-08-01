import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TalkHeader from "../components/talkHeader";
import TalkMiddle from "../components/talkMiddle";
import TalkButtom from "../components/talkButtom";
import Nav from "../components/nav";
import MouseCursor from '../components/mouseCursor';
import "../css/talkHeader.css";

const FleurTalk = () => {
    const [headerData, setHeaderData] = useState([]);
    const [middleData, setMiddleData] = useState([]);


    const arrToNested = (arr, amountPerChild) => {
        return Array.from(
            { length: Math.ceil(arr.length / amountPerChild) },
            (_, i) => arr.slice(i * amountPerChild, i * amountPerChild + amountPerChild)
        );
    }

    useEffect(() => {
        (async () => {
            const { data } = await Axios.get('http://localhost:3001/fleurTalk');
            const newData = data.map((v) => {
                const { pName: flower, pImage: flowerSrc, meaning: flowerLanguage } = v;
                v = { flower, flowerSrc, flowerLanguage };
                return v;
            })
            setHeaderData(newData.slice(0, 2));
            setMiddleData(newData.slice(2));
        })();


    }, [])

    return (
        <>
            <MouseCursor />
            <Nav />
            <div className='allBackground'>
                <TalkHeader data={headerData} />
                {
                    arrToNested(middleData, 3).map((v, i) => <TalkMiddle key={i} odd={!(i % 2)} data={v} />)
                }
                <TalkButtom />
            </div>
        </>
    );
}

export default FleurTalk;