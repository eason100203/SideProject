import React, { Component } from 'react';
import styles from "../css/memberNav.module.css";
import { Link } from "react-router-dom";

class MemberNav extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        items: [
            { txt: "個人資料", id: "link1", url: 'http://localhost:3000/member' },
            { txt: "訂單查詢", id: "link2", url: 'http://localhost:3000/history' },
            { txt: "折價券", id: "link3", url: 'http://localhost:3000/coupon' },
            { txt: "收藏清單", id: "link4", url: 'http://localhost:3000/likeList' }
        ],

        UseBorder: false,
        activeItemId: null,
    }
    render() {

        return (
            <ul id={styles.historyItems}>
                {
                    this.state.items.map((item, index) =>
                        <div style={this.styleObj(item.id)} id={item.id} key={index} onClick={() => this.OnBorder(item.id)}>
                            <li><Link to={item.url}>{item.txt}</Link></li>
                        </div>
                    )
                }
            </ul>);
    }

    OnBorder(itemId) {
        this.setState((prevState) => ({
            activeItemId: itemId === prevState.activeItemId ? null : itemId,
        }));
    }

    styleObj(itemId) {
        return {
            borderBottom: this.state.activeItemId === itemId ? '1px solid #4C4844' : 'none',
        };
    }
}

export default MemberNav;
