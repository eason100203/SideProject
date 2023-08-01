import React, { Component } from 'react';
import Nav from '../components/nav';
import "../css/aboutus.css"
import { Carousel, Row, Col } from 'antd';
import bg from "../img/aboutusbg.png"
import logo0 from "../img/logo0.png"
import logo1 from "../img/logo1.png"
import flower_frame from "../img/flower_frame.png"
import Footer from '../components/footer';
import {
    RightCircleTwoTone,
    LeftCircleTwoTone,
} from '@ant-design/icons';

class Aboutus extends Component {
    constructor(props) {
        super(props);
        this.state={
            is_width_too_large: true
        }
        this.slider = React.createRef();
    }

    checkWidth () {
        window.onresize = () => {
            if(document.body.clientWidth > 1350) {
                this.setState({is_width_too_large: true})
            } else {
                this.setState({is_width_too_large: false})
            }
        }
    }

    render() {
        
        return (
            <div>
                <Nav/>
                <div id="atop">
                    <div style={{margin: "0 auto 0", width: "60%"}}>
                        <div id="acontainer">
                            <div id="atitle">
                                <p>Life is a flower,and love is honey of the flower.</p>
                            </div>
                            <hr className="line"/>
                            <div id="aword">
                                <p>每一片花瓣都是綻放的詩篇，</p>
                                <p>每一朵花蕊都是與時光對話的禮讚。</p>
                                <p>以花為載體，賦予生活更多的優雅韻味，</p>
                                <p>讓每一天都是一場美的盛宴。</p>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: "auto", width: "40%"}}>
                        <div id="acontainer2">
                            {this.checkWidth()}
                            <p style={{textAlign: "center", height: "100%"}}><img src = {bg} style={this.state.is_width_too_large ? {height: "480px"} : {width: "100%"}}/></p>
                        </div>
                    </div>
                </div>

                <div id="abottom">
                    <div id="acontainer3">
                        {/* <p style={{textAlign: "center", margin:"5rem"}}><img src={logo} style={{width: "60%"}}/></p>
                        <div id="atitle2">
                            <p>關於我們</p>
                        </div>
                        <div id="aword2">
                            <br/>
                            <p>平臺成立於2016年春天，創立過程充滿艱辛，</p>
                            <p>但本著對花卉產業的熱誠與執著，透過嚴格的</p>
                            <p>審查與優良的賣家合作經過專業的配送，</p>
                            <p>我們願每一位客人，都能挑到最適合的花束！</p>
                            <br/>
                        </div>
                        <div style={{display: "flex"}}>
                            <p style={{marginLeft: "auto", cursor: "pointer", color: "#c49b67"}}>
                                了解更多品牌核心價值<RightCircleTwoTone twoToneColor="#c49b67"/>
                            </p>
                        </div> */}
                        <Carousel ref={ref => {this.slider.current = ref;}}>
                            <div>
                                <p style={{textAlign: "center", margin:"5rem"}}><img src={logo0} style={{width: "60%", display:"block", margin:"auto"}}/></p>
                                <div id="atitle2">
                                    <p>關於我們</p>
                                </div>
                                <div id="aword2">
                                    <br/>
                                    <p>品牌成立於2016年春天，創立過程充滿艱辛，</p>
                                    <p>我們致力於獨特而精緻的設計，豐富人們的日常體驗。</p>
                                    <p>通過不斷追求創新，將現代元素與花卉結合，</p>
                                    <p>打造時尚的花束和擺設，讓每位顧客感受花的魅力!</p>
                                    <br/>
                                </div>
                                <div style={{display: "flex"}}>
                                    <p style={{marginLeft: "auto", cursor: "pointer", color: "#c49b67", fontSize: "1.5rem"}} onClick={() => {this.slider.current.goTo(1, false);}}>
                                        了解更多品牌核心價值<RightCircleTwoTone twoToneColor="#c49b67"/>&emsp;
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p style={{textAlign: "center", margin:"5rem 5rem 4rem 5rem"}}><img src={logo1} style={{width: "60%", display:"block", margin:"auto"}}/></p>
                                <Row>
                                    <Col span={8}/>
                                    <Col span={4}>
                                        <div style={{position: "relative"}}>
                                            <span style={{position: "absolute", top: "2.5rem", left: "2.5rem", fontSize: "1.5rem"}}>快速</span><img src={flower_frame} style={{width: "130px"}}/>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div style={{position: "relative"}}>
                                            <span style={{position: "absolute", top: "2.5rem", left: "2.5rem", fontSize: "1.5rem"}}>便利</span><img src={flower_frame} style={{width: "130px"}}/>
                                        </div>
                                    </Col>
                                    <Col span={8}/>
                                </Row>
                                <Row>
                                    <Col span={8}/>
                                    <Col span={4}>
                                        <div style={{position: "relative"}}>
                                            <span style={{position: "absolute", top: "2.5rem", left: "2.5rem", fontSize: "1.5rem"}}>時尚</span><img src={flower_frame} style={{width: "130px"}}/>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div style={{position: "relative"}}>
                                            <span style={{position: "absolute", top: "2.5rem", left: "2.5rem", fontSize: "1.5rem"}}>創新</span><img src={flower_frame} style={{width: "130px"}}/>
                                        </div>
                                    </Col>
                                    <Col span={8}/>
                                </Row>
                                <div style={{display: "flex"}}>
                                    <p style={{marginTop: "1.5rem", cursor: "pointer", color: "#c49b67", fontSize: "1.5rem"}} onClick={() => {this.slider.current.goTo(0, false);}}>
                                        &emsp;<LeftCircleTwoTone twoToneColor="#c49b67"/>品牌識別
                                    </p>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>

                

                <br/>
                <br/>
                <br/>
             <Footer/>
            </div>
        )
    }

}

export default Aboutus;