import React, { Component } from 'react';
import InfoBar from '../components/fleurInfoBar';

import axios from 'axios';

class CustomerAddress extends Component {
    state = {

        uid: "test123",
        pid: "",
        productName: "",
        flowerMaterial: "",
        flowerAccessories: "",
        flowerPackage: "",
        imageURL: "",
      } 
    render() { 
        return (
            <div>
                <InfoBar/>
                <div id="forFlexDiv">
                    <div id="container">
                        <div id="customerTry">
                            <p className="customer">訂購人資訊</p>

                            <p>
                            <input type="text" placeholder="請輸入姓名" className="inputName" id="cname1" value="" />
                            </p>
                            <p>
                            <input type="tel" placeholder="聯繫電話" className="inputTel" id="tel1" value="" />
                            </p>
                            <p>
                            <div id="zipcode1">
                                <div className="f1" id="county1" data-role="county"></div>
                                <div className="f2" id="district1" data-role="district"></div>
                                <input name="Address" type="text" className="f13 address form-control" id="address1" />
                            </div>
                            <input name="Address" type="text" className="f13 address form-control" id="address3" placeholder="請輸入詳細地址"  />
                            <script>
                                $("#zipcode1").twzipcode({
                                    "zipcodeIntoDistrict": true,
                                    "css": ["city form-control", "town form-control"],
                                    "countyName": "city", // 指定城市 select name
                                    "districtName": "town" // 指定地區 select name
                                });
                            </script>

                            </p>
                        </div>
                        <div>
                            <div id="theSame">
                                <p className="customer--address">收件人資訊</p>
                                <div>
                                    <input type="checkbox" id="checkbox1" onclick="InputUserData()"  />
                                    <label className="checkbox1" for="checkbox1">同訂購人</label>
                                </div>
                            </div>
                            <p>
                                <input type="text" placeholder="請輸入姓名" className="inputName" id="cname2" value=""  />
                            </p>
                            <p>
                                <input type="tel" placeholder="聯繫電話" className="inputTel" id="tel2" value=""  />
                            </p>

                            <p>

                            <div id="zipcode2">
                                <div className="f3" id="county2" data-role="county">
                                </div>
                                <div className="f4" id="district2" data-role="district">
                                </div>
                                <input name="Address" type="text" className="f13 address form-control" id="address2"  />
                            </div>
                            <input name="Address" type="text" className="f13 address form-control" id="address4" placeholder="請輸入詳細地址" />
                            <script>
                                $("#zipcode2").twzipcode({
                                    "zipcodeIntoDistrict": true,
                                    "css": ["city form-control", "town form-control"],
                                    "countyName": "city", // 指定城市 select name
                                    "districtName": "town" // 指定地區 select name
                                });
                            </script>

                            </p>

                        </div>

                        <div className="btnSet">
                            <button id="back">上一步</button>
                            <button id="next">完成訂購</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CustomerAddress;