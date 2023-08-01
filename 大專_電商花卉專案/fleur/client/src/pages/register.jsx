import React, { Component } from 'react';
// import { hash } from 'bcrypt';
import InfoBar from "../components/fleurInfoBar";
import style from "../css/register.module.css";
import axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        uid: '',
        pwd: '',
        pwd2: '',
        userName: '',
        userCity: '',
        userCounty: '',
        userStreet: '',
        notSame: '',
        phone: '',
        email: '',
        Code: '',
        Vcode: '',
        isUidValid: null,
        isPwdValid: null,
        isPhoneValid: null,
        isEmailValid: null,
        isCodeValid: null,
        isCodeSent: false,
        disabled: true,
        cursorState: false,

    }

    render() {

        return (
            <React.Fragment>

                <InfoBar />
                <div className={style.forFlex}>
                    <div id={style.outerDiv}>
                        <div className={style.orderDetail}>註冊會員</div>
                        <hr />
                        <div className={style.inputStyle}>
                            <div>
                                <label htmlFor="uid">帳號:</label>
                                <br />
                                <input type="text" name="uid" id="uid" className={style.inputStyle_Text} onBlur={(e) => { this.inputUid(e) }} placeholder='輸入含有英文及數字至少8位數的帳號' />
                                {/* <div>當isUidVail不為null的時候才會接著條件渲染</div> */}
                                {/* {第一個條件為真 && 則繼續計算并返回第二个條件的值} */}
                                {this.state.isUidValid !== null && (
                                    <div>
                                        {!this.state.isUidValid && <span style={{ marginLeft: '0px', color: 'red' }}>格式錯誤</span>}
                                        {this.state.isUidValid && (this.state.uid ?
                                            (<span style={{ marginLeft: '0px', color: 'green' }}>格式正確</span>) : (
                                                <span style={{ marginLeft: '0px', color: 'red' }}>帳號已被註冊</span>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            <br />

                            <div>
                                <label htmlFor="pwd">密碼:</label>
                                <br />
                                <input type="password" name="pwd" id="pwd" className={style.inputStyle_Text} onInput={(e) => { this.inputPassword(e) }} placeholder='輸入含有英文及數字至少8位數的密碼' autoComplete='off' />
                                {this.state.isPwdValid !== null && (
                                    <span style={{ marginLeft: '0px', color: this.state.pwd ? 'green' : 'red' }}>{this.state.pwd ? '格式正確' : '格式錯誤'}</span>
                                )}
                            </div>

                            <br />

                            <div>
                                <label htmlFor="pwd2">再輸入一次密碼:</label>
                                <br />
                                <input type="password" name="pwd2" id="pwd2" className={style.inputStyle_Text} onInput={(e) => { this.inputPassword2(e) }} autoComplete='off' />
                                <span style={{ marginLeft: '0px', color: this.state.pwd2 === this.state.pwd ? 'green' : 'red' }}>{this.state.notSame}</span>
                            </div>

                            <br />

                            <div>
                                <label htmlFor="userName">姓名:</label>
                                <br />
                                <input type="text" name="userName" id="userName" className={style.inputStyle_Text} onInput={(e) => { this.inputName(e) }} placeholder='王大明' />
                                <span style={{ marginLeft: '0px' }}></span>
                            </div>

                            <br />

                            <div>
                                <label htmlFor="userPhone">手機號碼:</label>
                                <br />
                                <input type="text" name="userPhone" id="userPhone" className={style.inputStyle_Text} onInput={(e) => { this.inputPhone(e) }} placeholder='0920123123' />
                                {this.state.isPhoneValid !== null && (
                                    <span style={{ marginLeft: '0px', color: this.state.phone ? 'green' : 'red' }}>{this.state.phone ? '格式正確' : '格式錯誤'}</span>
                                )}
                            </div>

                            <br />

                            <div>
                                <label htmlFor="userEmail">Email:</label>
                                <br />
                                <input type="email" name="userEmail" id="userEmail" className={style.inputStyle_Text} onInput={(e) => { this.inputEmail(e) }} placeholder='wangdaming@gmail.com' />
                                {this.state.isEmailValid !== null && (
                                    <span style={{ marginLeft: '0px', color: this.state.email ? 'green' : 'red' }}>{this.state.email ? '格式正確' : '格式錯誤'}</span>
                                )}<button className={style.verificationCode} style={{ display: this.state.email ? 'inline-block' : 'none' }} onClick={() => { this.insertVer() }}>傳送驗證碼</button>
                            </div>
                            <br />
                            <div>
                                <label htmlFor="verificationCode">驗證碼:</label>
                                <br />
                                <input type="text" id="verificationCode" className={style.inputStyle_Text} onInput={(e) => { this.inputCode(e) }} placeholder='請輸入6位阿拉伯數字' />
                                {this.state.isCodeValid !== null && (
                                    <span style={{ marginLeft: '0px', color: this.state.Code ? 'green' : 'red' }}>{this.state.Code ? '驗證碼正確' : '驗證碼錯誤'}</span>
                                )}
                            </div>
                            <br />

                            <div>
                                <label htmlFor="userAddress">地址:</label>
                                <br />
                                <div>
                                    <input type="text" name="userCity" id="userCity" className={style.inputStyle_Address} onInput={(e) => { this.inputCity(e) }} placeholder='台中市' />
                                    <input type="text" name="userCounty" id="userCounty" className={style.inputStyle_Address} onInput={(e) => { this.inputCounty(e) }} placeholder='南屯區' />
                                    <br />
                                    <input type="text" name="userAddress" id="userAddress" className={style.inputStyle_Text} onInput={(e) => { this.inputStreet(e) }} placeholder='公益路一段1號' />
                                    <span style={{ marginLeft: '0px' }}></span>
                                </div>
                            </div>


                            <button id={style.ok} style={{ cursor: this.state.cursorState ? 'pointer' : 'default', color: this.state.disabled ? 'lightgray' : 'black' }} disabled={this.state.disabled} onClick={() => { this.insertBtn() }}>提交</button>
                        </div>

                    </div>
                </div>
                {this.insertJudgment()};
            </React.Fragment>

        );
    }


    inputUid = async (e) => {
        if (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(e.target.value)) {
            let sql = await axios.post('http://localhost:3001/register/Uid', { seUid: e.target.value });
            // console.log(sql.data);
            if (sql.data.length <= 0) {
                this.setState({
                    uid: e.target.value,
                    isUidValid: true
                })
            } else {
                this.setState({
                    uid: '',
                    isUidValid: true,
                })
            }

        } else {
            this.setState({
                uid: '',
                isUidValid: false,
            })
        }

        // console.log(this.state.uid)
    }


    inputName = (e) => {
        this.setState({
            userName: e.target.value
        })
    }


    inputCity = (e) => {
        this.setState({
            userCity: e.target.value
        })

    }


    inputCounty = (e) => {
        this.setState({
            userCounty: e.target.value
        })

    }

    inputStreet = (e) => {
        this.setState({
            userStreet: e.target.value
        })

    }


    inputPassword = (e) => {
        if (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(e.target.value)) {
            this.setState({
                pwd: e.target.value,
                isPwdValid: true
            })

        } else {
            this.setState({
                pwd: '',
                isPwdValid: false,
            })
        }
    }


    //兩邊密碼是否相同
    inputPassword2 = (e) => {

        const { pwd } = this.state;
        const pwd2 = e.target.value;

        this.setState({
            pwd2,
        },
            () => {
                const { pwd2 } = this.state;
                if (pwd2 !== pwd) {
                    this.setState({
                        notSame: '密碼不同',
                    });
                } else {
                    this.setState({
                        notSame: '密碼相同',
                    });
                }
            }
        );
    };

    inputPhone = (e) => {
        if (/^09\d{2}\d{3}\d{3}$/.test(e.target.value)) {
            this.setState({
                phone: e.target.value,
                isPhoneValid: true
            })
        } else {
            this.setState({
                phone: '',
                isPhoneValid: false,
            })
        }
    };

    inputEmail = (e) => {
        if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
            this.setState({
                email: e.target.value,
                isEmailValid: true,
                Vcode: '',
                isCodeValid: null,

            })
        } else {
            this.setState({
                email: '',
                isEmailValid: false,
            })
        }
    }

    // 更新狀態componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
        const { pwd, pwd2 } = this.state;
        //即時更新密碼是否相同
        if (pwd !== prevState.pwd || pwd2 !== prevState.pwd2) {
            if (pwd2 !== pwd) {
                this.setState({
                    notSame: '密碼不同',

                });
            } else {
                this.setState({
                    notSame: '密碼相同',
                });
            }
        };
    }

    // 更新欄位是否有值,以及密碼是否相同,再更改disabled狀態
    insertJudgment = () => {
        const { uid, pwd, pwd2, phone, email, userCity, userName, userCounty, userStreet, Code, Vcode } = this.state;
        if (uid && pwd && pwd2 && phone && email && userCity && userName && userCounty && userStreet && Code && Vcode) {
            if (pwd === pwd2 && Code === Vcode) {
                if (this.state.disabled) {
                    this.setState({
                        cursorState: true,
                        disabled: false,
                    });
                }
            } else {
                if (!this.state.disabled) {
                    this.setState({
                        cursorState: false,
                        disabled: true,
                    });
                }
            }
        } else {
            if (!this.state.disabled) {
                this.setState({
                    cursorState: false,
                    disabled: true,
                });
            }
        }
    };



    insertVer = async () => {
        let VertiCode = Math.floor(Math.random() * 1000000);
        let VertiCode2 = VertiCode.toString().padStart(6, '0')
        // console.log(VertiCode2);
        this.setState({
            Code: '',
            Vcode: VertiCode2,
            isCodeValid: null,
        });
        await axios.post('http://localhost:3001/register/Vcode', {
            Vcode: VertiCode2,
            email: this.state.email
        })
    }


    inputCode = (e) => {
        const inputCode = e.target.value;
        if (inputCode !== this.state.Vcode) {
            this.setState({
                Code: '',
                isCodeValid: false,
            });
        } else {
            this.setState({
                Code: inputCode,
                isCodeValid: true,
            });
        }
    };


    insertBtn = async () => {
        const { uid, pwd, phone, email, userCity, userName, userCounty, userStreet } = this.state;
        let NewCity = userCity + userCounty + userStreet;

        let sql = await axios.post('http://localhost:3001/register', {
            uid: uid,
            pwd: pwd,
            phone: phone,
            email: email,
            userName: userName,
            userCity: userCity,
            userCounty: userCounty,
            userStreet: userStreet,
            userAddress: NewCity,
        })

        if (sql.data) {
            setTimeout(() => { window.location.href = "http://localhost:3000"; }, 600)

        }
    }
}

export default Register;