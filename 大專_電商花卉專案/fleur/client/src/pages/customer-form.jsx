import React, { useEffect, useRef, useState } from 'react';
import { Component } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import InfoBar from '../components/fleurInfoBar';
import '../css/customer.css';

class CustomerForm extends Component {
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
  }

  render() {
    const handleInputUserData = () => {
      const userCounty = document.getElementById('county1').value;
      const userDistrict = document.getElementById('district1').value;
      const cname = document.getElementById('cname1').value;
      const telOfUser = document.getElementById('tel1').value;
      const address = document.getElementById('address1').value;
      const address2 = document.getElementById('address3').value;

      document.getElementById('cname2').value = cname;
      document.getElementById('tel2').value = telOfUser;
      document.getElementById('address2').value = address;
      document.getElementById('address4').value = address2;
      document.getElementById('county2').value = userCounty;
      document.getElementById('district2').value = userDistrict;

      // var data = $('#zipcode1').twzipcode('data1');
      // console.log(data);
    };
    return (
      <div>
        <InfoBar />
        <div id="forFlexDiv">
          <div id="container">
            <div id="customerTry">
              <p className="customer">訂購人資訊</p>
              <p>
                <input type="text" placeholder="請輸入姓名" className="inputName" id="cname1" defaultValue="" />
              </p>
              <p>
                <input type="tel" placeholder="聯繫電話" className="inputTel" id="tel1" defaultValue="" />
              </p>
              <p>
                <div id="zipcode1">
                  {/* <div className="f1" id="county1" data-role="county" />
                  <div className="f2" id="district1" data-role="district" /> */}
                  <input name="Address" type="text" className="f1" id="county1" />
                  <input name="Address" type="text" className="f2" id="district1" />

                  <input name="Address" type="text" className="f13 address form-control" id="address1" />
                </div>
                <input
                  name="Address"
                  type="text"
                  className="f13 address form-control"
                  id="address3"
                  placeholder="請輸入詳細地址"
                />
              </p>
            </div>

            <div>
              <div id="theSame">
                <p className="customer--address">收件人資訊</p>
                <div>
                  <input type="checkbox" id="checkbox1" onClick={handleInputUserData} />
                  <label className="checkbox1" htmlFor="checkbox1"> 同訂購人</label>
                </div>
              </div>
              <p>
                <input type="text" onInput={(e) => { this.inputCustomerName(e) }} placeholder="請輸入姓名" className="inputName" id="cname2" defaultValue="" />
              </p>
              <p>
                <input type="tel" placeholder="聯繫電話" className="inputTel" id="tel2" defaultValue="" />
              </p>
              <p>
                <div id="zipcode2">
                  {/* <div className="f3" id="county2" data-role="county" />
                  <div className="f4" id="district2" data-role="district" /> */}
                  <input name="Address" onInput={(e) => { this.inputCustomerCity(e) }} placeholder="縣市" type="text" className="f3" id="county2" />
                  <input name="Address" onInput={(e) => { this.inputCustomerCounty(e) }} placeholder="鄉鎮市區" type="text" className="f4" id="district2" />
                  <input name="Address" onInput={(e) => { this.inputCustomerStreet(e) }} placeholder="地址" type="text" className="f13 address form-control" id="address2" />
                </div>
                <input
                  name="Address"
                  type="text"
                  className="f13 address form-control"
                  id="address4"
                  placeholder="請輸入詳細地址"
                />
              </p>
            </div>

            <div className="btnSet">
              <button id="back">上一步</button>
              <button id="next" onClick={() => { this.insertBtn() }}>完成訂購</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  inputCustomerName = (e) => {
    this.setState({
      CustomerName: e.target.value
    })
  }
  inputCustomerCity = (e) => {
    this.setState({
      CustomerCity: e.target.value
    })
  }
  inputCustomerCounty = (e) => {
    this.setState({
      CustomerCounty: e.target.value
    })
  }
  inputCustomerStreet = (e) => {
    this.setState({
      CustomerStreet: e.target.value
    })
  }
}
const complete = () => {
  const apiUrl = 'http://example.com/api/orders';
  const dataToSend = {
    OrderProduct: sessionStorage.getItem('OrderProduct'),
    OrderOwner: sessionStorage.getItem('OrderOwner'),
    time: sessionStorage.getItem('OrderDate'),
    OrderNo: sessionStorage.getItem('OrderNo'),
    OrderPay: sessionStorage.getItem('OrderPay'),
    OrderSent: sessionStorage.getItem('OrderSent'),
    OrderAddress: sessionStorage.getItem('OrderAddress'),
    OrderAmount: sessionStorage.getItem('OrderAmount'),
    couponState: sessionStorage.getItem('couponState'),
    couponText: sessionStorage.getItem('couponText')

  };

  // 發送 POST 請求至後端 API
  axios.post(apiUrl, dataToSend)
    .then((response) => {
      console.log('Data sent to the server successfully:', response.data);
      // 在這裡處理伺服器回傳的回應，如果有需要的話
    })
    .catch((error) => {
      console.error('Error sending data to the server:', error);
    });
}
const CustomerData = () => {
  const dataToWrite = sessionStorage.getItem('yourDataKey');

  // 資料庫 POST 請求函式
  const writeToDatabase = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/customerform/', data);
      console.log('Data successfully written to the database:', response.data);
    } catch (error) {
      console.error('Error writing data to the database:', error);
    }
  };

  // 當組件掛載後，進行資料庫寫入
  useEffect(() => {
    if (dataToWrite) {
      writeToDatabase(dataToWrite);
    }
  }, [dataToWrite]);



  const insertBtn = async () => {
    const { uid, pwd, phone, email, userCity, userName, userCounty, userStreet, CustomerName, CustomerCity, CustomerCounty, CustomerStreet } = this.state;

    let sql = await axios.post('http://localhost:3001/customerform', {
      uid: uid,
      pwd: pwd,
      phone: phone,
      email: email,
      userName: userName,
      userCity: userCity,
      userCounty: userCounty,
      userStreet: userStreet,
      CustomerName: CustomerName,
      CustomerCity: CustomerCity,
      CustomerCounty: CustomerCounty,
      CustomerStreet: CustomerStreet
    })

    if (sql.data) {
      setTimeout(() => { window.location.href = "http://localhost:3000"; }, 600)

    }
  }

};

export default CustomerForm;
