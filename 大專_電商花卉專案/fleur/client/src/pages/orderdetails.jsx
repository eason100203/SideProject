import React, { useState, useEffect } from 'react';
import MemberContainer from '../components/memberContainer';
import '../css/orderdetail.css';
import { Link, useLocation, useParams } from "react-router-dom";
import axios from 'axios';



const Orderdetail = () => {

    const { orderNo } = useParams();
    const [allData, setAllData] = useState([]);
    const [Notchange, setNotchange] = useState({});


    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:3001/orderdetail/${orderNo}`);
            // console.log(data[0])
            setAllData(data);
            setNotchange(data[0]);
        })();
    }, []);

    // console.log(Notchange)

    const { time, orderAddress, orderName, orderPhone, payWay, total, useCoupon, ...rest } = Notchange


    {
        return allData.length === 0 ? null : (<MemberContainer>
            <div class="orderInformation">
                <div class="orderNumber">
                    <p>訂單編號：{orderNo}</p>
                    <p class="orderNumber__detail">訂單:已到貨</p>
                </div>
                <div id="orderBar">
                    <div class="orderState">
                        <p>日期</p>
                        <p>狀態</p>
                        <p>總金額</p>
                        <p>付款方式</p>
                    </div>
                    <hr class="damnHr" />

                    <div class="orderState orderState__secLine">
                        <p>{time.slice(0, 10)}</p>
                        <p>付款成功</p>
                        <p>{total}</p>
                        <p id="sowear">{payWay}</p>
                    </div>

                    <hr class="damnHr" />
                </div>
            </div>

            <div id="orderProductName">
                <p>商品名稱</p>
                <p class="ProductName">數量</p>
                <p class="ProductName">小計</p>
            </div>

            <hr class="damnHr" />

            <div id="orderForCycle" >
                {allData.map((dataItem, index) => (
                    <div id="orderProductDetail" key={index} >
                        <div style={{ display: 'flex' }}>
                            <img className="dataImg" src={`http://localhost:3001/public/images/product/${dataItem.pImage}`} alt="" />
                            <div style={{ width: '280px', margin: '5px 0  0 25px' }}>
                                <p>{dataItem.pName}</p>
                                {dataItem.text.split('\n').map((paragraph, index) => (
                                    <p className="describe" key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                        <p className="ProductName">{dataItem.quantity}</p>
                        <p className="ProductName">{dataItem.subtotal}</p>
                    </div>
                ))}
            </div>


            <hr class="damnHr" />
            <div class="orderNumber freight">
                <p>運費</p>
                <p class="orderNumber__detail">NT.30</p>
            </div>
            <div class="orderNumber needToPay">
                <p >優惠券</p>
                <p class="orderNumber__detail">{useCoupon}</p>
            </div>

            <hr class="damnHr" />
            <div>
                <div class="orderNumber needToPay">
                    <p>應付金額</p>
                    <p class="orderNumber__detail">NT.{total}</p>
                </div>

                <hr class="damnHr" />

                <div id="Recipient">
                    <p>收件人:{orderName}</p>
                    <p>聯繫電話:{orderPhone}</p>
                    <p>住址:{orderAddress}</p>
                </div>
            </div>

        </MemberContainer>);
    }
}


export default Orderdetail;