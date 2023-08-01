import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from '../js/functions';
import style from '../css/homepage.module.scss';
import Axios from 'axios';

const HomepageFeeling = () => {
    const [options, setOptions] = useState([]);
    const [seleted, setSeleted] = useState([]);
    const [alreadySelected, setAlreadySelected] = useState(false);
    const optionRef = useRef();
    const seletedRef = useRef();

    const feelingList = [
        "綠帽的感覺", "想要平靜", "尋求刺激", "踢到桌腳", "中大獎",
        "小人退散", "想去旅行", "失眠的夜晚", "想躺平", "浪漫時刻",
        "開心", "有一點開心", "下午茶時光", "安靜離職中", "遇到豬隊友",
        "燭光晚餐", "憂鬱星期一", "久違的聚會", "滿足", "氣氣氣",
        "被上司罵", "有苦難言", "遇到神隊友", "加薪", "一點小害羞"
    ];

    const getSeleted = async e => {
        const seleted = e.target.innerText;
        const { data } = await Axios.get(`http://localhost:3001/homepage/feeling?key=${seleted}`);
        const newData = data.map(v => {
            let { pImage, pid, ...rest } = v;
            const link = `/product/${pid}`;
            pImage = `http://localhost:3001/public/images/product/${pImage}`;
            return v = { ...rest, pImage, link };
        });
        setSeleted(newData);
        optionRef.current.classList.add(style["feeling__options--move"]);
        seletedRef.current.classList.add(style["feeling__selected--move"]);
        setAlreadySelected(true);
    };

    const moveToPreviousPage = () => {
        optionRef.current.classList.remove(style["feeling__options--move"]);
        seletedRef.current.classList.remove(style["feeling__selected--move"]);
        setAlreadySelected(false);
    };

    useEffect(() => {
        const shuffled = shuffle(feelingList).filter((v, i) => i < 13);
        setOptions(shuffled);
    }, []);

    return (
        <section className={style.feeling}>
            <h4 className={style.feeling__title}><span className={style.feeling__backArrow} onClick={moveToPreviousPage}>{alreadySelected && "➤"}</span>「想知道，你今天過得好嗎？」</h4>
            <div className={style.feeling__area}>
                <div className={style.feeling__options} ref={optionRef}>
                    {
                        options.map((v, i) => <p key={i} onClick={e => getSeleted(e)} className={style.feeling__option}>{v}</p>)
                    }
                </div>
                <div className={style.feeling__selected} ref={seletedRef}>
                    {
                        seleted.map((v, i) =>
                            <figure className={style["feeling__selected-item"]} key={i}>
                                <div className={style["feeling__selected-imgBox"]}>
                                    <Link to={v.link}>
                                        <img src={v.pImage} alt={v.pName} className={style["feeling__selected-img"]} />
                                    </Link>
                                </div>
                                <figcaption className={style["feeling__selected-text"]}>
                                    <p className={style["feeling__selected-name"]}>{v.pName}</p>
                                    <p className={style["feeling__selected-meaning"]}>{v.meaning}</p>
                                </figcaption>
                            </figure>)
                    }
                </div>
            </div>
        </section>
    );
};

export default HomepageFeeling;