import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { withCookies } from 'react-cookie';

import InfoBar from '../components/fleurInfoBar';
import IsLoginDialog from '../components/isLoginDialog';
import style from '../css/customer.module.scss'

const Customer = (props) => {
    const { cookies } = props;
    const localUid = cookies.get('localUid');
    const [needLoginIn, setNeedLoginIn] = useState(false);
    const [orderName, setOrderName] = useState("");
    const [orderPhone, setOrderPhone] = useState("");
    const [orderCity, setOrderCity] = useState("");
    const [orderCounty, setOrderCounty] = useState("");
    const [orderStreet, setOrderStreet] = useState("");
    const [theSame, setTheSame] = useState(true);
    const [deliverName, setDeliverName] = useState("");
    const [deliverPhone, setDeliverPhone] = useState("");
    const [deliverCity, setDeliverCity] = useState("");
    const [deliverCounty, setDeliverCounty] = useState("");
    const [deliverStreet, setDeliverStreet] = useState("");

    const changeTheSame = (e) => {
        if (!theSame) {
            setDeliverName(orderName);
            setDeliverPhone(orderPhone);
            setDeliverCity(orderCity);
            setDeliverCounty(orderCounty);
            setDeliverStreet(orderStreet);
        } else {
            setDeliverName("");
            setDeliverPhone("");
            setDeliverCity("");
            setDeliverCounty("");
            setDeliverStreet("");
        };
        setTheSame(prev => !prev);
    };

    const changeDeliverName = (e) => {
        setTheSame(false);
        setDeliverName(e.target.value);
    };
    const changeDeliverPhone = (e) => {
        setTheSame(false);
        setDeliverPhone(e.target.value);
    };
    const changeDeliverCity = (e) => {
        setTheSame(false);
        setDeliverCity(e.target.value);
    };
    const changeDeliverCounty = (e) => {
        setTheSame(false);
        setDeliverCounty(e.target.value);
    };
    const changeDeliverStreet = (e) => {
        setTheSame(false);
        setDeliverStreet(e.target.value);
    };

    const sendDeliver = async () => {
        const deliverData = {
            uid: localUid,
            orderNo: sessionStorage.getItem("OrderNo"),
            total: sessionStorage.getItem("OrderAmount"),
            useCoupon: sessionStorage.getItem("couponText"),
            payWay: sessionStorage.getItem("OrderPay"),
            orderName: deliverName,
            orderPhone: deliverPhone,
            orderAddress: `${deliverCity}${deliverCounty}${deliverStreet}`,
            products: sessionStorage.getItem("OrderProduct")
        };
        const { status } = await Axios.post("http://localhost:3001/customer", deliverData);
        if (status === 200) {
            const orderNo = sessionStorage.getItem("OrderNo");
            sessionStorage.clear();
            window.location = `/orderdetail/${orderNo}`;
        };
    };

    useEffect(() => {
        if (!localUid) setNeedLoginIn(true);
        (async () => {
            const { data: [{ userName, userPhone, userCity, userCounty, userStreet }] } = await Axios.get(`http://localhost:3001/customer?uid=${localUid}`);
            setOrderName(userName);
            setOrderPhone(userPhone);
            setOrderCity(userCity);
            setOrderCounty(userCounty);
            setOrderStreet(userStreet);
            setDeliverName(userName);
            setDeliverPhone(userPhone);
            setDeliverCity(userCity);
            setDeliverCounty(userCounty);
            setDeliverStreet(userStreet);
        })();
    }, []);

    return (<>
        <InfoBar />
        <main className={style.main}>
            {
                !needLoginIn
                    ? <>
                        <div className={style.form}>
                            <h6 className={style.form__title}>會員(訂購人)資訊</h6>
                            <form className={style.form__iptContainer}>
                                <input type="text" value={orderName} onChange={e => setOrderName(e.target.value)} disabled className={style.form__ipt} />
                                <input type="tel" value={orderPhone} onChange={e => setOrderPhone(e.target.value)} disabled className={style.form__ipt} />
                                <input type="text" value={orderCity} onChange={e => setOrderCity(e.target.value)} disabled className={style.form__ipt} />
                                <input type="text" value={orderCounty} onChange={e => setOrderCounty(e.target.value)} disabled className={style.form__ipt} />
                                <input type="text" value={orderStreet} onChange={e => setOrderStreet(e.target.value)} disabled className={style.form__ipt} />
                            </form>
                        </div>
                        <div className={style.form}>
                            <div className={style.theSame}>
                                <input type="checkbox" id="theSame" onClick={changeTheSame} checked={theSame} className={style.theSame__ckb} />
                                <label htmlFor="theSame" className={style.theSame__txt}>同訂購人</label>
                            </div>
                            <h6 className={style.form__title}>收件人資訊</h6>
                            <form className={style.form__iptContainer}>
                                <input type="text" placeholder="請輸入姓名" value={deliverName} onChange={changeDeliverName} className={style.form__ipt} />
                                <input type="tel" placeholder="聯繫電話" value={deliverPhone} onChange={changeDeliverPhone} className={style.form__ipt} />
                                <input type="text" placeholder="縣市" value={deliverCity} onChange={changeDeliverCity} className={style.form__ipt} />
                                <input type="text" placeholder="鄉鎮市區" value={deliverCounty} onChange={changeDeliverCounty} className={style.form__ipt} />
                                <input type="text" placeholder="地址" value={deliverStreet} onChange={changeDeliverStreet} className={style.form__ipt} />
                            </form>
                        </div>
                        <div className={style.btns}>
                            <button onClick={() => window.location = "/orderthings"} className={`${style.btns__btn} ${style["btns__btn--prev"]}`}>上一步</button>
                            <button onClick={sendDeliver} className={`${style.btns__btn} ${style["btns__btn--next"]}`}>完成訂購</button>
                        </div>
                    </>
                    : <IsLoginDialog />
            }
        </main>
    </>
    );
};

export default withCookies(Customer);