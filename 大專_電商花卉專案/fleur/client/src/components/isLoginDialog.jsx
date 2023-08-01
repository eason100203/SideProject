import React from 'react';
// import React, { useState } from 'react';
// import useDisableBodyScroll from './useDisableBodyScroll';
import style from "../css/dialog.module.css";

const IsLoginDialog = props => {

    return (
        <div className={style.dialog}>
            <div className={style.dialog__main}>
                <p className={style.dialog__title}>{props.text || "請先登入"}</p>
                {props.closeBtn
                    ? <button className={style.dialog__btn} onClick={props.closeBtn}>確認</button>
                    // ? <button className={style.dialog__btn} onClick={() => setOpen(false)}>確認</button>
                    : <button className={style.dialog__btn} onClick={() => window.location = props.link || "/login"}>確認</button>}
            </div>
        </div>
    );
};

export default IsLoginDialog;