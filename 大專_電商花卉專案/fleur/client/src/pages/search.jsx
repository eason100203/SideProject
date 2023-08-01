import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Nav from '../components/nav';
import Footer from '../components/footer';
import FleurCard from '../components/fleurCard';
import SortDialogSearch from '../components/sortDialogSearch';
import IsLoginDialog from '../components/isLoginDialog';
import style from '../css/search.module.scss';
import { createArray } from '../js/functions';
import { withCookies } from 'react-cookie';


const Search = (props) => {
    const { cookies } = props;
    const localUid = cookies.get('localUid');
    const [allData, setAllData] = useState([]);
    const [search, setSearch] = useState([]);
    const [pageInner, setPageInner] = useState([]);
    const [as, setAs] = useState([]);
    const [page, setPage] = useState(1);
    const [keyWord, setKeyWord] = useState("");
    const [needToLogin, setNeedToLogin] = useState(false);

    const min = (page - 1) * 12;
    const max = page * 12 - 1;

    const addToCart = async (pid) => {
        if (localUid) {
            const { status } = await Axios.post('http://localhost:3001/product/shoppingCart', {
                uid: localUid,
                pid,
                quantity: 1
            });
            if (status === 200) window.location.reload();
        } else {
            setNeedToLogin(true);
        };
    };

    const closeBtn = () => setNeedToLogin(false);

    const sort = (sort) => {
        const temp = [...search].sort((x, y) => {
            switch (sort) {
                case "lowToHigh":
                    return x.unitPrice - y.unitPrice;
                case "highToLow":
                    return y.unitPrice - x.unitPrice;
                default:
                    return x.pid - y.pid;
            };
        });
        setSearch(temp);
    };

    useEffect(() => {
        (async () => {
            const { data } = await Axios.get('http://localhost:3001/search');
            const newData = data.map((v, i) => {
                let { pid, pImage, ...rest } = v;
                pImage = `http://localhost:3001/public/images/product/${pImage}`;
                const link = `/product/${pid}`;
                return v = { pid, pImage, link, ...rest };
            });
            setAllData(newData);
            setSearch(newData);
            setAs(createArray(Math.ceil(newData.length / 12)));
            setPageInner(newData.filter((v, i) => min <= i && i <= max));
        })();
    }, []);

    useEffect(() => {
        const searched = allData.filter(v => v.pName.includes(keyWord) || v.category.includes(keyWord));
        setPage(1);
        setSearch(searched);
        setAs(createArray(Math.ceil(searched.length / 12)));
        setPageInner(searched.filter((v, i) => min <= i && i <= max));
    }, [keyWord]);

    useEffect(() => {
        setPageInner(search.filter((v, i) => min <= i && i <= max));
    }, [page, search]);

    return (
        <>
            <Nav />
            <div className={style.main}>
                <div className={style.title}>
                    <div className={style.search}>
                        <input className={style.search__input} type="search" placeholder="產品搜尋..." value={keyWord} onChange={e => setKeyWord(e.target.value)} autoFocus />
                        <img className={style.search__img} src="http://localhost:3001/public/images/search.png" />
                    </div>
                    <h3 className={style.title__text}>我們找到{search.length}件有關{keyWord}的商品</h3>
                    <SortDialogSearch classes={style} func={sort} />
                </div>
                <main className={style.result}>
                    {
                        pageInner.map((v, i) =>
                            <FleurCard key={i} classes={{ card: style.product, image: style.product__img, inner: style.product__inner }}
                                imgSrc={v.pImage} imgAlt={v.pName} link={v.link}
                                inner={<>
                                    <p className={style.product__innerName}>{v.pName}</p>
                                    <p className={style.product__innerPrice}>NT.{v.unitPrice}</p>
                                    <img src="http://localhost:3001/public/images/cartForProduct.png" className={style.product__innerCart}
                                        onClick={() => addToCart(v.pid)} />
                                </>} />
                        )
                    }
                </main>
                <div className={style.page}>
                    <Link className={style.page__num} onClick={() => setPage(1)}>第一頁</Link>
                    {
                        as.filter((v) => page - 1 <= v && v <= Number(page) + 1)
                            .map((v, i) => <Link key={i} className={style.page__num} onClick={() => setPage(v)}>{v}</Link>)
                    }
                    <Link className={style.page__num} onClick={() => setPage(as[as.length - 1])}>最後一頁</Link>
                </div>
            </div>
            <Footer />
            {needToLogin && <IsLoginDialog closeBtn={closeBtn} />}
        </>
    );
};

export default withCookies(Search);