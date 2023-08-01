const express = require('express');
const router = express.Router();
const db = require('../mysqlConfig');

router.get('/fleurTalk', (req, res) => {
    db.query(
        "select pName, pImage, meaning from product where soldState = 'on'",
        [],
        (err, result) => err ? res.json(err) : res.json(result)
    );
});

module.exports = router; 