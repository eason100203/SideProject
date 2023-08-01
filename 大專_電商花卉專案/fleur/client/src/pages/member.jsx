import React, { Component } from 'react';
import axios from 'axios';
import MemberContainer from "../components/memberContainer"
import { withCookies } from 'react-cookie';
import style from '../css/memInfo.module.css';
// 引入元件
import IsLoginDialog from "../components/isLoginDialog"

class Member extends Component {
    state = {
        uid: '',
        pwd: "",
        userName: "",
        headshot: "",
        userEmail: "",
        userPhone: "",
        userAccount: "0",
        userAddress: "",
        userCity: "",
        userCounty: "",
        userStreet: "",
        selectValue: "",
        warning: "",
        checkPassword: "*包含一個小寫字母、數字，共8個字元",
        checkPasswordRepeat: "",
        newPwdCheck: "",
        // 密碼上傳成功失敗dialog
        // lose: true,
        // win: true,
        passwordChange: true,
        //請先登入
        isLogin: true,
        //資料更改dialog
        isData: true,
        dataSelect: 1,
        // 監測資料是否改變
        nameChange: false,
        phoneChange: false,
        phoneText: "",
        cityChange: false,
        countyChange: false,
        streetChange: false,
        emailChange: false,
        emailText: "",
        closeBtn: true,
        eyeChange: false,
        eye:"http://localhost:3001/public/images/eye.png",
        inputType:"password"
    }

    constructor(props) {
        super(props)
        const { cookies } = this.props;
        const localUid = cookies.get('localUid');


        if (localUid) {
            this.state.isLogin = true
            this.setState(this.state)

        } else {
            this.state.isLogin = false
            this.setState(this.state)
        }
    }

    changeIsPassword = () => {
        if (this.state.dataSelect === 4) {
            document.location = "/member"
        }
        this.setState(prevstate => ({ passwordChange: !prevstate.passwordChange }))
    }

    changeIsLogin = () => {
        this.setState(prevstate => ({ isLogin: !prevstate.isLogin }));
    };

    changeIsData = () => {
        if (this.state.dataSelect === 2) {
            document.location = "/member"
        }
        this.setState(prevstate => ({ isData: !prevstate.isData }));
    };

    isDataSelcet = (e) => {
        switch (e) {
            case 1:
                return "請輸入值"

            case 2:
                return "資料更改成功"

            case 3:
                return "請確認信箱或電話輸入正確"
            case 4:
                return "密碼更改成功"
            case 5:
                return "上傳失敗，請符合密碼規定(包含一個小寫字母、數字，共8個字元)，新密碼輸入兩次需相同。"


            default:
                break;
        }
    }

    render() {
        const lose = this.state.lose;
        const win = this.state.win;
        let phone = /[0-9]{10}$/
        let email = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        let name = /^.+$/
        return (

            <>
                <MemberContainer >
                    <div class={style.memberList}>
                        <div>姓名:{this.state.userName}</div>
                        <div>會員帳號:{this.state.uid}</div>
                    </div>
                    <hr class={style.line} />
                    <div class={style.reviseBlockAll}>
                        <div class={style.reviseBlockPart1}>
                            <div>{"\u00A0\u00A0修改會員資料"} </div>
                            {/* 修改姓名 */}
                            <input type="text" name=""
                                placeholder={this.state.userName}
                                onChange={(e) => {
                                    let newState = { ...this.state }

                                    if (name.test(e.target.value.trim())) {
                                        newState.nameChange = true
                                        newState.userName = e.target.value
                                    }
                                    this.setState(newState)
                                }}
                                class={`${style.inputText} ${style.input}`} />


                            {/* 修改電話 */}
                            <input type="text" name="" placeholder={this.state.userPhone}
                                onBlur={(e) => {
                                    let newState = { ...this.state }
                                    if (phone.test(e.target.value)) {
                                        newState.phoneChange = true
                                        newState.userPhone = e.target.value;
                                        newState.phoneText = ""
                                        this.setState(newState)
                                    }
                                    else {
                                        if (e.target.value) {
                                            newState.phoneText = "電話不符合格式"
                                            this.setState(newState)
                                        } else {
                                            newState.phoneText = ""
                                            this.setState(newState)
                                        }
                                    }

                                }} class={`${style.inputText} ${style.input}`} />
                            <div>{this.state.phoneText}</div>

                            {/* 修改城市 */}
                            <div class={style.inputTextInline} >
                                <input class={`${style.inputText} ${style.input}`} id={style.city}
                                    onChange={(e) => {
                                        let newState = { ...this.state }

                                        if (name.test(e.target.value.trim())) {
                                            newState.cityChange = true
                                            newState.userCity = e.target.value
                                        }
                                        this.setState(newState)
                                    }}
                                    placeholder={this.state.userCity}
                                />


                                {/* 修改區域 */}
                                <input class={`${style.inputText} ${style.input}`}
                                    onChange={(e) => {
                                        let newState = { ...this.state }
                                        newState.userCounty = e.target.value;
                                        if (e.target.value) {
                                            newState.countyChange = true
                                        }
                                        this.setState(newState)
                                    }}
                                    placeholder={this.state.userCounty}
                                />
                            </div>


                            {/* 修改地址 */}
                            <input type="text" name=""
                                placeholder={this.state.userStreet}
                                onChange={(e) => {
                                    let newState = { ...this.state }
                                    newState.userStreet = e.target.value;
                                    if (e.target.value) {
                                        newState.streetChange = true
                                    }
                                    this.setState(newState)
                                }} class={`${style.inputText} ${style.input}`} id={style.borderTop}
                            />


                            {/* 修改電子郵件 */}
                            <input type="text" name="" placeholder={this.state.userEmail}
                                onBlur={(e) => {
                                    let newState = { ...this.state }
                                    if (email.test(e.target.value)) {
                                        newState.emailChange = true
                                        newState.userEmail = e.target.value;
                                        newState.emailText = ""
                                        this.setState(newState)
                                    } else {
                                        if (e.target.value) {
                                            newState.emailText = "email不符合格式"
                                            this.setState(newState)
                                        } else {
                                            newState.emailText = ""
                                            this.setState(newState)
                                        }
                                    }

                                }} class={`${style.inputText} ${style.input}`} />
                            <div>{this.state.emailText}</div>

                            <button id={style.ok} onClick={this.okBtn}>確認修改</button>
                        </div>
                        {/* 修改密碼 */}
                        <div class={style.reviseBlockPart2}>
                            {"\u00A0\u00A0修改密碼"}
                            <div id={style.warning}>{this.state.warning}</div>
                            <input type={this.state.inputType} name="" 
                                onChange={(e) => {
                                    this.passwordValidation(e)
                                }} placeholder="新密碼設定" class={`${style.inputText} ${style.input}`}
                            />
                            <div id={style.warning2}>{this.state.checkPassword}</div>
                            {/* 眼睛 */}
                            <img src={this.state.eye} className={style.eye}  onClick={this.eyeChange} />

                            <input type={this.state.inputType} name=""
                                onChange={(e) => {
                                    this.passwordValidation2Step(e)
                                }} placeholder="請再輸入一次新密碼" class={`${style.inputText} ${style.input}`}
                                />
                            <div id={style.warning3}>{this.state.checkPasswordRepeat}</div>
                            {/* 眼睛 */}
                            <img src={this.state.eye} className={style.eyes}  onClick={this.eyeChange} />
                            <button id={style.ok} onClick={this.passwordBtn}>確認修改</button>
                        </div>


                    </div>

                </MemberContainer>

                {/* 沒登入踢除 */}
                {!this.state.isLogin && <IsLoginDialog />}
                {/* 資料輸入不正確 */}
                {!this.state.isData && <IsLoginDialog text={this.isDataSelcet(this.state.dataSelect)} closeBtn={this.changeIsData} />}
                {!this.state.passwordChange && <IsLoginDialog text={this.isDataSelcet(this.state.dataSelect)} closeBtn={this.changeIsPassword} />}

            </>

        )
    }

