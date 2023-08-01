import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';

const Abc = (props) => {
  const [productCount, setProductCount] = useState(0);
  const [error, setError] = useState(null);

  const { cookies } = props;
  const cookieUid = cookies.get('localUid');
  const isLoggedIn = !!cookieUid;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (isLoggedIn) {
      axios
        .get(`http://localhost:3001/productCountInCart/${cookieUid}`)
        .then((response) => {
          setProductCount(response.data.productCount);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching product count:', error);
          setError('Error fetching product count');
        });
    }
  };

  return (
    <div>
      {cookieUid && productCount !== 0 && (  
        <div className="numbercart">
          <div id="number-box" className="cart">
            {error ? (
              <span>{error}</span>
            ) : (
              <span id="productCountSpan">{productCount}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withCookies(Abc);
