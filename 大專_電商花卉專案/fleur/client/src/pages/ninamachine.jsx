import React, { useState } from 'react';
import abc from '../css/ninaMachine.css';
import IsLoginDialog from '../components/isLoginDialog';
import Axios from 'axios';
import { withCookies } from "react-cookie";


const Nina = (props) => {
  const money = ["1", "2", "3"];

  const [animationVisible, setAnimationVisible] = useState(false);
  const [numbersVisible, setNumbersVisible] = useState(false);
  const [abc, setAbc] = useState(false);
  const [reels, setReels] = useState([1, 2, 3]);
  const [nnn, setNnn] = useState(true);
  const [haha, setHaha] = useState(true);
  const [b, setB] = useState(false);

  const { cookies } = props;
  const localUid = cookies.get('localUid');

  const [buttonPressed, setButtonPressed] = useState(false);


  const [reelBackgrounds, setReelBackgrounds] = useState([
    "url('http://localhost:3001/public/images/Frame 67.png')",
    "url('http://localhost:3001/public/images/Frame 69.png')",
    "url('http://localhost:3001/public/images/Frame 67.png')",
  ]);

  const startAnimation = () => {
    setHaha(false);
    setAnimationVisible(true);
    setButtonPressed(true);
    setAbc(true);
    setNnn(false);

    setTimeout(() => {
      setAnimationVisible(false);
      setNumbersVisible(true);

    }, 2000);


    setTimeout(async () => {

      setAbc(false);
      setNnn(true);
      const randomIndex1 = Math.floor(Math.random() * money.length);
      const randomIndex2 = Math.floor(Math.random() * money.length);
      const randomIndex3 = Math.floor(Math.random() * money.length);

      const result1 = money[randomIndex1];
      const result2 = money[randomIndex2];
      const result3 = money[randomIndex3];

      setReels([result1, result2, result3]);

      setReelBackgrounds((prevBackgrounds) => [
        // prevBackgrounds[0],
        `url('http://localhost:3001/public/images/Frame 67_${result1}.png')`,

        `url('http://localhost:3001/public/images/Frame 69_${result2}.png')`,

        `url('http://localhost:3001/public/images/Frame 67_${result3}.png')`,

        // prevBackgrounds[4],
      ]);

      const finallResult = `${result1}${result2}${result3}`;
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      today.setTime(today.getTime() + 604800000);
      const todayDate = today.getDate().toString().padStart(2, 0);
      const todayMonth = (today.getMonth() + 1).toString().padStart(2, 0);
      const todayYear = today.getFullYear().toString().slice(2);
      const machineData = {
        couponId: `pt${finallResult}t${todayYear}${todayMonth}${todayDate}`,
        description: `-${finallResult}`,
        useLimit: 1500,
        conponTimeLimit: Math.floor(today / 1000),
        uid: localUid,
        text: `折${finallResult}元`,
        saleSelect: Number(`${finallResult}`) * -1
      };

      const { status } = await Axios.patch("http://localhost:3001/machine", machineData);
      if (status === 200) {
        setTimeout(() => {
          setB(true)
        }, 500);
      };
    }, 2000);
  };






  return (


    <div className="all">


      <div className="img">
        <img src={`http://localhost:3001/public/images/Frame 65.png`} alt="" />
      </div >


      <div className="container">



        {haha ? (
          <div

            style={{

              display: 'none',
            }}
          >

          </div>
        ) : null}

        {nnn ? (
          <div

            style={{

              backgroundImage: "url('http://localhost:3001/public/images/Frame 82.png')",

              width: '100px',
              height: '150px',
              backgroundRepeat: 'repeat-x',
              backgroundRepeat: 'repeat-y',
              marginLeft: '365px'

            }}
          >

          </div>
        ) : null}

        {abc ? (
          <div

            style={{

              display: 'block',
              backgroundImage: "url('http://localhost:3001/public/images/Frame 82.png')",
              animationName: 'secondAnimation',
              animationDuration: '0.3s',
              animationTimingFunction: 'ease-out',
              // animationIterationCount: 'infinite',
              transition: `transform 1s ease-out`,

              width: '150px',
              height: '150px',
              backgroundRepeat: 'repeat-x',
              backgroundRepeat: 'repeat-y',
              marginLeft: '365px'



            }}
          >

          </div>
        ) : null}

      </div>




      <div className="container">
        {reels.map((reelValue, index) => (

          <div className="reel" key={index}>

            {animationVisible && (index === 0 || index === 1 || index === 2) ? (
              <div

                style={{
                  display: 'block',
                  backgroundImage: reelBackgrounds[index],
                  width: '98px',
                  height: '800px',
                  animationName: 'nina',
                  animationDuration: '0.2s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              ></div>
            ) : null}




            {numbersVisible ? (
              <div

                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '24px',
                  flexWrap: 'wrap',
                  height: '134px',
                  width: '98px',
                  fontSize: '60px',
                  fontFamily: 'Josefin Sans, sans-serif',
                  overflow: 'hidden',
                  color: 'rgba(250, 205, 18, 1)',
                  backgroundColor: 'white',

                }}
              >
                {reelValue}
              </div>
            ) : null}



            {b ? (
              <div>
                <IsLoginDialog text="恭喜獲得優惠折扣" link="/coupon" />
              </div>
            ) : null}
          </div>
        ))}


        <button className='btn'
          button onClick={startAnimation} disabled={buttonPressed} />

      </div>
    </div >
  );
};

export default withCookies(Nina);
