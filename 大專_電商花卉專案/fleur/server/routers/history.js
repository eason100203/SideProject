var express = require('express');
var router = express.Router();
var conn = require("../mysqlConfig")


router.post('/history', express.urlencoded({ extended: false }), (req, res) => {
    conn.query('select * from history where uid=? and time >= ? and time <= ?',
        [req.body.uid, req.body.dataBaseFormatStart, req.body.dataBaseFormatEnd],
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
