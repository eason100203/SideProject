import React from 'react';
import { Link } from "react-router-dom";
import style from '../css/components.module.scss'
import { addClass } from './addClass';

const FleurCard = (props) => {
    const { card, image, inner } = props.classes || {};
    const classes_figure = addClass(style.fleurCard_figure, card)
    const classes_img = addClass(style.fleurCard_img, image)
    const classes_figcaption = addClass(style.fleurCard_figcaption, inner)

    return (
        <figure className={classes_figure}>
            <div className={style.fleurCard_imgContainer}>
                {
                    props.link
                        ? <Link to={props.link}><img src={props.imgSrc} alt={props.imgAlt} className={classes_img} /></Link>
                        : <img src={props.imgSrc} alt={props.imgAlt} className={classes_img} />
                }
            </div>
            <figcaption className={classes_figcaption}>
                {props.inner}
            </figcaption>
        </figure>
    );
};

export default FleurCard;


export const FleurCard2 = (props) => {
    const { card2, image2, inner2 } = props.classes || {};
    const classes_figure2 = addClass(style.fleurCard_figure2, card2)
    const classes_img2 = addClass(style.fleurCard_img2, image2)
    const classes_figcaption2 = addClass(style.fleurCard_figcaption2, inner2)

    return (
        <figure className={classes_figure2}>
            <div style={{ overflow: "hidden" }}>
                {
                    props.link
                        ? <Link to={props.link}><img src={props.imgSrc} alt={props.imgAlt} className={classes_img2} loading="lazy" /></Link>
                        : <img src={props.imgSrc} alt={props.imgAlt} className={classes_img2} loading="lazy" />
                }
            </div>
            <figcaption className={classes_figcaption2}>
                {props.inner}
            </figcaption>
        </figure>
    );
};

