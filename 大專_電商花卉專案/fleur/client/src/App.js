import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import function名稱或class名稱 from './pages/頁面檔名';
import Test from './components/test';
import ScrollToTop from './components/scrollToTop';
// import MouseCursor from './components/mouseCursor';
import Homepage from './pages/homepage';
import Member from './pages/member';
import History from './pages/history';
import Products from './pages/products';
import ProductInner from './pages/productInner';
import Orderthings from './pages/orderthings';
import Register from './pages/register';
import Login from './pages/login';
import Coupon from './pages/coupon';
import Discountnews from './pages/discountnews';
import Aboutus from './pages/aboutus';
import Search from './pages/search';
import Orderdetail from './pages/orderdetails';
import FleurTalk from './pages/fleurTalk';
import ForgotPwd from './pages/forgotPwd';
import LikeList from './pages/likeList';
import Cartlist from './pages/cartlist';
import Abc from './components/nina'
import Baglogin from './components/baglogin';
import CustomerForm from './pages/customer-form';
import Customer from './pages/customer_form';
import Nina from './pages/ninamachine';


const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            {/* <MouseCursor /> */}
            <Routes>
                {/* <Route path="路由" element={<function名稱或class名稱 />} /> */}
                {/* 如果頁面路由需要百分之百吻合的就加上exact屬性
                    路由需要帶變數的就不能加上exact */}
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Homepage />} exact />
                <Route path="/member" element={<Member />} />
                <Route path="/history" element={<History />} />
                <Route path="/orderdetail/:orderNo" element={<Orderdetail />} />
                <Route path="/coupon" element={<Coupon />} />
                <Route path="/discountnews" element={<Discountnews />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/products/:page" element={<Products />} />
                <Route path="/product/:pid" element={<ProductInner />} />
                <Route path="/orderthings" element={<Orderthings />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPwd" element={<ForgotPwd />} />
                <Route path="/search" element={<Search />} />
                <Route path="/fleurTalk" element={<FleurTalk />} />
                <Route path="/likeList" element={<LikeList />} />
                <Route path="/cartlist" element={<Cartlist />} />
                <Route path="/nina" element={<Abc />} />
                <Route path="/customerform" element={<CustomerForm />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/baglogin" element={<Baglogin />} />
                <Route path="/customer-form" element={<CustomerForm />} />
                <Route path="/ninamachine" element={<Nina />} />
            </Routes>
        </BrowserRouter >
    );
};

export default App;