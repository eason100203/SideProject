import React from "react"
import { Component } from "react"
import style from '../css/orderthings.module.css';
import cookie from "react-cookies"

class logisticsDialog extends Component {
    state = {
        flag: true,
        store: "711",
        message: "",
        sentCheck: null
    }

    handleUpdate = () => {
        this.setState(prevstate => ({ flag: !prevstate.flag }));
    };
    render() {
        const flag = this.state.flag;
        const { sentTo } = this.props;
        const { messageTo } = this.props;
        return (
            <div className={style.setArea2}>
                <div>
                    <div className={style.afterDialogText}>運送方式</div>
                    <div className={style.CCR}><span id={style.logisticsReady} onClick={this.handleUpdate}>宅配方式</span></div>
                </div>
                <div id={style.dialogOpen3} className={`${style.relative} ${style.dialog}  ${flag === false ? "" : `${style.none}`}`}>
                    <div className={style.closeDialog} onClick={this.handleUpdate}>X</div>
                    <div className={style.dialogBlock} id={style.dialog2}>
                        <div>
                            <label className={style.dialogRadio}>
                                <input type="radio" name="logistics" value="宅配"
                                    onChange={(e) => {
                                        let newState = { ...this.state }
                                        sentTo(e.target.value)
                                        newState.store = null
                                        newState.sentCheck = e.target.value
                                        this.setState(newState)
                                        console.log(newState.sentCheck)
                                    }} />宅配
                            </label>
                        </div>
                        <div>
                            <label className={style.dialogRadio}>
                                <input type="radio" name="logistics" value="超商貨到付款"
                                    onChange={(e) => {
                                        sentTo(e.target.value)
                                        let newState = { ...this.state }
                                        newState.sentCheck = null
                                        newState.store = "711"
                                        this.setState(newState)
                                    }} />超商貨到付款
                            </label>
                        </div>
                        <div>
                            <label className={style.dialogRadio}>
                                <input type="radio" name="logistics" value="超商純取貨"
                                    onChange={(e) => {
                                        let newState = { ...this.state }
                                        sentTo(e.target.value)
                                        newState.sentCheck = null
                                        newState.store = "711"
                                        this.setState(newState)
                                    }} />超商純取貨
                            </label>
                            <div className={style.message2}>
                                超商選擇:  &nbsp;&nbsp;&nbsp;&nbsp;
                            <select  onChange={(e) => {
                                let newState = { ...this.state }
                                newState.sentCheck = null
                                newState.store = e.target.value
                                this.setState(newState)
                            }}>
                                <option value="711">711</option>
                                <option value="FAMI">全家</option>
                                <option value="HILIFE">HiLife</option>
                            </select>
                            </div>
                    <button className={`${style.diaLogBtn} ${style.submit}`}
                        onClick={() => {
                            this.handleGetStore(this.state.store)
                            // this.handleGetStore() 
                            // messageTo(this.state.message)
                            // console.log(this.state.message) 
                        }}>確定</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    handleGetStore = (type) => {
        let store
        let bee
        switch (type) {
            case "711":
                store = "UNIMART"
                break;
            case "FAMI":
                store = "FAMI"
                break;
            case "HILIFE":
                store = "HILIFE"
                break;
            default:
                break;
        }
        if (this.state.store) {
            bee = document.createElement("form")
            bee.method = "POST"
            bee.action = "https://logistics-stage.ecpay.com.tw/Express/map" // 這是測試的網址，文件上會寫正式的是哪個網址
            bee.setAttribute("target", "_blank")
            this.createHiddenInput(bee, "MerchantID", "2000132")
            this.createHiddenInput(bee, "LogisticsType", "CVS")
            this.createHiddenInput(bee, "LogisticsSubType", store)
            this.createHiddenInput(bee, "IsCollection", "N")
            this.createHiddenInput(bee, "ServerReplyURL", "http://localhost:3001/orderthings/mart")
            document.body.appendChild(bee)
            bee.submit()
            this.checkcookie()
            this.handleUpdate()
        } else {
            this.handleUpdate()
        }

    }

    createHiddenInput = (form, name, value) => {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = name;
        hiddenField.value = value;
        form.appendChild(hiddenField);
    };

    checkcookie = () => {
        cookie.remove("message")
        cookie.save("message", "", { path: "/" })
        this.keeplisten()
    }
    keeplisten = () => {
        const { messageTo } = this.props;
        let message = cookie.load('message')
        if (message) {
            let newState = { ...this.state }
            message = JSON.parse(message)
            message = JSON.parse(message)
            newState.message = `門市:${message.CVSStoreName} 地址:${message.CVSAddress}`
            this.setState(newState)
            console.log(newState.message)
            messageTo(newState.message)
        } else {
            setTimeout(this.keeplisten, 1000)
        }
    }

}

export default logisticsDialog;