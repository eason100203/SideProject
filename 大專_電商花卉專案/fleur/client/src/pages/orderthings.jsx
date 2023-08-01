import React, { Component } from 'react';
import axios from 'axios';
import InfoBar from '../components/fleurInfoBar';
import App from "../components/app"
import CreditCardDialog from "../components/creditCardDialog"
import LogisticsDialog from "../components/logisticsDialog"
import style from '../css/orderthings.module.css';


import { withCookies } from 'react-cookie';

class orderthings extends Component {
    state = {
        uid: "",
        pid: "",
        productItem: [{
            pImage: "", pid: "",
            pName: "", price: "", quantity: "", total: 0, pState: "", text: ""
        }],
        deliveryFee: parseInt(30),
        saleprice: 0,
        saleText: "",
        sentTo: "",
        payfor: "",
        end: 0,
        random: "",
        message: "",
        couponItem: [{ uid: "", couponid: "", state: "" }],
        targetCoupon: ""
    }

    sentTo(sentTo) {
        this.setState({ sentTo })
    }
    payfor(payfor) {
        this.setState({ payfor })
    }
    messageTo(message) {
        this.setState({ message })
    }
    salePriceTo(saleprice) {
        this.setState({ saleprice })
    }
    saleText(saleText) {
        this.setState({ saleText })
    }
    endChange(end) {
        this.setState({ end })
    }
    targetCoupon(targetCoupon) {
        this.setState({ targetCoupon })
    }
    render() {

        return (
            <>
                <InfoBar />
                <div id={style.outerDiv} >
                    <div className={style.orderDetail}>訂單明細</div>
                    <hr id={style.hr} />
                    <div className={style.orderBlock}>
                        <span className={style.orderProduct}>
                            商品
                        </span>
                        <span className={style.orderText}>
                            描述
                        </span>
                        <span className={style.orderPrice}>
                            單價
                        </span>
                        <span className={style.orderQuantity}>
                            數量
                        </span>
                        <span className={style.ordertotal}>
                            金額
                        </span>
                    </div>

                    <div className={style.line2}></div>
                    {this.state.productItem.map((item, index) => {
                        return (this.state.productItem[index].pState === "bought" ?
                            <div key={index} className={style.cartBlock}>
                                <img className={style.cartImage} src={`http://localhost:3001/public/images/product/${item.pImage}`}></img>
                                <span className={style.cartText}>{item.pName}</span>
                                <span className={style.cartPrice}>{item.price}</span>
                                <span className={style.cartQuanitiy}>{item.quantity}</span>
                                <span className={style.cartTotal}>{item.total}</span>
                            </div>

                            : "")
                    })}

                    <div className={style.line2}></div>
                    <div><App salePriceTo={this.salePriceTo.bind(this)}
                        endChange={this.endChange.bind(this)} productItem={this.state.productItem}
                        saleText={this.saleText.bind(this)} targetCoupon={this.targetCoupon.bind(this)}
                    /></div>

                    <div className={style.line2}></div>

                    <CreditCardDialog payfor={this.payfor.bind(this)} />

                    <div className={style.line2}></div>
                    <LogisticsDialog sentTo={this.sentTo.bind(this)} messageTo={this.messageTo.bind(this)} />
                    <div className={style.message}>{this.state.message}</div>


                    <div className={style.line2}></div>

                    <div className={style.priceTextBlock}>
                        <div className={style.priceTextFirst} > 商品小計</div>
                        <div className={style.priceTextFirst} id={style.a1}>
                            {this.state.productItem.filter((item) => item.pState === "bought").reduce((pre, cur) => {
                                return pre += cur.total
                            }, 0)}
                        </div>
                        <div className={style.priceText}>折價卷折扣金額</div>
                        <div className={style.priceText} id={style.a2}>{this.state.saleprice < 0 ?   this.state.saleprice : `${this.state.saleprice * 100}折`}</div>
                        <div className={style.priceText}>運費</div>
                        <div className={style.priceText} id={style.a3}>{this.state.deliveryFee}</div>
                        <div className={style.priceTextEnd}>總金額</div>
                        <div className={style.priceTextEnd} id={style.a4}>NT.{this.state.end}</div>
                    </div>
                    <div className={style.btnGrid}>
                        <button id={style.up} onClick={this.back}>上一步</button>
                        <button id={style.down} onClick={this.submitBtn}>下一步</button>
                    </div>
                </div>
            </>


        );
    }

    componentDidMount = async () => {
        //抓cookie
        const { cookies } = this.props
        const localUid = cookies.get('localUid');
        let newState = { ...this.state }
        //是否登入驗證
        if (localUid) {
            newState.uid = localUid
            this.setState(newState)
            let sql = await axios.get(`http://localhost:3001/orderthings/${localUid}`)
            newState.productItem = sql.data
            // console.log(newState.productItem)
            this.setState(newState)
        } else {
            alert("請先登入")
            document.location.href = "/login"
        }
        // 兩種折價卷判斷
        newState.end = Math.floor((newState.saleprice <= 0 ? (newState.productItem.filter((item) => item.pState === "bought").reduce((pre, cur) => { return pre += cur.total; }, 0) + newState.saleprice)
            : (newState.productItem.filter((item) => item.pState === "bought").reduce((pre, cur) => { return pre += cur.total; }, 0) * newState.saleprice)) + newState.deliveryFee);
        this.setState(newState)

        // 折價卷
        let coupon = await axios.get(`http://localhost:3001/orderthings/coupon/${this.state.uid}`)
        newState.couponItem = coupon.data;
        this.setState(newState);
        // console.log(newState.couponItem)
        console.log(coupon)
        
        // console.log("是否有可使用折價卷:"+JSON.stringify(newState.couponItem))


    }

    submitBtn = async () => {
        let mapProduct = JSON.stringify(this.state.productItem.filter((item) => {
            return item.pState === "bought"
        }), ["uid", "pid", "pName", "price", "quantity", "total", "text"]);
        this.state.random = "SP" + Math.floor(Math.random() * 1000000)
        sessionStorage.setItem("OrderProduct", mapProduct)
        sessionStorage.setItem("OrderOwner", this.state.uid)
        sessionStorage.setItem("OrderDate", new Date().toLocaleString())
        sessionStorage.setItem("OrderNo", this.state.random)
        sessionStorage.setItem("OrderPay", this.state.payfor)
        sessionStorage.setItem("OrderSent", this.state.sentTo)
        sessionStorage.setItem("OrderAddress", this.state.message)
        sessionStorage.setItem("OrderAmount", this.state.end)
        if (this.state.couponItem.length == 0) {
            sessionStorage.setItem("couponState","沒有使用折扣碼")
        }else{
            sessionStorage.setItem("couponState",this.state.couponItem[0].state)
        }
        sessionStorage.setItem("couponId", this.state.targetCoupon)
        sessionStorage.setItem("couponText", this.state.saleText)
        await axios.post(`http://localhost:3001/orderthings/nextStep/${this.state.uid}`, this.state)
        window.location = "/customer";
    }

    back = async () => {
        let sql = await axios.post(`http://localhost:3001/orderthings/backStep/${this.state.uid}`)
        document.location.href = "/cartlist"
    }



}

export default withCookies(orderthings);