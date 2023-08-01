import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import MemberContainer from '../components/memberContainer';
import styles from '../css/history.module.css';
import { withCookies } from 'react-cookie';
import axios from "axios";

class History extends Component {
    constructor(props) {
        super(props);
        this.selectedDateRef = createRef();
    }
    state = {
        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentHalfYear: Math.floor(new Date().getMonth() / 6),

        uid: '',
        userInfo: [
            { orderNo: '', total: '', BuyDate: '', payWay: '', payState: '' },
        ],
        haha: false
    };




    render() {
        return (<React.Fragment>
            <MemberContainer>
                <div id={styles.historyDateSelect}>
                    <div id={styles.datePick}>
                        <div className={styles.arrow} id={styles.prevarrow} onClick={this.prevArrow}>&#8249;</div>
                        <input type="text" id={styles.selectedDate} ref={this.selectedDateRef} readOnly />
                        <div className={styles.arrow} id={styles.nextarrow} onClick={this.NextArrow}>&#8250;</div>
                    </div>
                </div>

                <hr />

                <div id={styles.runForCircle}>
                    <div style={{ display: this.state.haha ? 'block' : 'none' }} className={styles.dispperDiv}>
                        <p>查無訂單</p>
                        <img src='http://localhost:3001/public/images/logo.png' className={styles.imgSize} alt="" />
                    </div>
                    {this.state.userInfo.map((item, index) =>
                        <div key={index} className={styles.orderInformation}>
                            <div className={styles.orderNumber}>
                                <p>訂單編號:{item.orderNo}</p>
                                <Link to={`/orderdetail/${item.orderNo}`}>
                                    <p className={styles.orderNumber__detail}>訂單詳情</p>
                                </Link>
                            </div>
                            <div id={styles.orderBar}>
                                <div className={styles.orderState}>
                                    <p>日期</p>
                                    <p>狀態</p>
                                    <p>總金額</p>
                                    <p>付款方式</p>
                                </div>
                                <hr className={styles.damnHr} />
                                <div className={`${styles.orderState} ${styles.orderState__secLine}`}>
                                    <p>{item.BuyDate.slice(0, 10)}</p>
                                    <p>付款成功</p>
                                    <p>{item.total}</p>
                                    <p>{item.payWay}</p>
                                </div>
                            </div>
                            <hr className={styles.damnHr} />
                        </div>
                    )}
                </div>
            </MemberContainer>
        </React.Fragment>
        );
    }


    componentDidMount = async () => {
        await this.getcookieUid();
        await this.updateSelectedDate();
    };



    updateSelectedDate = async () => {
        const newState = { ...this.state };
        let startDate = `${newState.currentYear}/${(newState.currentHalfYear * 6 + 1).toString().padStart(2, '0')}`;
        let endDate = `${newState.currentYear}/${((newState.currentHalfYear + 1) * 6).toString().padStart(2, '0')}`;
        if (this.selectedDateRef.current) {
            this.selectedDateRef.current.value = startDate + " - " + endDate;
        };

        const lastDate = (newState.currentHalfYear === 1) ? '31' : '30';
        let dataBaseFormatStart = `${newState.currentYear}-${(newState.currentHalfYear * 6 + 1).toString().padStart(2, '0')}-01 00:00:00`;
        let dataBaseFormatEnd = `${newState.currentYear}-${((newState.currentHalfYear + 1) * 6).toString().padStart(2, '0')}-${lastDate} 23:59:59`;

        // console.log(dataBaseFormatStart);
        // console.log(dataBaseFormatEnd);

        let sql = await axios.post(`http://localhost:3001/history`, {
            uid: newState.uid,
            dataBaseFormatStart: dataBaseFormatStart,
            dataBaseFormatEnd: dataBaseFormatEnd,
        })

        let data = sql.data;
        // console.log(data)


        let userInfo = [];
        for (let i = 0; i < data.length; i++) {
            userInfo.push({
                orderNo: data[i].orderNo,
                total: data[i].total,
                BuyDate: data[i].time,
                payWay: data[i].payWay,
                payState: data[i].payState,
            });
        }
        (userInfo.length > 0) ? this.setState({ userInfo: userInfo, haha: false }) : this.setState({ userInfo: [], haha: true })
    }




    NextArrow = () => {
        this.setState(
            (prevState) => {
                const newState = { ...prevState };
                if (newState.currentHalfYear === 1) {
                    newState.currentYear++;
                    newState.currentHalfYear = 0;
                } else {
                    newState.currentHalfYear = 1;
                }
                return newState;
            },
            () => {
                this.updateSelectedDate();
            }
        );
    };


    prevArrow = () => {
        this.setState(
            (prevState) => {
                const newState = { ...prevState };
                if (newState.currentHalfYear === 0) {
                    newState.currentYear--;
                    newState.currentHalfYear = 1;
                } else {
                    newState.currentHalfYear = 0;
                }
                return newState;
            },
            () => {
                this.updateSelectedDate();
            }
        );
    };

    getcookieUid = () => {
        const { cookies } = this.props;
        const localUid = cookies.get('localUid');
        this.setState({
            uid: localUid
        }, () => {
            // console.log(this.state.uid);
        });

    }
};


export default withCookies(History);