import React from "react";
import { Link } from "react-router-dom";

function Register({ registration }) {

    const [valueEmail, setValueEmail] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');

    function handleChangeEmail(e) {
        setValueEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setValuePassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const email = valueEmail;
        const password = valuePassword;
        registration({ email, password })
    }

    return (
        <div className="start-page">
            <h2 className="start-page__title">Регистрация</h2>
            <form className="start-page__form" onSubmit={handleSubmit}>
                <input
                    className="start-page__input"
                    type="Email"
                    value={valueEmail}
                    onChange={handleChangeEmail}
                    placeholder="Email" />
                <input
                    className="start-page__input"
                    type="password"
                    value={valuePassword}
                    onChange={handleChangePassword}
                    placeholder="Пароль" />
                <button className="start-page__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link className="start-page__login" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </div>

    );
}

export default Register;