const express = require('express');
const router = express.Router();
const db = require('../mysqlConfig');

router.patch("/machine", (req, res) => {
    const { couponId, description, useLimit, conponTimeLimit, uid, text, saleSelect } = req.body;
    db.query(
        `insert into allCoupon(couponId, description, useLimit, conponTimeLimit) values(?, ?, ?, ?);
        insert into userCoupon(uid, couponId, state, text, saleSelect) values(?, ?, "未使用", ?, ?);`,
        [
            couponId, description, useLimit, conponTimeLimit,
            uid, couponId, text, saleSelect
        ],
        (err) => !err ? res.end() : res.json(err)
    );
});

module.exports = router;