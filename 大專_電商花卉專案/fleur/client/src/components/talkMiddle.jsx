import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import { FleurCard2 } from './fleurCard';
import { createArray } from '../js/functions';
import "../css/talkHeader.css";
import 'aos/dist/aos.css';
import { useInView } from 'react-intersection-observer';


const TalkMiddle = (props) => {
    const { odd, data } = props;
    const [load, setload] = useState(false);
    const { ref: imgRefs, inView: myElementIsVisible } = useInView({
        // 添加閾值來調整視口的高度
        rootMargin: '550px 0px',
    });
    ;
    const imgDuration = 500
    const oddImg = ['枝幹5.png', '枝幹3.png', '枝幹1.png'];
    const oddImgAos = ['fade-left', 'fade-right', 'fade-right'];
    const oddImgClass = ['talkMidBranchLeft', 'talkMidBranchRight', 'talkMidBranchRight2'];
    const oddClass = ['trueMiddleleftProduct', 'trueMiddleleftProduct2', 'trueMiddlerightProduct'];
    const evenImg = ['枝幹4.png', '枝幹6.png', '枝幹2.png'];
    const evenImgAos = ['fade-left', 'fade-left', 'fade-right'];
    const evenImgClass = ['falsetalkMidBranchLeft', 'falsetalkMidBranchLeft2', 'falsetalkMidBranchRight'];
    const evenClass = ['falseMiddleleftProduct', 'falseMiddlerightProduct', 'falseMiddlerightProduct2'];



    useEffect(() => {
        const initializeAOS = async () => {
            AOS.init({ duration: 700 });
            await new Promise((resolve) => setTimeout(resolve, 200));
            AOS.refresh();
            setload(true);
            // { console.log('imgrefs', imgRefs.current) }
        };

        initializeAOS();
    }, [])

    if (!load) {
        return null
    }

    return (
        <div className='talkContainer' >
            <>
                {myElementIsVisible && <img className="talkMain" src="http://localhost:3001/public/images/talkBody.png" alt="" loading="lazy" />}
                {
                    createArray(3).map((v, i) => odd
                        ? <img key={i} className={oddImgClass[i]} data-aos={oddImgAos[i]} src={`http://localhost:3001/public/images/${oddImg[i]}`} alt="" loading="lazy" />
                        : <img key={i} className={evenImgClass[i]} data-aos={evenImgAos[i]} src={`http://localhost:3001/public/images/${evenImg[i]}`} alt="" loading="lazy" />)
                }
                {
                    data.map((v, i) => (
                        <div ref={imgRefs} key={i} data-aos="fade-in" data-aos-duration={imgDuration} className={odd ? oddClass[i] : evenClass[i]}>
                            {myElementIsVisible && <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${v.flowerSrc}`} imgAlt={v.flower}
                                inner={<>
                                    <p className="changeColor">{v.flower}</p>
                                    <p className="changeColor2">{v.flowerLanguage}</p>
                                </>}
                                classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />}
                        </div>)
                    )
                }
            </>
            {/* {props.odd ?
                <div>
                    <img className="talkMain" src="http://localhost:3001/public/images/talkBody.png" alt="" />
                    <img className="talkMidBranchLeft" data-aos="fade-left" src="http://localhost:3001/public/images/枝幹5.png" alt="" />
                    <img className="talkMidBranchRight" data-aos="fade-right" src="http://localhost:3001/public/images/枝幹3.png" alt="" />
                    <img className="talkMidBranchRight2" data-aos="fade-right" src="http://localhost:3001/public/images/枝幹1.png" alt="" />

                    <div data-aos="fade-in" className='trueMiddleleftProduct'>
                        <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${data[0].flowerSrc}`} imgAlt={'haha'}
                            inner={<>
                                <p className="changeColor">{data[0].flower}</p>
                                <p className="changeColor2">{data[0].flowerLanguage}</p>
                            </>}
                            classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                    </div>

                    <div data-aos="fade-in" className='trueMiddleleftProduct2'>
                        <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${data[1].flowerSrc}`} imgAlt={'haha'}
                            inner={<>
                                <p className="changeColor">{data[1].flower}</p>
                                <p className="changeColor2">{data[1].flowerLanguage}</p>
                            </>}
                            classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                    </div>

                    <div data-aos="fade-in" className='trueMiddlerightProduct'>
                        <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${data[2].flowerSrc}`} imgAlt={'haha'}
                            inner={<>
                                <p className="changeColor">{data[2].flower}</p>
                                <p className="changeColor2">{data[2].flowerLanguage}</p>
                            </>}
                            classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                    </div>
                </div>
                : <div>
                    <img className="talkMain" src="http://localhost:3001/public/images/talkBody.png" alt="" />
                    <img className="falsetalkMidBranchLeft" data-aos="fade-left" src="http://localhost:3001/public/images/枝幹4.png" alt="" />
                    <img className="falsetalkMidBranchLeft2" data-aos="fade-left" src="http://localhost:3001/public/images/枝幹6.png" alt="" />
                    <img className="falsetalkMidBranchRight" data-aos="fade-right" src="http://localhost:3001/public/images/枝幹2.png" alt="" />

                    <div data-aos="fade-in" className='falseMiddleleftProduct'>
                        <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${data[0].flowerSrc}`} imgAlt={'haha'}
                            inner={<>
                                <p className="changeColor">{data[0].flower}</p>
                                <p className="changeColor2">{data[0].flowerLanguage}</p>
                            </>}
                            classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                    </div>

                    <div data-aos="fade-in" className='falseMiddlerightProduct'>
                        <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${data[1].flowerSrc}`} imgAlt={'haha'}
                            inner={<>
                                <p className="changeColor">{data[1].flower}</p>
                                <p className="changeColor2">{data[1].flowerLanguage}</p>
                            </>}
                            classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                    </div>

                    <div data-aos="fade-in" className='falseMiddlerightProduct2'>
                        <FleurCard2 imgSrc={`http://localhost:3001/public/images/product/${data[2].flowerSrc}`} imgAlt={'haha'}
                            inner={<>
                                <p className="changeColor">{data[2].flower}</p>
                                <p className="changeColor2">{data[2].flowerLanguage}</p>
                            </>}
                            classes={{ card2: 'headerCard', image2: 'headerImg', inner2: 'headInner' }} />
                    </div>
                </div>
            } */}
        </div>
    );
}

export default TalkMiddle