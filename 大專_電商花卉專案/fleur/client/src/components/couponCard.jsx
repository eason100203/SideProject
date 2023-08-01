import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import "../css/coupon.css"

class CouponCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponId: [],
            couponInfo: [],
            isModalOpen: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { couponId: props.couponId, couponInfo: props.couponInfo }
    }

    render() {
        const formatDate = (dateString) => {
            const options = { year: "numeric", month: "long", day: "numeric" }
            return new Date(dateString).toLocaleDateString(undefined, options)
        }

        const showModal = () => {
            this.setState({ isModalOpen: true })
        };

        const handleOk = () => {
            this.setState({ isModalOpen: false })
        };

        return (
            <div className='display'>
                {this.state.couponInfo.map((item, index) =>
                    <div key={index}>
                        <div className='couponItem'>
                            <ul className='couponCardStatus'>
                                <li className='couponCardStatusLi1'>
                                    <div style={{ margin: "auto", fontSize: "3rem", color: "white" }}>
                                        {item.description.indexOf("%") === -1 ? "NT$" : ""} {item.description.indexOf("%") === -1 ? parseInt(item.description) * -1 : item.description}
                                    </div>
                                </li>
                                <li className='couponCardStatusLi2'>
                                    <div style={{ margin: "auto", height: "80%", width: "80%" }}>
                                        <p style={{ fontSize: "2rem" }}>第一次登入優惠</p>
                                        <p style={{ fontSize: "1.5rem", margin: "24px 0 24px 0" }}>結帳滿{item.useLimit}可使用</p>
                                        <p style={{ fontSize: "1.5rem" }}>折扣碼:{item.couponId}</p>
                                        <hr style={{ margin: "12px 0 12px 0" }}></hr>
                                        <p style={{ fontSize: "1.5rem" }}>使用期限:{new Date(item.conponTimeLimit * 1000).toLocaleDateString()}前</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Button className='couponButton' type="primary" block onClick={showModal}>
                            使用辦法
                        </Button>
                        <Modal
                            open={this.state.isModalOpen}
                            onOk={handleOk}
                            onCancel={handleOk}
                            centered
                            footer={[]}>
                            <div style={{ height: "480px", margin: "20px", border: "1px solid black" }}>
                                <div style={{ margin: "5% auto", height: "15%", width: "80%", display: "flex", border: "1px solid black" }}>
                                    <p style={{ fontSize: "2rem", margin: "auto" }}>第一次登入優惠</p>
                                </div>
                                <div style={{ margin: "auto", height: "80%", width: "80%" }}>
                                    <p style={{ fontSize: "1.5rem" }}>使用門檻</p>
                                    <hr style={{ margin: "2px 0 2px 0" }}></hr>
                                    <p style={{ fontSize: "1.2rem", marginBottom: "12px" }}>單筆消費滿折扣後滿{item.useLimit}即可折抵</p>

                                    <p style={{ fontSize: "1.5rem" }}>可用範圍</p>
                                    <hr style={{ margin: "2px 0 2px 0" }}></hr>
                                    <p style={{ fontSize: "1.2rem", marginBottom: "12px" }}>單筆消費滿折扣後滿{item.useLimit}即可折抵</p>

                                    <p style={{ fontSize: "1.5rem" }}>活動說明</p>
                                    <hr style={{ margin: "2px 0 2px 0" }}></hr>
                                    <p style={{ fontSize: "1.2rem", marginBottom: "12px" }}>單筆消費滿折扣後滿{item.useLimit}即可折抵</p>

                                    <p style={{ fontSize: "1.5rem" }}>使用規則</p>
                                    <hr style={{ margin: "2px 0 2px 0" }}></hr>
                                    <p style={{ fontSize: "1.2rem", marginBottom: "12px" }}>單筆消費滿折扣後滿{item.useLimit}即可折抵</p>
                                </div>
                            </div>
                        </Modal>
                    </div>
                )}
            </div>
        )
    }




}

export default CouponCard;