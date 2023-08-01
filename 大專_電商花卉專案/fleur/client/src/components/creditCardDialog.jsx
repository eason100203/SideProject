import React from "react"
import { Component } from "react"
import style from '../css/orderthings.module.css';

class creditCardDialog extends Component {
    state = {
        flag: true,
        payfor: "請選擇付款方式 "
    }
    handleUpdate = () => {
        this.setState(prevstate => ({ flag: !prevstate.flag }));
    };
    render() {
        const flag = this.state.flag;
        const { payfor } = this.props;
        return (
            <div className={style.setArea2}>
                <div>
                    <div className={style.afterDialogText}>付款方式</div>
                    <div className={style.CCR}><span id={style.creditCardReady} onClick={this.handleUpdate}> {this.state.payfor}</span></div>
                </div>

                <div id={style.dialogOpen2} className={`${style.relative} ${style.dialog}  ${flag === false ? "" : `${style.none}`}`} >
                    <div className={style.closeDialog} onClick={this.handleUpdate}>X</div>
                    <div className={style.dialogBlock} id={style.dialog}>
                        <div>
                            <label className={style.dialogRadio}>
                                <input type="radio" name="howTo" value="信用卡線上刷卡"
                                    onChange={(e) => {
                                        let newState = { ...this.state }
                                        newState.payfor = e.target.value
                                        this.setState(newState)
                                        payfor(e.target.value)
                                    }} />信用卡線上刷卡
                            </label>
                        </div>
                        <div>
                            <label className={style.dialogRadio}>
                                <input type="radio" name="howTo" value="貨到付款(宅配)"
                                    onChange={(e) => {
                                        let newState = { ...this.state }
                                        newState.payfor = e.target.value
                                        this.setState(newState)
                                        payfor(e.target.value)
                                    }} />貨到付款(宅配)
                            </label>
                        </div>
                        <div>
                            <label className={style.dialogRadio}>
                                <input type="radio" name="howTo" value="貨到付款(超商)"
                                    onChange={(e) => {
                                        let newState = { ...this.state }
                                        newState.payfor = e.target.value
                                        this.setState(newState)
                                        payfor(e.target.value)
                                    }} />貨到付款(超商)
                            </label>
                        </div>
                    </div>
                    <button className={`${style.diaLogBtn} ${style.submit}`} onClick={this.handleUpdate}>確定</button>

                </div></div>
        );
    }
}

export default creditCardDialog;