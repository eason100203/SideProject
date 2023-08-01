import React, { Component } from 'react';
import InfoBar from "./fleurInfoBar";
import MemberNav from "./memberNav";
import styles from '../css/membercontainer.module.css';

class MemberContainer extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        MaxwContainer: 1200,
    }


    render() {
        return (<div>
            <InfoBar></InfoBar>
            <div id={styles.forFlexDiv}>
                <div id={styles.container}>
                    <div id={styles.historyOrder}>
                        <MemberNav></MemberNav>
                        <hr id={styles.hr} />
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default MemberContainer;