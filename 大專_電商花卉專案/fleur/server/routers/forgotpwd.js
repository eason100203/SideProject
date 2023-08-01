var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var conn = require("../mysqlConfig");
var transporter = require("../emailConfig");

router.post('/forgotpwd', (req, res) => {
    console.log(req.body);
    conn.query(
        'select uid,userEmail from userinfo where uid=? and userEmail=?', [req.body.uid, req.body.email],
        async (err, rows) => {
            if (!err && rows.length > 0) {
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
});

router.post('/forgotpwd/Vcode', express.urlencoded({ extended: false }), (req, res) => {
    // console.log(req.body);

    var mailOptions = {
        from: 'eason100203@gmail.com',
        to: req.body.email,
        subject: 'Fleur網站更新密碼驗證信',
        html: `<p>您的驗證碼是<span style="color: red;font-weight:bold">${req.body.Vcode}</span></p>
               <p>祝您購物愉快!</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('寄送成功' + info.response);
        }
    });
})

router.patch('/forgotpwd', async (req, res) => {
    console.log(req.body);
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.newPwd, saltRounds)
    conn.query(
        'update userinfo set pwd=? where uid=? and userEmail=?', [hash, req.body.uid, req.body.email],
        async (err, rows) => {
            if (!err) {
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
});





module.exports = router;