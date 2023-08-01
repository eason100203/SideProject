var express = require('express');
var router = express.Router();
var conn = require("../mysqlConfig")
var session = require('express-session');
var bcrypt = require('bcrypt');

// router.use(session({
//     secret:"test",
//     resave:true,
//     saveUninitialized:true,
//     cookie:{
//         path:"/member",
//         httpOnly:true,
//         secure:false,
//         maxAge:120*1000
//     }
// }))

router.get("/member/list", function (req, res) {
    conn.query("select * from userinfo", [],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

router.get("/member/select/:uid", function (req, res) {
    conn.query("SELECT * FROM `userinfo` WHERE uid=?", [req.params.uid],
        function (err, rows) {
            res.send(JSON.stringify(rows));
        }
    )
})

const objRemoveEmpty = (obj) => {
    return Object.entries(obj).filter(([, v]) => v != null && v !== "")
        .reduce((accumulator, [k, v]) => ({ ...accumulator, [k]: v }), {});
};

router.put("/member/put", function (req, res) {
    const { userName, userEmail, userPhone, userCity, userCounty, userStreet, userAddress, uid } = req.body;

    const temp = objRemoveEmpty({ userName, userEmail, userPhone, userCity, userCounty, userStreet, userAddress });
    const updateItem = Object.keys(temp).map(v => v + ' = ?').join(', ');
    const updateData = Object.values(temp);
    updateData.push(uid);

    conn.query(
        `update userinfo set ${updateItem} where uid= ?`,
        updateData,
        function (err, rows) {
            err ? res.json(err) : res.end();
        }
    );
});

router.put("/member/put/password", async function (req, res) {
    const hash = await bcrypt.hash(req.body.pwd, 10);
    conn.query("update userinfo set pwd=? where uid= ?",
        [hash, req.body.uid],
        function (err, rows) {
            err ? res.json(err) : res.end();
        }
    )
})

module.exports = router;