import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { withCookies } from 'react-cookie';

import MemberContainer from '../components/memberContainer';
import FleurCard from '../components/fleurCard';
import IsLoginDialog from '../components/isLoginDialog';
import AddToCartSuccessDialog from '../components/addToCartSuccessDialog';
import style from '../css/likeList.module.scss';

const LikeList = (props) => {
    const { cookies } = props;
    const localUid = cookies.get('localUid');
    const [list, setList] = useState([]);
    const [success, setSuccess] = useState(false);
    const [needToLogin, setNeedToLogin] = useState(false);

    const addToCart = async (pid) => {
        const data = {
            uid: localUid,
            pid,
        }
        const { status } = await Axios.post("http://localhost:3001/likeList", data);
        if (status === 200) setSuccess(true);
    };

    const itemDelete = async (pid) => {
        const { status } = await Axios.delete(`http://localhost:3001/likeList?pid=${pid}`);
        if (status === 200) getLikeList();
    };

    const getLikeList = async () => {
        if (localUid) {
            const { data } = await Axios.get(`http://localhost:3001/likeList?uid=${localUid}`);
            const newData = data.map((v) => {
                let { pid, pImage, ...rest } = v;
                const link = `/product/${pid}`;
                pImage = `http://localhost:3001/public/images/product/${pImage}`;
                return v = { pid, ...rest, pImage, link };
            });
            setList(newData);
        } else setNeedToLogin(true);
    };

    useEffect(() => {
        getLikeList();
    }, []);

    return (<>
        <MemberContainer>
            <main className={style.itemContainer}>
                {list.length === 0
                    ? <div className={style.item__nothing}>
                        <p>無收藏商品</p>
                        <img src='http://localhost:3001/public/images/logo.png' className={style["item__nothing-img"]} alt="" />
                    </div>
                    : list.map((v, i) =>
                        <div className={style.item} key={i}>
                            <FleurCard imgSrc={v.pImage} imgAlt={v.pName} link={v.link}
                                classes={{ card: "", image: style.item__img, inner: style.item__txtContainer }}
                                inner={<>
                                    <p className={style.item__txt}>{v.pName}</p>
                                    <p className={style.item__txt}>NT.{v.unitPrice}</p>
                                    <img className={style.item__cart} alt="" onClick={() => addToCart(v.pid)}
                                        src="http://localhost:3001/public/images/cartForProduct.png" />
                                </>} />
                            <span className={style.item__delete} onClick={() => itemDelete(v.pid)}></span>
                        </div>)
                }
            </main>
        </MemberContainer>
        {needToLogin && <IsLoginDialog />}
        {success && <AddToCartSuccessDialog closeBtn={() => setSuccess(prev => !prev)} />}
    </>);
};


export default withCookies(LikeList);