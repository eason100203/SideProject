import React, { useState, useEffect } from 'react';
import InfoBar from '../components/fleurInfoBar';
import style from "../css/register.module.css";
import shake from "../css/cssshake.module.css";
import axios from 'axios';
import IsLoginDialog from "../components/isLoginDialog"

function ForgorPwd() {

    const [CorrectMem, setCorrectMem] = useState(false);
    const [haveValue, setHaveValue] = useState(false);
    const [uid, setUid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [Vcode, setVcode] = useState('');
    const [isCodeValid, setisCodeValid] = useState(null);
    const [isPwdValid, setisPwdValid] = useState(null);
    const [disabled, setdisabled] = useState(true);
    const [cursorStated, setcursorStated] = useState(false);
    const [changeOk, setchangeOk] = useState(false)

    const inputUid = (e) => {
        // console.log(e.target.value);
        setUid(e.target.value);
    }

    const inputEmail = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    }


    const processValues = () => {
        if (uid && email) {
            setHaveValue(true);
            setCorrectMem(false);
        } else {
            setHaveValue(false);

        }
    };

    useEffect(() => {
        processValues();
        if (uid && email) {
            (async () => {
                try {
                    const { data } = await axios.post('http://localhost:3001/forgotpwd/', {
                        uid: uid,
                        email: email,
                    });
                    // console.log(data);
                    await setCorrectMem(data.length > 0);
                    setisPwdValid(null);
                    setisCodeValid(null);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [uid, email]);




    const insertVer = async (e) => {
        let VertiCode = Math.floor(Math.random() * 1000000);
        let VertiCode2 = VertiCode.toString().padStart(6, '0')
        // console.log(VertiCode2);
        setCode('');
        setVcode(VertiCode2);
        setisCodeValid(null);

        await axios.post('http://localhost:3001/forgotpwd/Vcode', {
            Vcode: VertiCode2,
            email: email
        })
    }



    const inputCode = (e) => {
        const inputCode = e.target.value;
        if (inputCode !== Vcode) {
            setCode('');
            setisCodeValid(false);
        } else {
            setCode(inputCode)
            setisCodeValid(true)
        }
    };



    const inputPassword = (e) => {
        const password = e.target.value;
        if (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            setPwd(password);
            setisPwdValid(true);
        } else {
            setPwd('');
            setisPwdValid(false);
        }
    }

    const inputPassword2 = (e) => {
        const password2 = e.target.value;
        setPwd2(password2);
    };


    const insertJudgment = () => {
        if (uid && pwd && pwd2 && email && code && Vcode && isPwdValid && isCodeValid && CorrectMem && pwd === pwd2 && code === Vcode) {
            if (disabled) {
                setcursorStated(true);
                setdisabled(false);
            }
        } else {
            if (!disabled) {
                setcursorStated(false);
                setdisabled(true);
            }
        }
    }

    const insertBtn = () => {
        (async () => {
            const { data } = await axios.patch('http://localhost:3001/forgotpwd/', {
                uid: uid,
                email: email,
                newPwd: pwd
            })
            if (data) {
                setchangeOk(true);
                // window.location.href = 'http://localhost:3000/login'


            }
        })();
    }



    return (<React.Fragment>
        <InfoBar />
        <div className={style.forFlex}>
            <div id={style.outerDiv}>
                <div className={style.orderDetail}>忘記密碼</div>
                <hr />

                <div className={style.inputStyle}>
                    <div>
                        <label htmlFor="uid">帳號:</label>
                        <br />
                        <input type="text" id="uid" className={style.inputStyle_Text} onBlur={(e) => { inputUid(e) }} placeholder='請輸入註冊時帳號' />
                        <br />
                        <br />
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input type="email" id="email" className={style.inputStyle_Text} onBlur={(e) => { inputEmail(e) }} placeholder='請輸入註冊時信箱' />
                    </div>
                    <br />

                    {haveValue ? <div id={style.heightDiv}>
                        {CorrectMem ?
                            <div>
                                <label htmlFor="vcode">驗證碼:</label>
                                <br />
                                <input type="text" id="Vcode" className={style.inputStyle_Text} onInput={(e) => { inputCode(e) }} placeholder='請輸入6位阿拉伯數字' />
                                <button className={style.verificationCode} onClick={() => { insertVer() }}>傳送驗證碼</button>
                                {isCodeValid !== null && (
                                    <span style={{ marginLeft: '0px', color: code ? 'green' : 'red' }}>{code ? '驗證碼正確' : '驗證碼錯誤'}</span>
                                )}
                                <br />
                                <br />
                                <label htmlFor="pwd">輸入新密碼:</label>
                                <br />
                                <input type="password" id="password" className={style.inputStyle_Text} onInput={(e) => { inputPassword(e) }} placeholder='輸入含有英文及數字至少8位數的新密碼' />
                                {isPwdValid !== null && (
                                    <span style={{ marginLeft: '0px', color: pwd ? 'green' : 'red' }}>{pwd ? '格式正確' : '格式錯誤'}</span>
                                )}
                                <br />
                                <br />
                                <label htmlFor="pwd2">再次輸入新密碼:</label>
                                <br />
                                <input type="password" id="password2" className={style.inputStyle_Text} onInput={(e) => { inputPassword2(e) }} placeholder='再次輸入新密碼' />
                                <br />
                                {isPwdValid !== null && (<span style={{ marginLeft: '0px', color: pwd2 === pwd && pwd ? 'green' : 'red' }}>{pwd2 === pwd && pwd ? '密碼相同' : '密碼不同'}</span>)}
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                            :
                            <p className={`${shake.shake} ${shake['shake-horizontal']}`} style={{ color: 'red' }}>帳號和Email不相符</p>}


                    </div> : null}
                </div>
                <div style={CorrectMem ? { marginTop: '400px' } : {}}>
                    <button id={style.ok} style={{ cursor: cursorStated ? 'pointer' : 'default', color: disabled ? 'lightgray' : 'black' }} disabled={disabled} onClick={() => { insertBtn() }}>提交</button>
                </div>
            </div>
        </div>
        {insertJudgment()}
        {changeOk ? <IsLoginDialog text='修改密碼成功'/> : ''}
        {/* {console.log(uid, email)} */}
    </React.Fragment >);
}

export default ForgorPwd;