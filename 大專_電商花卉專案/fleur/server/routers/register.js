var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var conn = require("../mysqlConfig");
var transporter = require("../emailConfig");

// var mailOptions = {
//     from: 'eason100203@gmail.com',
//     to: 'babg061516@gmail.com',
//     subject: '測試傳送mail',
//     text: '驗證碼是....'
// };

// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('寄送成功' + info.response);
//     }
// })


router.post('/register/Uid', express.urlencoded({ extended: false }), (req, res) => {
    console.log(req.body);
    conn.query('select uid from userinfo where uid = ?', [req.body.seUid], (err, rows) => {
        if (!err) {
            res.send(JSON.stringify(rows));
        } else {
            console.log('傳輸失敗', err);
        }

    })
});



router.post('/register/Vcode', express.urlencoded({ extended: false }), (req, res) => {
    // console.log(req.body);

    var mailOptions = {
        from: 'eason100203@gmail.com',
        to: req.body.email,
        subject: 'Fleur驗證信',
        html: `<p>您的驗證碼是<span style="color: red;font-weight:bold">${req.body.Vcode}</span></p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('寄送成功' + info.response);
        }
    });
})

router.post('/register', express.urlencoded({ extended: false }), async (req, res) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.pwd, saltRounds)
    conn.query('insert into userinfo(uid,pwd,userName,userEmail,userPhone,userAddress,userCity,userCounty,userStreet) values(?,?,?,?,?,?,?,?,?)',
        [req.body.uid, hash, req.body.userName, req.body.email, req.body.phone, req.body.userAddress, req.body.userCity, req.body.userCounty, req.body.userStreet],
        (err, rows) => {
            if (!err) {
                console.log(rows)
                res.send(JSON.stringify(rows));
            } else {
                console.log('傳輸失敗', err);
                res.send();
            }
        })
});


module.exports = router;
