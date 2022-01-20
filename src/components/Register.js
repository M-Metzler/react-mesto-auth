import React from "react";
import { Link } from "react-router-dom";

function Register() {

    return (
        <div className="start-page">
            <h2 className="start-page__title">Регистрация</h2>
            <form className="start-page__form">
                <input type="email" className="start-page__input" placeholder="email" />
                <input type="password" className="start-page__input" placeholder="password" />
                <button className="start-page__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link className="start-page__login" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </div>

    );
}

export default Register;