    componentDidMount = async () => {
        const { cookies } = this.props;
        const localUid = cookies.get('localUid');
        let sql = await axios.get(`http://localhost:3001/member/select/${localUid}`)
        let newstate = { ...this.state }
        newstate = sql.data[0]
        this.setState(newstate)
    }

    eyeChange = () => {
        let newState = { ...this.state }
        newState.eyeChange = !newState.eyeChange
       if (newState.eyeChange){
        newState.eye = "http://localhost:3001/public/images/eyeopen.png"
        newState.inputType ="text"
       }  
       else{
        newState.eye = "http://localhost:3001/public/images/eye.png"
        newState.inputType ="password"
       } 
        this.setState(newState)
    }

    okBtn = async () => {
        let newstate = { ...this.state }
        newstate.userAddress = newstate.userCity + newstate.userCounty + newstate.userStreet
        this.setState(newstate)
        if (newstate.phoneText || newstate.emailText) {
            // 開啟dialog
            newstate.isData = false;
            newstate.dataSelect = 3;
            this.setState(newstate)

        } else if (newstate.nameChange || newstate.cityChange ||
            newstate.countyChange || newstate.streetChange ||
            newstate.phoneChange || newstate.emailChange) {
            let sql = await axios.put(`http://localhost:3001/member/put`, newstate)
            // 開啟dialog
            newstate.isData = false;
            newstate.dataSelect = 2;
            this.setState(newstate)
            // document.location = "/member"
        } else {
            // 開啟dialog
            newstate.isData = false;
            newstate.dataSelect = 1;
            this.setState(newstate)
        }
    }

    passwordBtn = async () => {
        let re = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        // this.state.pwd = this.state.newPwd;
        let newState = { ...this.state }
        if (re.test(this.state.pwd) && this.state.pwd === this.state.newPwdCheck) {
            const { status } = await axios.put(`http://localhost:3001/member/put/password`, this.state)
            // 開啟dialog

            newState.passwordChange = false;
            newState.dataSelect = 4;
            this.setState(newState)
        } else {
            newState.passwordChange = false;
            newState.dataSelect = 5;
            this.setState(newState)

        }

    }

    passwordValidation = (e) => {
        let re = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        let newState = { ...this.state }
        if (re.test(e.target.value)) {
            newState.checkPassword = "密碼符合資格"
            newState.pwd = e.target.value
            this.setState(newState)
            if (newState.newPwdCheck) {
                newState.pwd != newState.newPwdCheck ?
                    newState.checkPasswordRepeat = "請確認新密碼輸入相同且符合規定" : newState.checkPasswordRepeat = "新密碼輸入相同"
            }
        } else {
            newState.checkPassword = "密碼未符合資格"
            this.setState(newState)
        }
    }

    passwordValidation2Step = (e) => {
        let newState = { ...this.state }
        newState.newPwdCheck = e.target.value
        this.setState(newState)
        newState.pwd != newState.newPwdCheck ?
            newState.checkPasswordRepeat = "請確認新密碼輸入相同且符合規定" : newState.checkPasswordRepeat = "新密碼輸入相同"
    }

}

export default withCookies(Member);