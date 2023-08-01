import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { withCookies } from "react-cookie";
import { createArray } from "../js/functions";
import Axios from "axios";
import Nav from "../components/nav";
import Footer from "../components/footer";
import FleurCard from "../components/fleurCard";
import FleurList from "../components/fleurList";
import SortDialog from "../components/sortDialog";
import MouseCursor from "../components/mouseCursor";
import IsLoginDialog from '../components/isLoginDialog';
import style from "../css/products.module.scss";

const Products = props => {
    const { cookies } = props;
    const [cookieUid] = useState(cookies.get('localUid'));
    const [pageInner, setPageInner] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [as, setAs] = useState([]);
    const [aLen, setALen] = useState(0);
    const [kW, setKW] = useState("");
    const { page } = useParams();
    const [category, pageNum, sort] = page.split('&').map(v => v.slice(v.indexOf('=') + 1));
    const [isLogin, setIsLogin] = useState(true);

    const addToCart = async (pid) => {
        if (cookieUid) {
            const { status } = await Axios.post('http://localhost:3001/product/shoppingCart', {
                uid: cookieUid,
                pid: pid,
                quantity: 1
            });
            if (status === 200) window.location.reload();
        }
        else setIsLogin(false);
    };

    const changeIsLogin = () => setIsLogin(true);

    const myGet = async (url, func) => {
        const { data } = await Axios.get(url);
        await func(data);
    };

    useEffect(() => {
        myGet('http://localhost:3001/products/category', data => {
            const newData = data.map(v => {
                const { category: txt } = v;
                const link = `/products/category=${txt}&page=1&sort=${sort}`;
                return v = { txt, link };
            });
            newData.push(newData.shift());
            newData.unshift({ txt: "全部", link: `/products/category=全部&page=1&sort=${sort}` });
            setCategoryList(newData)
        });
    }, []);

    useEffect(() => {
        myGet(`http://localhost:3001/products?category=${category}&sort=${sort}`, data => {
            const newData = data.map((v, i) => {
                let { pid, pImage, ...rest } = v;
                const link = `/product/${pid}`;
                pImage = `http://localhost:3001/public/images/product/${pImage}`
                return v = { link, pid, pImage, ...rest };
            });
            const min = (pageNum - 1) * 12;
            const max = pageNum * 12 - 1;
            const arr = createArray(Math.ceil(data.length / 12));
            setPageInner(newData.filter((v) => kW ? v.pName.includes(kW) : true).filter((v, i) => min <= i && i <= max));
            setAs(arr.filter((v) => pageNum - 1 <= v && v <= Number(pageNum) + 1));
            setALen(Math.ceil(data.length / 12));
        });
    }, [page, kW]);

    return (
        <>
            <MouseCursor />
            <Nav />
            <div className={style.container}>
                <div className={style.forSticky}>
                    <div className={style.aside}>
                        <h3 className={style.aside__title}>所有商品</h3>
                        <div className={style.search}>
                            <input type="search" placeholder="產品搜尋..." value={kW} onChange={e => setKW(e.target.value)} className={style.search__input} />
                            <img className={style.search__img} src="http://localhost:3001/public/images/search.png" />
                        </div>
                        <aside className={style.aside__nav}>
                            <FleurList items={categoryList} classes={{ ul: style.aside__navList, li: style.aside__navItem }} />
                        </aside>
                    </div>
                </div>
                <section className={style.main}>
                    <header className={style.main__header}>
                        <h5 className={style.main__headerTitle}>{category}</h5>
                        <SortDialog link={[category, pageNum]} classes={style} />
                    </header>
                    <div className={style.main__products}>
                        {
                            pageInner.map((v, i) =>
                                <FleurCard key={i} imgSrc={v.pImage} imgAlt={v.pName}
                                    link={v.link}
                                    inner={<>
                                        <p className={style.product__innerName}>{v.pName}</p>
                                        <p className={style.product__innerPrice}>NT.{v.unitPrice}</p>
                                        <img src="http://localhost:3001/public/images/cartForProduct.png" alt="" className={style.product__innerCart} onClick={() => addToCart(v.pid)} />
                                    </>}
                                    classes={{ card: style.product, image: style.product__img, inner: style.product__inner }} />)
                        }
                    </div>
                    <div className={style.main__pages}>
                        <Link to={`/products/category=${category}&page=1&sort=${sort}`} className={style["main__pages-num"]}>第一頁</Link>
                        {
                            as.map((v, i) => <Link key={i} to={`/products/category=${category}&page=${v}&sort=${sort}`} className={style["main__pages-num"]}>{v}</Link>)
                        }
                        <Link to={`/products/category=${category}&page=${aLen}&sort=${sort}`} className={style["main__pages-num"]}>最後一頁</Link>
                    </div>
                </section>
            </div>
            <Footer />
            {!isLogin && <IsLoginDialog closeBtn={changeIsLogin} />}
        </>
    );
};

export default withCookies(Products);