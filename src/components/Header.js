import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ loggedIn, email, onLogout }) {

    const { pathname } = useLocation();
    const text = `${pathname === "/sign-in" ? "Регистрация" : "Войти"}`;
    const linkRoute = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;

    return (
        <header className="header header_box_position">
            <img className="header__logo" src={headerLogo} alt="логотип место Россия" />
            <div className="header__wrap">
                {loggedIn ? (
                    <>
                        <p className="header__email">{email}</p>
                        <Link className="header__logout" to="/sign-in" onClick={onLogout}>Выйти</Link>
                    </>
                ) : (<Link className="header__link" to={linkRoute} >{text}</Link>)}
            </div>
        </header>
    );
}

export default Header;