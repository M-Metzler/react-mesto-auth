import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
    return (
        <header className="header header_box_position">
            <img className="header__logo" src={headerLogo} alt="логотип место Россия" />
        </header>
    );
}

export default Header;