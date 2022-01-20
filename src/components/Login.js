import React from "react";


function Login() {

    return (
        <div className="start-page">
            <h2 className="start-page__title">Вход</h2>
            <form className="start-page__form">
                <input type="email" className="start-page__input" placeholder="email" />
                <input type="password" className="start-page__input" placeholder="password" />
                <button className="start-page__button" type="submit">Войти</button>
            </form>
        </div>

    );
}

export default Login;