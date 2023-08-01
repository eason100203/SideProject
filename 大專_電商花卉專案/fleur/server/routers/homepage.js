var express = require('express');
var router = express.Router();
var db = require('../mysqlConfig');

router.get('/homepage/feeling', (req, res) => {
    db.query(
        "select pName, pImage, meaning, pid from product where key1 = ? or key2 = ? or key3 = ?",
        [req.query.key, req.query.key, req.query.key],
        (err, result) => !err ? res.json(result) : res.json(err)
    );
});

router.get('/homepage/season', (req, res) => {
    const amountPerPage = 8;
    if (req.query.page)
        db.query(
            `select pid, pName, pImage from product where soldState = 'on' limit ${(req.query.page - 1) * amountPerPage}, ${amountPerPage}`,
            [req.query.page],
            (err, result) => !err ? res.json(result) : res.json(err)
        )
    else
        db.query(
            "select count(*) as count from product where soldState = 'on'",
            [],
            (err, result) => !err ? res.json(result) : res.json(err)
        )
});

module.exports = router; 