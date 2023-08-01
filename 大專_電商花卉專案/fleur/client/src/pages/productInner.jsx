import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { withCookies } from 'react-cookie'
import Axios from 'axios';
import Nav from '../components/nav';
import Footer from '../components/footer';
import IsLoginDialog from '../components/isLoginDialog';
import style from '../css/productInner.module.scss';

const ProductInner = props => {
    const { cookies } = props;
    const { pid } = useParams();
    const [data, setData] = useState({});
    const [amount, setAmount] = useState(1);
    const [inLikeList, setInLikeList] = useState(false);
    const [inCart, setInCart] = useState(false);
    const amountText = useRef(null);
    const [cookieUid] = useState(cookies.get('localUid'));
    const [isLogin, setIsLogin] = useState(true);

    const amountTextChange = () => {
        amountText.current.classList.add(style["amount__text--change"]);
        setTimeout(() => {
            amountText.current.classList.remove(style["amount__text--change"]);
        }, 150);
    };

    const minus = () => {
        setAmount(prev => prev <= 1 ? 1 : prev - 1);
        amountTextChange();
    };

    const plus = () => {
        setAmount(prev => prev >= 999 ? 999 : parseInt(prev + 1));
        amountTextChange();
    };

    const amountUserInput = eValue =>
        setAmount(/^\d+$/.test(eValue) && eValue >= 1 && eValue <= 999
            ? parseInt(eValue)
            : ""
        );

    const addToCart = async () => {
        const cartData = {
            uid: cookieUid,
            pid: pid,
            quantity: amount
        };
        if (cookieUid) {
            setInCart(prev => inCart ? prev : !prev);
            const { status } = await Axios.post("http://localhost:3001/product/shoppingCart", cartData)
            if (status === 200) window.location.reload();
        } else {
            setIsLogin(false)
        };
    };

    const changeIsLogin = () => setIsLogin(true);

    const addToLikeList = async () => {
        const likeListData = {
            uid: cookieUid,
            pid: pid
        };
        if (cookieUid) {
            setInLikeList(prev => !prev);
            inLikeList ? await Axios.delete(`http://localhost:3001/product/likeList?pid=${pid}&uid=${cookieUid}`)
                : await Axios.post('http://localhost:3001/product/likeList', likeListData);
        } else {
            setIsLogin(false)
        };
    };

    useEffect(() => {
        (async () => {
            let { data: [itemData] } = await Axios.get(`http://localhost:3001/product?pid=${pid}`);
            let { pImage, ...rest } = itemData;
            pImage = `http://localhost:3001/public/images/product/${pImage}`;
            itemData = { ...rest, pImage };
            setData(itemData);
        })();
        (async () => {
            const { data } = await Axios.get(`http://localhost:3001/product/likeList?uid=${cookieUid}&pid=${pid}`);
            setInLikeList(data.inLikeList);
        })();
        (async () => {
            const { data } = await Axios.get(`http://localhost:3001/product/shoppingCart?uid=${cookieUid}&pid=${pid}`);
            setInCart(data.inCart);
        })();
    }, []);

    return (
        <>
            <Nav />
            {data && (
                <div className={style.container}>
                    <aside className={style.aside}>
                        <img src={data.pImage} alt="" className={style.aside__img} />
                        <img src="http://localhost:3001/public/images/product/黛安娜玫瑰_1.jpg" alt="" className={style.aside__img} />
                        <img src="http://localhost:3001/public/images/product/黛安娜玫瑰_2.jpg" alt="" className={style.aside__img} />
                        <img src="http://localhost:3001/public/images/product/黛安娜玫瑰_3.jpg" alt="" className={style.aside__img} />
                    </aside>
                    <div className={style.forSticky}>
                        <main className={style.info}>
                            <div className={style.info__titleContainer}>
                                <h5 className={style.info__titleText}>{data.pName}</h5>
                                <p className={style.info__titleText}>NT.{data.unitPrice}</p>
                            </div>
                            <div className={style.amount}>
                                <button onClick={minus} className={style.amount__btn}>－</button>
                                {/* <span className={style.amount__text} ref={amountText}>{amount}</span> */}
                                <input type="text" className={style.amount__text} placeholder="1~999" autoFocus
                                    value={amount} onInput={e => amountUserInput(e.target.value)} ref={amountText} />
                                <button onClick={plus} className={style.amount__btn}>＋</button>
                            </div>
                            <div className={style.buy}>
                                <button className={style.buy__likeList} onClick={addToLikeList}>{inLikeList ? "已加入收藏❤️" : "加入收藏🤍"}</button>
                                <button className={style.buy__cart} onClick={addToCart}>{inCart ? "已加入購物車(*'ω'*)" : "加入購物車('ω')ノ"}</button>
                            </div>
                            <div className={style.info__textContainer}>
                                <div>
                                    <h6 className={style.info__subtitle}>商品資訊</h6>
                                    {/* <p className={style.info__text}>{data.meaning}</p> */}
                                    <p className={style.info__text}>
                                        {pid == "000006"
                                            ? "這是一個芳香而奢華的系列，旨在提升您的日常自我護理水平。提供無與倫比的感官享受，在生活中擁抱玫瑰之美，放鬆身心，在任何空間營造出平靜的氛圍。"
                                            : pid == "000009"
                                                ? "作為襯花，滿天星一向也低調地映襯玫瑰、百合等主花的美態，近年這朵小花卻備受喜愛，由襯花成為主花，亦可製作成乾花，作為優雅的精緻裝飾。"
                                                : data.meaning}
                                    </p>
                                </div>
                                <div>
                                    <h6 className={style.info__subtitle}>詳細規格</h6>
                                    <ul className={style.info__textList}>
                                        <li className={style.info__text}>花材：{data.pName}{amount}朵</li>
                                        <li className={style.info__text}>配件：時令花材</li>
                                        <li className={style.info__text}>包裝：綠色系</li>
                                        <li className={style.info__text}>尺寸：寬45公分、高35公分</li>
                                    </ul>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
            {!isLogin && <IsLoginDialog closeBtn={changeIsLogin} />}
            <Footer />
        </>
    );
};

export default withCookies(ProductInner);