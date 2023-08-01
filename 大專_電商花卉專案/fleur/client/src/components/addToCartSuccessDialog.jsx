import React from 'react';
import style from "../css/dialog.module.css";

const AddToCartSuccessDialog = props => {

    return (
        <div className={style.dialog}>
            <div className={style.dialog__main}>
                <p className={style.dialog__title}>成功加入購物車</p>
                <button className={style.dialog__btn} onClick={props.closeBtn}>確認</button>
            </div>
        </div>
    );
};

export default AddToCartSuccessDialog;