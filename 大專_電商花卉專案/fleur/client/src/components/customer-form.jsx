import React, { useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui';
import InfoBar from '../components/fleurInfoBar';
import '../js/jquery.twzipcode.js';
import '../css/customer.css';

const CustomerForm = () => {
  useEffect(() => {
    $('#twzipcode').twzipcode({
      css: ['addr-county', 'addr-district', 'addr-zip']
    });

    $('#zipcode1').twzipcode({
      zipcodeIntoDistrict: true,
      css: ['city form-control', 'town form-control'],
      countyName: 'city',
      districtName: 'town'
    });

    $('#zipcode2').twzipcode({
      zipcodeIntoDistrict: true,
      css: ['city form-control', 'town form-control'],
      countyName: 'city',
      districtName: 'town'
    });
  }, []);

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

    var data = $('#zipcode1').twzipcode('data1');
    console.log(data);
  };

  return (
    <div>
      <InfoBar/>
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
                <div className="f1" id="county1" data-role="county" />
                <div className="f2" id="district1" data-role="district" />
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
                <label className="checkbox1" htmlFor="checkbox1">同訂購人</label>
              </div>
            </div>
            <p>
              <input type="text" placeholder="請輸入姓名" className="inputName" id="cname2" defaultValue="" />
            </p>
            <p>
              <input type="tel" placeholder="聯繫電話" className="inputTel" id="tel2" defaultValue="" />
            </p>
            <p>
              <div id="zipcode2">
                <div className="f3" id="county2" data-role="county" />
                <div className="f4" id="district2" data-role="district" />
                <input name="Address" type="text" className="f13 address form-control" id="address2" />
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
            <button id="next">完成訂購</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;