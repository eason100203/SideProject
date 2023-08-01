import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/cartlist.css';
import InfoBar from '../components/fleurInfoBar';
import { withCookies } from 'react-cookie';
import IsLoginDialog from '../components/isLoginDialog';
// import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
// import Baglogin from '../components/baglogin';


const Cartlist = (props) => {
  const [pName, setPName] = useState("");
  const [pid, setPid] = useState("");
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const { cookies } = props;
  const [cookieUid] = useState(cookies.get('localUid'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();



  //根據 cookieUid 的存在設置 isLoggedIn
  useEffect(() => {
    setIsLoggedIn(cookieUid);
    
    fetchData();
  }, [cookieUid]);


  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);


  const fetchData = () => {
    if (isLoggedIn) {
      axios
        .get(`http://localhost:3001/cartlisthook/${cookieUid}`)
        .then((response) => {
          setData(response.data);
          const filteredData = response.data.filter((item) => item.pstate !== "bought");
          setData(filteredData);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setShowModal(true); // 未登入顯示彈窗
    }
  };

  const closeModal = () => {
    setShowModal(false); //當用戶單擊“關閉”按鈕時關閉模式
  };

  // const handleLogin = () => {
  //   nina('/login'); // 當用戶單擊模式中的“登錄”按鈕時導航到登錄頁面
  // };



  const box = (itemId) => {

    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)

        : [...prevSelectedItems, itemId]
    );
    updateSt(itemId);
  };


  const updateSt = (itemId) => {
    axios
      .put(`http://localhost:3001/updatePState/${itemId}`, { pstate: 'bought' })
      .then((response) => {
        console.log('updateSt:', response.data);

        fetchData();
      })
      .catch((error) => {
        console.error('updateSt Error:', error);
      });
  };



  const next = () => {
    updatePS(selectedItems);
    navigate('/orderthings');
  
  };

  
  const updatePS = (selectedItems) => {

    axios
      .post('http://localhost:3001/updatePState', { selectedItems })
      .then((response) => {
        console.log('updatePS:', response.data);

        // window.location.reload();
        window.location = '/orderthings';
      })
      .catch((error) => {
        console.error('updatePS Error:', error);
      });
  };



  const qChange = (itemId, newQuantity) => {
    setData((prevData) => {

      return prevData.map((item) =>
        item.pid === itemId ? { ...item, quantity: newQuantity } : item
      );
    });


    updateqChange(itemId, newQuantity);
  };


  const updateqChange = (itemId, newQuantity) => {
    const cartData = {
      pid: itemId,
      quantity: newQuantity,
    };


    axios
      .post(`http://localhost:3001/shoppingCart`, cartData)
      .then((response) => {
        console.log('Qupdated:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Qupdated Error:', error);
      });
  };





  // 刪除
  const handleDelete = (itemId) => {
    deleteCartItem(itemId);
  };

  const deleteCartItem = (itemId) => {
    axios
      .delete(`http://localhost:3001/deleteCartItem/${itemId}`)
      .then((response) => {
        console.log('Item deleted:', response.data);

        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };




  return (
    // data.length > 0 && (

    <div>
      {isLoggedIn ? (

        <div>
          <InfoBar />
          {data.map((item) => (

            <div className="products" key={item.pid}>

              <div className="products__image">
                <input className="products__checkbox" type="checkbox" id="checkbox1" onChange={() => box(item.pid)} />
                <label htmlFor="checkbox1"></label>


                <img className="image" src={`http://localhost:3001/public/images/product/${item.pImage}`} alt />


              </div>



              <div className="product__content">
                <ul>
                  <ol className="product__name">{item.pName} </ol>

                  {item.text.split('\n').map((item, index) => <ol className='bc'>{item}</ol>)}


                </ul>
              </div>





              <div className='allll'>

                <div className="right">
                  <div className='xx'>
                    <div className="svg">
                      <button onClick={() => handleDelete(item.pid)} className='xxxxx'>

                        <svg
                          width="15"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.21321 20.599L20.8122 1.00004M1.21321 1L20.8122 20.599"
                            stroke="#4C4844"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>




                <div className="subtotal">
                  <div className="subtotal__quantity">
                    <p>數量 </p>
                    <div className="subtotal__select">


                      <select id='abc'
                        value={item.quantity}
                        onChange={(e) => qChange(item.pid, e.target.value)}
                      >
                        {Array.from({ length: 10 }, (_, index) => index + 1).map(
                          (option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )
                        )}



                      </select>





                    </div>
                  </div>



                  <div className="subtotal__sub">小計  NT.{item.total}</div>


                </div>


              </div>
            </div>

          ))}

          
          <div class="btnSet">

            <button onClick={next} id="next123">下一步</button>
          </div>
            



        </div>

      ) : (

          <IsLoginDialog />
      )}


    </div>
  )
  // );

}


export default withCookies(Cartlist);




