import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createArray } from '../js/functions';
import Axios, { all } from 'axios';
import Nav from '../components/nav';
import Footer from '../components/footer';
import FleurCard from '../components/fleurCard';
import HomepageFeeling from '../components/homepageFeeling';
import style from '../css/homepage.module.scss';

const Homepage = () => {
    const [season, setSeason] = useState([]);
    const [asLen, setAsLen] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            const { data } = await Axios.get(`http://localhost:3001/homepage/season?page=${page}`)
            const newData = data.map((v, i) => {
                let { pid, pImage, ...rest } = v;
                const link = `/product/${pid}`;
                pImage = `http://localhost:3001/public/images/product/${pImage}`;
                return v = { pid, ...rest, pImage, link };
            })
            setSeason(newData);
        })();
    }, [page]);

    useEffect(() => {
        (async () => {
            const { data: [{ count }] } = await Axios.get("http://localhost:3001/homepage/season");
            const allPages = Math.ceil(count / 8);
            setAsLen(allPages);
        })();
    }, [])

    return (
        <>
            <Nav></Nav>
            <main className={style.main}>
                <HomepageFeeling />
                <section className={style.season}>
                    <h4 className={style.season__title}>季節花選</h4>
                    <div className={style.season__result}>
                        {
                            season.map((v, i) =>
                                <FleurCard key={i} imgSrc={v.pImage} imgAlt={v.pName} inner={v.pName} link={v.link}
                                    classes={{ card: style.season__item, image: style.season__img, inner: style.season__text }} />)
                        }
                        <div className={style.season__pages}>
                            <Link onClick={() => setPage(1)} className={style.season__page}>第一頁</Link>
                            {
                                createArray(asLen).filter((v) => page - 1 <= v && v <= Number(page) + 1)
                                    .map((v, i) => <Link key={i} onClick={() => setPage(v)} className={style.season__page}>{v}</Link>)
                            }
                            <Link onClick={() => setPage(asLen)} className={style.season__page}>最後一頁</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Homepage;