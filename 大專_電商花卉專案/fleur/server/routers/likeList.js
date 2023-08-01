const express = require('express');
const router = express.Router();
const db = require('../mysqlConfig');

router.get('/likeList', (req, res) => {
    db.query(
        "select likeList.pid as pid, pName, pImage, unitPrice from likeList, product where likeList.pid = product.pid and uid = ?",
        [req.query.uid],
        (err, result) => !err ? res.json(result) : res.json(err)
    );
});

router.post('/likeList', (req, res) => {
    const { uid, pid } = req.body;
    db.query(
        "insert into shoppingCart(uid, pid, quantity, pState) values(?, ?, 1, 'inCart') on duplicate key update quantity = 1",
        [uid, pid],
        (err) => err ? res.send(err) : res.end()
    );
});

router.delete('/likeList', (req, res) => {
    db.query(
        "delete from likeList where pid = ?",
        [req.query.pid],
        (err) => err ? res.send(err) : res.end()
    );
});

module.exports = router;