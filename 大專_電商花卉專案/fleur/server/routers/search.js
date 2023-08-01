var express = require('express');
var router = express.Router();
const db = require('../mysqlConfig');

router.get('/search', (req, res) => {
    db.query("select * from product where soldState = 'on'",
        [],
        (err, result) => !err ? res.json(result) : res.json(err)
    );
});

module.exports = router;
