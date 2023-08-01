import React, { Component } from 'react';
import axios from 'axios';
import MemberContainer from "../components/memberContainer"
import CouponCard from "../components/couponCard"
import { withCookies } from 'react-cookie';
import "../css/coupon.css"
class Coupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            amount: [0, 0, 0, 0], // ["未使用", "已使用", "可使用", "無效"]
            curState: 0,
            couponId: [],
            couponInfo: [],
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     return { uid: props.uid }
    // }

    render() {

        return (
            <MemberContainer>

                <div className='display'>
                    <ul id='couponStatus'>
                        <li id='0' style={this.state.curState === 0 ? this.styles.liActive : this.styles.liDeactive} onClick={() => { this.clickHandler(0) }}>未使用({this.state.amount[0]})</li>
                        <li id='1' style={this.state.curState === 1 ? this.styles.liActive : this.styles.liDeactive} onClick={() => { this.clickHandler(1) }}>已使用({this.state.amount[1]})</li>
                        <li id='2' style={this.state.curState === 2 ? this.styles.liActive : this.styles.liDeactive} onClick={() => { this.clickHandler(2) }}>可使用({this.state.amount[2]})</li>
                        <li id='3' style={this.state.curState === 3 ? this.styles.liActive : this.styles.liDeactive} onClick={() => { this.clickHandler(3) }}>無效({this.state.amount[3]})</li>
                    </ul>
                    <hr id="hr" />
                </div>

                <CouponCard couponInfo={this.state.couponInfo} />
            </MemberContainer>

        )
    }

    componentDidMount = async () => {
        await this.getCookieUid();
        await this.fetchCoupon();
    }

    clickHandler = async (s) => {
        await this.setState({ curState: s })
        await this.getStateCoupon()
    }

    getStateCoupon = async () => {
        let sql = await axios.get(`http://localhost:3001/coupon/statecoupon/${this.state.uid}/${this.state.curState}`)
        let cid = []
        sql.data.forEach(element => {
            cid.push(element["couponId"])
        });
        let info = []
        for (let i = 0; i < cid.length; i++) {
            let sql = await axios.get(`http://localhost:3001/coupon/allcoupon/${cid[i]}`)
            info.push(sql.data[0])
        }
        await this.setState({
            couponId: cid,
            couponInfo: info
        })
    }

    styles = {
        liActive: {
            color: "black",
            fontWeight: "bolder"
        },
        liDeactive: {
            color: "gray"
        },
    }


    async fetchCoupon() {
        let sql = await axios.get(`http://localhost:3001/coupon/usercoupon/${this.state.uid}`);
        let a = [0, 0, 0, 0];

        sql.data.forEach(element => {
            if (element["state"] === "未使用") a[0] += 1;
            else if (element["state"] === "已使用") a[1] += 1;
            else if (element["state"] === "可使用") a[2] += 1;
            else if (element["state"] === "無效") a[3] += 1;
        });

        this.setState({ amount: a });
        this.getStateCoupon();
    }

    getCookieUid() {
        const { cookies } = this.props;
        const localUid = cookies.get('localUid');
        this.setState({
            uid: localUid
        }, () => {
            // console.log(this.state.uid);
        });


    }
}

export default withCookies(Coupon);