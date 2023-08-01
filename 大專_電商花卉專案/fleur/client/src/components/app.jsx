import React from "react"
import { Component } from "react"
import style from '../css/orderthings.module.css';
import axios from 'axios';
import { withCookies } from 'react-cookie';
class App extends Component {
    state = {
        flag: true,
        uid: "",
        checked: " ",
        targetValue: "",
        othersale: " ",
        innertext: "折扣碼:",
        saleprice: 0,
        couponItem: [{ uid: "", couponId: "", state: "" ,saleSelect:""}]

    };

    handleUpdate = () => {
        this.setState(prevstate => ({ flag: !prevstate.flag }));
    };


    render() {
        const flag = this.state.flag;
        const {salePriceTo} = this.props;
        const {endChange} = this.props;
        const {productItem} = this.props;
        const {targetCoupon}=this.props;
        return (
            <div className={style.setArea}>
                <div className={style.divBlock}>
                    <div id={style.sale}>折價卷代碼</div>
                    <div><span id={style.dialogReady} className={style.beforeDialogText} onClick={this.handleUpdate}>選擇或自行輸入代碼</span></div>
                </div>
                <div className={style.divBlock2}>
                    <div id={style.prompt}>{this.state.innertext}</div>
                    <button
                        className={style.closeSaleBtn} onClick={() => {
                            let newState = { ...this.state }
                            newState.innertext ?
                                newState.innertext = "折扣碼:" :
                                newState.innertext = ""
                            newState.targetValue = ""
                            this.setState(newState)
                        }
                        }>取消使用</button>
                </div>

                <div id={style.dialogOpen} className={`${style.relative} ${style.dialog}  ${flag === false ? "" : `${style.none}`}`} >
                    <div>
                        <div className={style.closeDialog} onClick={this.handleUpdate}>X</div>
                        <div className={style.dialogBlock}>
                            <div>請輸入您的折扣代碼</div>
                            <input type="text" className={style.saleCode}
                                value={this.state.targetValue}
                                onChange={(e) => {

                                    this.targetValue(e);
                                    targetCoupon(e.target.value)
                                }} />
                        </div>
                        <button className={`${style.diaLogBtn} ${style.submit}`} onClick={() => {
                            let newState = {...this.state}
                            newState.flag = true;
                            this.setState(newState)
                           
                            endChange(Math.floor(
                                (newState.saleprice <= 0 ? 
                                (productItem.filter((item) => item.pState === "bought").reduce((pre, cur) => { return pre += cur.total; }, 0) +  newState.saleprice)
                            : (productItem.filter((item) => item.pState === "bought").reduce((pre, cur) => { return pre += cur.total; }, 0) * newState.saleprice)) + 30
                            )
                            )
                        }}>確認
                        </button>

                    </div>
                </div>
            </div>
        );

    }
    componentDidMount = async () => {
        const{cookies} = this.props
        const localUid = cookies.get('localUid');
        let newState = { ...this.state }
        newState.uid = localUid
        let coupon = await axios.get(`http://localhost:3001/orderthings/coupon/${newState.uid}`)
        newState.couponItem = coupon.data
        this.setState(newState)
        // console.log(coupon.data)
    }


    targetValue = (e) => {
        const {salePriceTo} = this.props;
        const {saleText} =this.props;
        let newState = { ...this.state };
        newState.targetValue = e.target.value;
        this.setState(newState);
        // console.log(newState.targetValue)
       
        let coupinIdCheck =  this.state.couponItem.filter((item)=>{
            return item.couponId  == newState.targetValue  && item.state== "未使用"
        })[0] 
        // console.log(coupinIdCheck)
        //設定選擇哪個折價卷
             
        // 顯示文字
        if (coupinIdCheck) {
            newState.innertext= (coupinIdCheck && coupinIdCheck.saleSelect<=0? `折${coupinIdCheck.saleSelect * -1}元`:`${parseInt(coupinIdCheck.saleSelect*100)}折`)
            newState.saleprice = coupinIdCheck.saleSelect
            this.setState(newState);
            salePriceTo(newState.saleprice)
            saleText(newState.innertext)
        }else{
            newState.innertext="無折扣碼"
        }
        
        
    }   
}

export default withCookies(App);
