var express = require('express');
var router = express.Router();
var db = require('../mysqlConfig');

router.get('/products', (req, res) => {
    let where = `where category = "${req.query.category}" and soldState = "on"`;
    let orderBy = "";

    if (req.query.category === "全部") where = `where soldState = "on"`;
    else if (req.query.category === "其他") where = `where category = "" and soldState = "on"`;

    if (req.query.sort === "lowToHigh") orderBy = "order by unitPrice";
    else if (req.query.sort === "highToLow") orderBy = "order by unitPrice desc";

    db.query(
        `select * from product ${where} ${orderBy}`,
        [],
        (err, rows) => res.json(rows)
    );
});

router.get('/products/category', (req, res) => {
    db.query(
        `select distinct(
            case
                when category = ""
                then "其他"
                else category
            end
        ) as category
        from product
        where soldState = 'on'
        order by convert(category using big5)`,
        [],
        (err, rows) => res.json(rows)
    );
});


// product(單一商品)

router.get('/product', (req, res) => {
    db.query(
        `select * from product where pid = ? and soldState = 'on'`,
        [req.query.pid],
        (err, rows) => res.json(rows)
    );
});

router.get('/product/likeList', (req, res) => {
    if (req.query.uid)
        db.query(
            "select count(*) as count from likeList where uid = ? and pid = ?",
            [req.query.uid, req.query.pid],
            (err, rows) => res.json({ inLikeList: rows[0].count ? true : false })
        )
});

router.post('/product/likeList', (req, res) => {
    if (req.body.uid)
        db.query(
            "insert into likeList(uid, pid) values(?, ?)",
            [req.body.uid, req.body.pid],
            err => { if (err) console.log(err) }
        )
});

router.delete('/product/likeList', (req, res) => {
    if (req.query.uid)
        db.query(
            "delete from likeList where pid = ? and uid = ?",
            [req.query.pid, req.query.uid],
            err => { if (err) console.log(err) }
        )
});

router.get('/product/shoppingCart', (req, res) => {
    if (req.query.uid)
        db.query(
            "select count(*) as count from shoppingCart where uid = ? and pid = ?",
            [req.query.uid, req.query.pid],
            (err, rows) => res.json({ inCart: rows[0].count ? true : false })
        )
});

router.post('/product/shoppingCart', (req, res) => {
    if (req.body.uid)
        db.query(
            "insert into shoppingCart(uid, pid, quantity, pState) values(?, ?, ?, ?) on duplicate key update quantity = ?",
            [req.body.uid, req.body.pid, req.body.quantity, "inCart", req.body.quantity],
            (err, result) => !err ? res.json(result) : res.json(err)
        )
});

// router.patch('/product/shoppingCart', (req, res) => {
//     if (req.body.uid)
//         db.query(
//             "update shoppingCart set quantity = ? where uid = ? and pid = ?",
//             [req.body.quantity, req.body.uid, req.body.pid],
//             err => { if (err) console.log(err) }
//         )
// });

module.exports = router;