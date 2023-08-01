const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const conn = require("../mysqlConfig");

const router = express.Router();
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/product");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.pName || Date.now()}.${file.mimetype.split('/')[1]}`);
    }
})
const upload = multer({ storage: myStorage });

// 確認是否登入
const loginOrNot = (req, res, next) => {
    req.session.admin ? next()
        : res.redirect('/backstage/login');
};

const checkAcc = (acc, pwd, admin) => {
    const temp = admin.find(item => item.acc === acc && item.pwd === pwd);
    return temp !== undefined;
}

const admin = [
    {
        acc: "hoshino",
        pwd: "0000"
    }, {
        acc: "",
        pwd: ""
    }, {
        acc: "",
        pwd: ""
    }, {
        acc: "",
        pwd: ""
    }, {
        acc: "",
        pwd: ""
    }, {
        acc: "",
        pwd: ""
    }
];

// 管理員登入 ejs
router.get("/backstage/login", (req, res) => {
    res.render("login");
});

// 管理員登入
router.post("/backstage/login", (req, res) => {
    const { acc, pwd } = req.body;
    if (checkAcc(acc, pwd, admin)) {
        req.session.admin = acc;
        res.redirect("/backstage/product");
    } else {
        res.redirect("/backstage/login");
    };
});


// 顯示所有商品 ejs
router.get("/backstage/product", [loginOrNot, (req, res) => {
    const onlyOnShelve = req.query.onlyOnShelve ? "where soldState = 'on'" : "";
    conn.query(
        `select * from product ${onlyOnShelve} order by pid desc`,
        [],
        (err, result) => res.render("backstage", {
            products: result
        })
    );
}]);

// 查最後一筆pid
router.get("/backstage/product/increase", (req, res) => {
    conn.query(
        "select * from product order by pid desc limit 0, 1",
        [],
        (err, result) => !err ? res.json(result) : res.json(err)
    );
});

// 新增
router.put('/backstage/product/increase', upload.any(), (req, res) => {
    const { pName, category, pImage, unitPrice, inventory, meaning, pid } = req.body;
    conn.query(
        "insert into product(pid, pName, pImage, category, unitPrice, inventory, meaning, soldState) values(?, ?, ?, ?, ?, ?, ?, 'on')",
        [pid, pName, pImage, category, parseInt(unitPrice), parseInt(inventory), meaning],
        (err) => err ? res.json(err) : res.json("ok")
    );
});

// 抓要修改的商品的資料
router.get('/backstage/product/modify', (req, res) => {
    conn.query(
        "select * from product where pid = ?",
        [req.query.pid],
        (err, result) => !err ? res.json(result) : res.json(err)
    )
});

// 修改
router.patch('/backstage/product/modify', upload.any(), (req, res) => {
    const { pName, category, pImage, unitPrice, inventory, meaning, pid } = req.body;
    const updateImg = pImage.split('.')[1] !== "undefined" ? ",pImage = ?" : "";
    const updateData = [pName, category, parseInt(unitPrice), parseInt(inventory), meaning, pid];
    if (pImage.split('.')[1] !== "undefined") updateData.splice(5, 0, pImage);
    conn.query(
        `update product set pName = ?, category = ?, unitPrice = ?, inventory = ?, meaning = ? ${updateImg} where pid = ?`,
        updateData,
        (err) => err ? res.json(err) : res.json("ok")
    );
});

// 刪除
router.patch('/backstage/product/delete', (req, res) => {
    conn.query(
        'update product set soldState = "off" where pid = ?',
        [req.body.pid],
        (err) => err ? res.json(err) : res.json("ok")
    );
});

// 重新上架
router.patch('/backstage/product/reshelve', (req, res) => {
    conn.query(
        'update product set soldState = "on" where pid = ?',
        [req.body.pid],
        (err) => err ? res.json(err) : res.json("ok")
    );
});

// 上傳圖片
router.post('/backstage/product/imageUpload', upload.any(), (req, res) => {
    const src = `/${req.files[0].path.replaceAll('\\', '/')}`;
    const imgType = `.${req.files[0].mimetype.split('/')[1]}`;
    res.json({ imgType, src });
})


// 快速建立顧客會員
router.get('/backstage/quickMember', (req, res) => res.render("quickMember"));
router.post('/backstage/quickMember', async (req, res) => {
    const { uid, pwd, userName, userEmail, userPhone, userCity, userCounty, userStreet } = req.body;
    const userAddress = userCity + userCounty + userStreet;
    const hash = await bcrypt.hash(pwd, 10);

    conn.query(
        `insert into userinfo(uid, pwd, userName, userEmail, userPhone, userAddress, userCity, userCounty, userStreet) 
        values(?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update 
        pwd = ?, userName = ?, userEmail = ?, userPhone = ?, userAddress = ?, userCity = ?, userCounty = ?, userStreet = ?`,
        [uid, hash, userName, userEmail, userPhone, userAddress, userCity, userCounty, userStreet,
            hash, userName, userEmail, userPhone, userAddress, userCity, userCounty, userStreet],
        (err) => err ? res.json(err) : res.redirect("/backstage/quickMember")
    )
});

module.exports = router;