const express = require('express');
const session = require('express-session');
const cors = require('cors');

const homepage = require('./routers/homepage.js');
const products = require('./routers/products.js');
const search = require('./routers/search.js');
const shoppingCart = require('./routers/shoppingCart.js');
const coupon = require('./routers/coupon.js');
const likeList = require('./routers/likeList.js');
const fleurtalk = require('./routers/fleurtalk.js');
const member = require('./routers/member.js');
const orderthings = require('./routers/orderthings.js');
const orderdetail = require('./routers/orderdetail.js');
const history = require('./routers/history.js');
const register = require('./routers/register.js');
const login = require('./routers/login.js');
const forgotpwd = require('./routers/forgotpwd.js');
// const email = require('./routers/email.js');
// const service = require('./routers/service.js');
const backstage = require('./routers/backstage.js');
const cartfororder = require('./routers/cartfororder.js');
const customer = require('./routers/customer.js');
const machine = require('./routers/machine.js');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'ajiafpabshdfuwilfnjhjflujfsdfsj',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000
    }
}))

app.set("view engine", "ejs")

app.use('/public', express.static('public'));

app.use("/", homepage);
app.use("/", login);
app.use("/", forgotpwd);
app.use("/", register);
app.use("/", products);
app.use("/", search);
app.use("/", shoppingCart);
app.use("/", coupon);
app.use("/", likeList);
app.use("/", fleurtalk);
app.use("/", member);
app.use("/", orderthings);
app.use("/", orderdetail);
app.use("/", history);
// app.use("/", email);
// app.use("/", service);
app.use("/", backstage);
app.use("/", cartfororder);
app.use("/", customer);
app.use("/", machine);

app.listen(3001, () => {
    console.log(new Date().toLocaleTimeString());
});
