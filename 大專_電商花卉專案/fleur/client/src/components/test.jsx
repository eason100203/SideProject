// import React, { useState, useEffect } from 'react';
import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Axios from 'axios';
// import FleurBtn from './fleurBtn'
// import FleurList from './fleurList'
// import FleurCard from './fleurCard'
// import Father from './haha';
// import Nav from './nav'
// import Footer from './footer'
// import App from "./app"
// import '../css/test.css'
// import Orderdetail from '../pages/orderdetails'
// import Uuu from './test_1';
// import IsLoginDialog from './isLoginDialog';

import FleurTalk from "../pages/fleurTalk";

const Test = (props) => {
    // const ha = (e) => {
    //     console.log("hahaha");
    // };

    // const items = [
    //     "tttt",
    //     "hhhh",
    //     "asdfasdf"
    // ];
    // let login = false 
    return ( 
         
         
        <>
            {/* <FleurBtn classes="hahaha" word="test" /> */}
            {/* <FleurList classes={{ ul: "test", li: "hahaha" }} items={items} /> */}
            {/* <FleurCard classes={"hahaha"} imgAlt={"good"} inner={<a href="#">test</a>} /> */}
            {/* <Father /> */}
            {/* <Orderdetail /> */}
            {/* <Footer /> */}
            {/* <App/> */}
            <FleurTalk />
            {/* <TalkButtom /> */}
            {/* <TalkBody inner={[{ imgSrc: "http://localhost:3001/public/images/product/粉貝殼花.jpg", imgAlt: "", inner: "粉貝殼花" },
            { imgSrc: "http://localhost:3001/public/images/product/黑百合.jpg", imgAlt: "", inner: "黑百合" },
            { imgSrc: "http://localhost:3001/public/images/product/狹葉薰衣草.jpg", imgAlt: "", inner: "狹葉薰衣草" }]} /> */}
        </>
    );
};

export default Test;