const express = require('express');
const router = express.Router();
const conn = require("../mysqlConfig");

router.get('/customer', (req, res) => {
    conn.query(
        "select userName, userPhone, userCity, userCounty, userStreet from userinfo where uid = ?",
        [req.query.uid],
        (err, result) => !err ? res.json(result) : res.json(err)
    );
});

router.post('/customer', (req, res) => {
    let { uid, orderNo, total, useCoupon, payWay, orderName, orderPhone, orderAddress, products } = req.body;
    products = JSON.parse(products);
    const insertDetails_sql = Array.from({ length: products.length },
        (_, i) => "insert into historydetails(orderNo, pid, quantity, unitPriceWhenBought) values(?, ?, ?, ?);").join(' ');
    const insertDetails_item = products.reduce((acc, prev) => {
        acc.push(orderNo);
        acc.push(prev.pid);
        acc.push(prev.quantity);
        acc.push(prev.price);
        return acc;
    }, []);
    const deleteShoppingCart_sql = Array.from({ length: products.length },
        (_, i) => "delete from shoppingCart where uid = ? and pid = ?;").join(' ');
    const deleteShoppingCart_item = products.reduce((acc, prev) => {
        acc.push(uid);
        acc.push(prev.pid);
        return acc;
    }, []);
    conn.query(
        `insert into history(uid, orderNo, total, useCoupon, payWay, orderName, orderPhone, orderAddress) values(?, ?, ?, ?, ?, ?, ?, ?);
         ${insertDetails_sql}
         ${deleteShoppingCart_sql}`,
        [uid, orderNo, total, useCoupon, payWay, orderName, orderPhone, orderAddress, ...insertDetails_item, ...deleteShoppingCart_item],
        (err) => !err ? res.end() : res.json(err)
    );
});

// router.get('/customerform/', (req, res) => {
//     // console.log(req.params.orderNo);
//     const { uid } = req.params;
//     conn.query('select userName, userPhone, userCity, userCounty, userStreet from userinfo where uid = ?',
//         [req.params.uid],
//         (err, result) => {
//             if (!err) {
//                 console.log(result)
//                 res.send(JSON.stringify(result));
//             } else {
//                 console.log('傳輸失敗', err);
//             }
//         })
// });

module.exports = router;