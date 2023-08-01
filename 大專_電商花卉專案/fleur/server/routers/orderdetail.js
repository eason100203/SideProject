var express = require('express');
var router = express.Router();
var conn = require("../mysqlConfig")


router.get('/orderdetail/:orderNo', (req, res) => {
    // console.log(req.params.orderNo);
    conn.query('select * from orderdetails where orderNo=?',
        [req.params.orderNo],
        (err, rows) => {
            if (!err) {
                console.log(rows)
                res.send(JSON.stringify(rows));
            } else {
                console.log('傳輸失敗', err);
            }
        })
});


module.exports = router;
