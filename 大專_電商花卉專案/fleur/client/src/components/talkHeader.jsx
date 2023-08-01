import React, { useState, useEffect } from 'react';
import "../css/talkHeader.css";
import { FleurCard2 } from './fleurCard';
import axios from 'axios';

const TalkHeader = (props) => {
    const { data } = props;

    if (!data) { return null }

    return (
        <div>


            <div className='talkContainer'>
                <img className="talkBranchLeft" src="http://localhost:3001/public/images/枝幹4.png" alt="" />
                <img className="talkBranchRight" src="http://localhost:3001/public/images/枝幹1.png" alt="" />
                <img className="talkMain2" src="http://localhost:3001/public/images/talkHeader.png" alt="" />

                <div>
                    {
                        data.map((v, i) =>
                            <div key={i} className={i + 1 % 1 ? 'rightProduct' : 'leftProduct'}>
                                <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${v.flowerSrc}`} imgAlt={v.flower}
                                    inner={<>
                                        <p className='changeColor'>{v.flower}</p>
                                        <p className='changeColor2'>{v.flowerLanguage}</p>
                                    </>}
                                    classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                            </div>

                        )
                    }
                </div>
            </div>
        </div>);
}

export default TalkHeader;