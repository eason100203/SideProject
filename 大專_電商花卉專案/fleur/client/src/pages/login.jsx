import React, { Component } from 'react';
import InfoBar from '../components/fleurInfoBar';
import style from "../css/register.module.css";
import shake from "../css/cssshake.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import Nina from "./ninamachine";

class Login extends Component {
    constructor(props) {
        super(props);
        // this.divRef = React.createRef();
        // 創造ref //盡量不要用ref因為直接操作DOM違反了REACT的開發原則
    }
    state = {
        uid: '',
        pwd: '',
        haveValue: null,
        haveAccount: false,
        isShaking: false,
    }


    render() {
        return (<React.Fragment>
            <InfoBar />
            <div className={style.forFlex}>
                <div id={style.outerDiv}>
                    <div className={style.orderDetail}>登入會員</div>
                    <hr />
                    <form className={style.inputStyle}>
                        <div>
                            <label htmlFor="uid">帳號:</label>
                            <br />
                            <input type="text" id="uid" className={style.inputStyle_Text} onBlur={(e) => { this.inputUid(e) }} placeholder='請輸入帳號' />
                        </div>

                        <br />

                        <div>
                            <label htmlFor="pwd">密碼:</label>
                            <br />
                            <input type="password" id="pwd" className={style.inputStyle_Text} onBlur={(e) => { this.inputPwd(e) }} placeholder='請輸入密碼' autoComplete='off' />
                            <p><a className={style.forgotPwd} href="http://localhost:3000/forgotpwd">忘記密碼?</a></p>
                        </div>
                        <br />

                        <ReCAPTCHA
                            className={style.ReCAPTCHA}
                            sitekey="6LcOugcnAAAAABt8BDN1t2KNvdjC9LAqTtUeOgxD"
                            onChange={this.handleKeyDown}

                        />

                        <div id={style.heightDiv}>  {/* ref={this.divRef} */}
                            {this.state.haveValue !== null && (
                                <p className={this.state.isShaking ? `${shake.shake} ${shake['shake-horizontal']}` : null} style={{ color: this.state.haveAccount ? 'green' : 'red' }}>
                                    {this.state.haveAccount ? '登入成功..跳轉頁面中' : '帳號密碼錯誤或尚未勾選驗證'}
                                </p>)}
                        </div>
                    </form>
                    <div id={style.okFlex}>
                        <button id={style.ok2}><a href="http://localhost:3000/register">立即註冊</a></button>
                        <button id={style.ok2} onClick={() => { this.loginBtn() }}>提交</button>
                    </div>
                </div>
            </div>

        </React.Fragment>);
    }


    inputUid = (e) => {
        this.setState({
            uid: e.target.value,
        })
    };

    inputPwd = (e) => {
        this.setState({
            pwd: e.target.value,
        })
    }



    loginBtn = async () => {
        const { uid, pwd } = this.state;
        const { cookies } = this.props;
        let sql = await axios.post('http://localhost:3001/login', { uid: uid, pwd: pwd });
        // console.log(sql.data[0].uid);
        if (sql.data !== 'noRows' && localStorage.getItem('_grecaptcha') !== null) {
            this.setState({
                haveAccount: true,
                haveValue: true,
                uid: sql.data[0].uid,
            })
            var localUid = this.state.uid;
            cookies.set('localUid', localUid, { path: '/', expires: new Date(Date.now() + 60000 * 60 * 4) });

            setTimeout(() => {
                sql.data[0].loginCount === 0
                    ? window.location.href = '/ninamachine'
                    : window.location.href = '/'
            }, 800)

        } else {
            this.setState({
                haveAccount: false,
                haveValue: false,
                isShaking: true,
            }, () => {
                setTimeout(() => {
                    this.setState
                        ({
                            isShaking: false
                        })
                }, 200)

                //在標籤後添加ref屬性等於創造的ref名稱,用this.ref來操作該標籤
                // this.divRef.current.classList.add('shake', 'shake-horizontal'); // 
                // setTimeout(() => {
                //     this.divRef.current.classList.remove('shake', 'shake-horizontal');
                // }, 800);
            });
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.loginBtn();
        }
    };

    onChange = (value) => {
        console.log("Captcha value:", value);
    }

}

export default withCookies(Login);