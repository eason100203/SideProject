import React, { useEffect, useRef, useState } from 'react';
import useDisableBodyScroll from './useDisableBodyScroll';

const SortDialogSearch = ({ classes: style, func }) => {
    const [dialogHeight, setDialogHeight] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const container = useRef();
    const dialog = useRef();
    const mask = useRef();

    useEffect(() => {
        const height = getComputedStyle(dialog.current).height;
        setDialogHeight(height);
        dialog.current.style.height = "0px";
    }, []);

    useEffect(() => {
        if (openDialog) {
            container.current.style.zIndex = 1002;
            dialog.current.style.height = dialogHeight;
            mask.current.classList.add(style["sort__mask--show"]);
        } else {
            container.current.style.zIndex = '';
            dialog.current.style.height = "0px";
            mask.current.classList.remove(style["sort__mask--show"]);
        };
    }, [openDialog]);

    useDisableBodyScroll(openDialog);

    return (
        <>
            <div className={style.sort} onClick={() => setOpenDialog(prev => !prev)} ref={container}>
                <button className={style.sort__btn}>排序</button>
                <ul className={style.sort__list} ref={dialog}>
                    <li className={style.sort__item}>
                        <span onClick={() => func("lowToHigh")}>金額由低至高</span>
                    </li>
                    <li className={style.sort__item}>
                        <span onClick={() => func("highToLow")}>金額由高至低</span>
                    </li>
                    <li className={style.sort__item}>
                        <span onClick={() => func("default")}>預設排序</span>
                    </li>
                </ul>
            </div>
            <div className={style.sort__mask} onClick={() => setOpenDialog(prev => !prev)} ref={mask}></div>
        </>
    );
};

export default SortDialogSearch;