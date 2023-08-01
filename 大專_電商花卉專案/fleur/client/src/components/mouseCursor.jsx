import React, { useState, useEffect } from 'react';
import style from '../css/mouse.module.css';

const MouseCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const src = "http://localhost:3001/public/images/borboleta-butterfly.gif";

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.pageX + 5, y: e.pageY - window.scrollY + 5 });
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <img className={style.mouse} src={src} style={{
        left: mousePosition.x,
        top: mousePosition.y,
    }} />
};

export default MouseCursor;