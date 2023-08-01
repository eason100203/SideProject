import React, { Component } from 'react';
import styles from '../css/footer.module.css';


class Footer extends Component {
    constructor(props) {
        super(props);
    }
    state = {

    }

    render() {


        return (<React.Fragment>
            <footer className={styles.footer}>
                <div className={styles.fleurFooter__icon}><img className={styles.fleurFooter__iconImg} src="http://localhost:3001/public/images/logo.png" alt="" /></div>
                <div style={{ margin: '25px 20px 0 auto' }}>
                    <img className={styles.fleurIcons} src="http://localhost:3001/public/images/facebook.png" />
                    <img className={styles.fleurIcons} src="http://localhost:3001/public/images/instagram.png" />
                    <img className={styles.fleurIcons} src="http://localhost:3001/public/images/line.png" />
                </div>
            </footer>
        </React.Fragment >);
    }
}

export default Footer;