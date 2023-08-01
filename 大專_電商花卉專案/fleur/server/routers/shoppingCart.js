var express = require('express');
var router = express.Router();
var cartdb = require("../mysqlConfig");


// // 處理用戶登錄的api
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   // 根據資料庫檢查是否登入正確
//   if (username === '' && password === '') {
//     // 登入正確，以session來維護登錄狀態
//     req.session.isLoggedIn = true;
//     req.session.username = username;
//     res.json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });


// 用戶使否登入的api
// router.get('/checkLogin', (req, res) => {
//   const isLoggedIn = req.session.isLoggedIn || false;
//   const username = req.session.username || null;
//   res.json({ isLoggedIn, username });
// });



router.get('/shoppingCart', (req, res) => {
  cartdb.query("select * from shoppingcart", [], (err, rows) => res.json(rows))
});


router.post('/shoppingCart', (req, res) => {

  const { pid, quantity } = req.body;

  cartdb.query(
    "UPDATE shoppingcart SET quantity = ? WHERE pid = ?",
    [quantity, pid],
    (err, result) => {
      if (err) {
        console.error("更新資料庫的數量時出錯:", err);
        res.status(500).json({ error: "Error 更新資料庫中的數量時出錯" });
      } else {
        res.json({ success: true, message: "資料庫已更新" });
      }
    }
  );
});


router.post('/updatePState', (req, res) => {
  const { selectedItems } = req.body;

  cartdb.query(
    "UPDATE shoppingcart SET pstate = 'bought' WHERE pid IN (?)",
    [selectedItems],
    (err, result) => {
      if (err) {
        console.error("更新數據庫中的 PState 時出錯:", err);
        res.status(500).json({ error: "更新數據庫中的 PState 時出錯" });
      } else {
        res.json({ success: true, message: "PState 已更新" });
      }
    }
  );
});




router.delete('/deleteCartItem/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  cartdb.query(
    "DELETE FROM shoppingcart WHERE pid = ?",
    [itemId],
    (err, result) => {
      if (err) {
        console.error('Error deleting item:', err);
        res.sendStatus(500);
      } else {
        console.log('Item deleted:', result);
        res.sendStatus(200);
      }
    }
    );
  });





  router.get('/productCountInCart/:uid', (req, res) => {
    const pstate = 'inCart';
    // const uid = req.params.uid;
  
    cartdb.query(
      "SELECT COUNT(*) AS productCount FROM shoppingcart WHERE uid=? AND pstate = ?",
      [req.params.uid,pstate],
      (err, result) => {
        if (err) {
          console.error('Error fetching product count:', err);
          return res.status(500).json({ error: 'Error fetching product count' });
        } else {
          const productCount = result[0].productCount;
          return res.json({ productCount });
        }
      }
    );
  });
  


module.exports = router; 
