var express = require('express');
var router = express.Router();
var conn = require("../mysqlConfig");


router.get("/orderthings/:uid", function (req, res) {
    conn.query("SELECT * FROM `cartfororder` WHERE  uid=?", [req.params.uid],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

router.post("/orderthings/mart", function (req, res) {
    let message= JSON.stringify(req.body)
    res.cookie("message",JSON.stringify(message))
    res.send(`<script>window.close()</script>`);
})    
router.get("/orderthings/coupon/:uid", function (req, res) {
    conn.query("SELECT * FROM `usercoupon` WHERE uid=?", [req.params.uid],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

router.post("/orderthings/backStep/:uid", function (req, res) {
    conn.query(`update shoppingcart set pState="incart" where uid=?`, [req.params.uid],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

router.post("/orderthings/nextStep/:uid", function (req, res) {
    conn.query(`update usercoupon set State="已使用" where uid=? and couponId=?`, [req.params.uid,req.body.targetCoupon],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})


module.exports = router;