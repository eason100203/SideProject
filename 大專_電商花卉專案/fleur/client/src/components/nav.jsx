import React, { Component } from 'react';
import { Link } from "react-router-dom";
import style from '../css/nav.module.css';
import Abc from '../components/nina';
import FleurList from '../components/fleurList';
import { withCookies, Cookies } from 'react-cookie';

// const Nav = (props) => {
//     const items = [
//         { txt: "所有花品", link: "/" },
//         { txt: "細說花語", link: "/" },
//         { txt: "最新消息", link: "/" },
//         { txt: "關於我們", link: "/" },
//     ];

//     const { fleurNav,
//         fleurNav__icon, fleurNav__iconImg,
//         fleurNav__mains, fleurNav__main,
//         fleurNav__subs, fleurNav__sub } = style;

//     return (
//         <nav className={fleurNav}>
//             <Link to="#" className={fleurNav__icon}><img className={fleurNav__iconImg} src="http://localhost:3001/public/images/logo.png" alt="" /></Link>
//             <FleurList classes={{ ul: fleurNav__mains, li: fleurNav__main }} items={items} />
//             <div className={fleurNav__subs}>
//                 <Link to=""><img className={fleurNav__sub} src="http://localhost:3001/public/images/search.png" alt="" /></Link>
//                 <Link to=""><img className={fleurNav__sub} src="http://localhost:3001/public/images/member.png" alt="" /></Link>
//                 <Link to=""><img className={fleurNav__sub} src="http://localhost:3001/public/images/shoppingCart.png" alt="" /></Link>
//             </div>
//         </nav>
//     );
// };

// export default Nav;


class Nav extends Component {
    constructor(props) {
        super(props);
        this.resizeListener = null;

    }
    state = {
        item: [
            { txt: "所有花品", link: "/products/category=全部&page=1&sort=default" },
            { txt: "細說花語", link: "/fleurTalk" },
            { txt: "優惠小報", link: "/discountnews" },
            { txt: "關於我們", link: "/aboutus" },
        ],
        uid: false,
        dropDown: false,
        memberIcon: false,
        MenuIcon: false,
    }



    render() {
        const { Member__Dropdown, Member__DropdownOpen, fleurSticky, fleurNav,
            fleurNav__icon, fleurNav__iconImg,
            fleurNav__mains, fleurNav__main,
            fleurNav__subs, fleurNav__sub, logoutBtn, logoutBtn_disabled, Member__DropdownOpenLogin, menuIcon, menu390, menu390open } = style;

        return (
            <div>
                <nav className={fleurSticky}>
                    <div className={fleurNav}>
                        <Link to="/" className={fleurNav__icon}><img className={fleurNav__iconImg} src="http://localhost:3001/public/images/logo.png" alt="" /></Link>
                        <FleurList classes={{ ul: fleurNav__mains, li: fleurNav__main }} items={this.state.item} />
                        <div className={fleurNav__subs}>
                            <Link to="/search"><img className={fleurNav__sub} src="http://localhost:3001/public/images/search.png" alt="" /></Link>
                            <img className={fleurNav__sub} onClick={() => { this.Dropdown() }} src={!this.state.uid ? "http://localhost:3001/public/images/member.png" : "http://localhost:3001/public/images/member2.png"} alt="" />
                            <ul className={this.state.dropDown && !this.state.uid ? Member__DropdownOpen : Member__Dropdown
                                && (this.state.dropDown && this.state.uid ? Member__DropdownOpenLogin : Member__Dropdown)}>
                                <li style={{ display: this.state.uid ? 'none' : 'block' }}><Link to="/login">登入</Link></li>
                                <li style={{ display: this.state.uid ? 'none' : 'block' }}><Link to="/register">註冊</Link></li>
                                <li><Link to="/member">會員中心</Link></li>
                                <li><Link to=""><button onClick={this.delLocalUid} className={!this.state.uid ? logoutBtn_disabled : logoutBtn} disabled={!this.state.uid}>登出</button></Link></li>
                            </ul>

                            <Link style={{position:'relative'}} to="/cartlist">
                                    <img className={fleurNav__sub} src="http://localhost:3001/public/images/shoppingCart.png" alt="" />     
                                    <div  className={style.numberBox}><Abc/></div>
                            </Link>
                            <Link to=""><img className={`${fleurNav__sub} ${menuIcon}`} onClick={() => { this.menuIcon() }} src={this.state.MenuIcon ? "http://localhost:3001/public/images/remove.png" : "http://localhost:3001/public/images/menu.png"} alt="" /></Link>
                        </div>
                    </div>
                </nav>
                <ul className={this.state.MenuIcon ? menu390open : menu390}>
                    <Link to="/products/category=全部&page=1&sort=default"><li>所有花品</li></Link>
                    <Link to="/fleurTalk"><li>細說花語</li></Link>
                    <Link to="/discountnews"><li>優惠小報</li></Link>
                    <Link to="/aboutus"><li>關於我們</li></Link>
                </ul>
            </div>

        );
    }

    componentDidMount = () => {
        this.getCookieUid();
        this.resizeListener = window.addEventListener('resize', this.handleResize);
    }

    Dropdown = () => {
        this.setState({
            dropDown: !this.state.dropDown,
        })
    }

    delLocalUid = () => {
        const { cookies } = this.props;
        cookies.remove('localUid');
        localStorage.removeItem('_grecaptcha');
        this.setState({
            uid: false,
        })
        window.location.reload();
    }


    getCookieUid = () => {
        const { cookies } = this.props;
        const localUid = cookies.get('localUid');
        this.setState({
            uid: localUid
        }, () => {
            // console.log(this.state.uid);
        });
    }

    menuIcon = () => {
        this.setState(prevState => ({
            MenuIcon: !prevState.MenuIcon,
        }));
    }

    handleResize = () => {
        const currentWidth = window.innerWidth;
        if (currentWidth >= 390) {
            this.setState({ MenuIcon: false });
        }
    };

}

export default withCookies(Nav);