import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from '../css/InfoBar.module.css';


class InfoBar extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        hello: {
            number: 0
        }
    }

    render() {
        return (<header className={styles.header}>
            <div className={styles.cartoverlay}></div>
            <nav className={styles.nav}>
                <a className={styles.a} href='/'><img src="http://localhost:3001/public/images/LOGOmember.png" /></a>
                {/* <ul>
                    <div className={styles.carts}>
                        <svg width="55" viewBox="0 0 69 76" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.carticon}>
                            <path d="M6.14132 27.3774C6.28967 25.5471 7.83115 24.1367 9.68326 24.1367H59.0898C60.9421 24.1367 62.4836 25.5471 62.6318 27.3774L65.7498 65.8461C66.0821 69.9467 62.8155 73.4561 58.6659 73.4561H10.1071C5.95779 73.4561 2.69092 69.9467 3.0233 65.8461L6.14132 27.3774Z" stroke="#D9D9D9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M48.6005 34.7053V17.0912C48.6005 9.30886 42.2368 3 34.3871 3C26.5372 3 20.1737 9.30886 20.1737 17.0912V34.7053" stroke="#D9D9D9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className={styles.carts__numbercart}>
                            <div id="number-box" className={styles.carts__number}><span style={{ color: 'rgba(217, 217, 217, 1)' }}>{this.state.hello.number}</span></div>
                        </div>
                    </div>
                </ul> */}
            </nav>
        </header>);
    }
}
export default InfoBar;