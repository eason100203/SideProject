var express = require('express');
var router = express.Router();
var conn = require("../mysqlConfig");

router.get("/coupon/usercoupon/:uid", function (req, res) {
    conn.query("SELECT * FROM `usercoupon` WHERE uid=?", [req.params.uid],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

router.get("/coupon/statecoupon/:uid/:curState", function (req, res) {
    let state = ""
    if (req.params.curState === '0') state = "未使用"
    else if (req.params.curState === '1') state = "已使用"
    else if (req.params.curState === '2') state = "可使用"
    else if (req.params.curState === '3') state = "無效"

    conn.query("SELECT couponId FROM `usercoupon` WHERE uid=? AND state=?", [req.params.uid, state],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

router.get("/coupon/allcoupon/:cid", function (req, res) {
    conn.query("SELECT * FROM `allcoupon` WHERE couponId=?", [req.params.cid],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

module.exports = router; 
