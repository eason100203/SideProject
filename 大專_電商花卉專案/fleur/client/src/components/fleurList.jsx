import React from 'react';
import { Link } from "react-router-dom";
import style from '../css/components.module.scss'
import { addClass } from './addClass';

const FleurList = (props) => {
    const { ul, li } = props.classes || {};
    const classes_ul = addClass(style.fleurList_ul, ul);
    const classes_li = addClass(style.fleurList_li, li);

    return (
        <ul className={classes_ul}>
            {
                props.items.map((v, i) =>
                    <li key={i} className={classes_li}>
                        {v.link
                            ? <Link to={v.link}>{v.txt}</Link>
                            : v.txt}
                    </li>
                )
            }
        </ul>
    );
};

export default FleurList; 