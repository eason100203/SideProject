import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/nav';
import axios from 'axios';
import { Row, Col } from 'antd';
import "../css/discountnews.css"
import bg from "../img/flower-removebg.png"
import alocasia from "../img/alocasia.jpg"
import lavender from "../img/lavender.jpg"
import tulip from "../img/tulip.jpg"
import Footer from '../components/footer';
import {
    RightCircleTwoTone,
    LeftCircleTwoTone,
    GiftTwoTone
} from '@ant-design/icons';

class Discountnews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_collapse: [false, false, false],
            active: [true, false, false],
        }
    }

    moreBeforePress(x) {
        return (<div className="cword">
            <p>2023-0{7 - x}-01</p>
            <p style={{ marginLeft: "auto", cursor: "pointer", color: "#c49b67" }} onClick={() => { this.moreHandler(x) }}>
                MORE <RightCircleTwoTone twoToneColor="#c49b67" />
            </p>
        </div>
        )
    }

    moreAfterPress(x) {
        return (<div className="cword2">
            <p>2023-0{7 - x}-01</p>
            <p style={{ marginLeft: "auto", cursor: "pointer", color: "#c49b67" }} onClick={() => { this.lessHandler(x) }}>
                <LeftCircleTwoTone twoToneColor="#c49b67" /> LESS
            </p>
        </div>
        )
    }

    alocasiaMoreNews() {
        return (<div>
            <br />
            <p>&emsp;&emsp;7月的炎夏，花園中盛開的海芋如彩虹般繽紛。</p>
            <br />
            <p>&emsp;&emsp;夏日海芋以其獨特的花形和鮮豔的顏色，如粉紅、紅色、白色等，點綴著每一個角落，為炎炎夏日增添一絲涼意。</p>
            <br />
            <p>&emsp;&emsp;美麗的海芋既能為您的室內空間帶來自然的魅力，也適合作為畢業花選，寄與畢業生熱情、謙遜、美麗的無盡祝福。</p>
            <br />
            <p>&emsp;&emsp;7月的花卉中，海芋是最受歡迎的之一，它們的盛開猶如夏季的風情，讓人心馳神往。</p>
            <br />
            <p>&emsp;&emsp;讓海芋陪伴您度過一個充滿花香和生命力的夏天。{<Link to="/product/000067">立即選購 <GiftTwoTone /></Link>}</p>
            <br />
        </div>
        )
    }

    alocasiaLessNews() {
        return (<div style={{ position: "absolute", top: "2rem" }}>
            <br />
            <p>&emsp;&emsp;7月的炎夏，花園中盛開的海芋...</p>
        </div>
        )
    }

    lavenderMoreNews() {
        return (<div>
            <br />
            <p>&emsp;&emsp;六月的薰衣草花季即將來臨，讓我們一同進入夢幻的紫色世界吧！</p>
            <br />
            <p>&emsp;&emsp;薰衣草，迷人的芳香和絲絨般的紫色花朵，猶如一個浪漫的夢境。</p>
            <br />
            <p>&emsp;&emsp;這是一個讓人心醉神迷的季節，薰衣草的清新幽香向我們述說著大自然的詩意和美麗。</p>
            <br />
            <p>&emsp;&emsp;在微醺六月裡，薰衣草帶給我們一片清涼和寧靜，彷彿置身於童話世界。</p>
            <br />
            <p>&emsp;&emsp;走進薰衣草的世界，讓那令人陶醉的芳香和紫色花朵點綴你的寢間，為你增添一份夢幻與浪漫。{<Link to="/product/000004">立即選購 <GiftTwoTone /></Link>}</p>
            <br />
        </div>
        )
    }

    lavenderLessNews() {
        return (<div style={{ position: "absolute", top: "2rem" }}>
            <br />
            <p>&emsp;&emsp;六月的薰衣草花季即將來臨，讓我們...</p>
        </div>
        )
    }

    tulipMoreNews() {
        return (<div>
            <br />
            <p>&emsp;&emsp;盛開的五月花季，如同母親的溫柔笑容般綻放。在這個季節，我們感受到母親的愛與奉獻，照亮我們的人生道路。</p>
            <br />
            <p>&emsp;&emsp;五月是屬於母親的，是她們的節日，讓我們一起用鮮花傳遞心意，感謝她們的無私奉獻與無盡關懷。</p>
            <br />
            <p>&emsp;&emsp;在這花季，讓我們用最美的花束與鬱金香的芬芳，向母親們說聲：「謝謝您，是您讓我們的生命如此綻放！」</p>
            <br />
            <p>&emsp;&emsp;用花語傳達感恩，讓我們用精心挑選的花卉，傳遞愛與感激。{<Link to="/product/000010">立即選購 <GiftTwoTone /></Link>}</p>
            <br />
        </div>
        )
    }

    tulipLessNews() {
        return (<div style={{ position: "absolute", top: "2rem" }}>
            <br />
            <p>&emsp;&emsp;盛開的五月花季，如同母親的溫柔...</p>
        </div>
        )
    }

    render() {

        return (
            <div>
                <Nav />
                <div id="dtop">
                    <div style={{ margin: "0 auto 0", width: "50%" }}>
                        <div id="dcontainer">
                            <div id="dtitle">
                                <p>優惠小報 _ <a style={{ color: "#c49b67" }}>推你需要知道的優惠情報</a></p>
                            </div>
                            <div id="dword">
                                <p className="Tml16">「專屬花卉情報，即刻解鎖！」
                                    豐富的花卉資訊和獨家優惠！當季花卉最新資訊、品種、團購優惠等等，都在您手中一覽無遺。</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: "0 auto 0", width: "50%" }}>
                        <div id="dcontainer2">
                            <p style={{ textAlign: "right" }}><img src={bg} style={document.body.offsetWidth > 1080 ? { height: "560px" } : { height: "504px" }} /></p>
                        </div>
                    </div>
                </div>

                <Row style={{ minWidth: "990px" }}>
                    <Col span={2}></Col>
                    <Col span={6}>
                        <img src={alocasia} style={{ width: "100%" }} />
                    </Col>
                    <Col span={14}>
                        <div className='newscontent'>

                            <p style={{ fontSize: "2rem" }}>盛夏畢業季-海芋的熱情與祝福 </p>

                            {this.state.is_collapse[0] && this.state.active[0] ? this.alocasiaMoreNews() : this.alocasiaLessNews()}

                            {this.state.is_collapse[0] ? this.moreAfterPress(0) : this.moreBeforePress(0)}

                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row style={{ minWidth: "990px" }}>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <hr style={{ width: "100%", margin: "3rem auto 3rem", border: "1px solid #f0eded" }} />
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row style={{ minWidth: "990px" }}>
                    <Col span={2}></Col>
                    <Col span={6}>
                        <img src={lavender} style={{ width: "100%" }} />
                    </Col>
                    <Col span={14}>
                        <div className='newscontent'>

                            <p style={{ fontSize: "2rem" }}>紫色夢幻祭-薰衣草的泡泡戀曲 </p>

                            {this.state.is_collapse[1] && this.state.active[1] ? this.lavenderMoreNews() : this.lavenderLessNews()}

                            {this.state.is_collapse[1] ? this.moreAfterPress(1) : this.moreBeforePress(1)}

                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row style={{ minWidth: "990px" }}>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <hr style={{ width: "100%", margin: "3rem auto 3rem", border: "1px solid #f0eded" }} />
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row style={{ minWidth: "990px" }}>
                    <Col span={2}></Col>
                    <Col span={6}>
                        <img src={tulip} style={{ width: "100%" }} />
                    </Col>
                    <Col span={14}>
                        <div className='newscontent'>

                            <p style={{ fontSize: "2rem" }}>濃情母親節-鬱金香與崇敬的愛 </p>

                            {this.state.is_collapse[2] && this.state.active[2] ? this.tulipMoreNews() : this.tulipLessNews()}

                            {this.state.is_collapse[2] ? this.moreAfterPress(2) : this.moreBeforePress(2)}

                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <br />
                <br />
                <br />
                <Footer />
            </div>

        )

    }

    moreHandler = (x) => {
        let status = [false, false, false]
        status[x] = true
        this.setState({
            is_collapse: status,
            active: status,
        })
    }

    lessHandler = (x) => {
        let status = [false, false, false]
        this.setState({ is_collapse: status })
    }

}

export default Discountnews;