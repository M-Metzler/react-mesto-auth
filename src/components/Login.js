import React from "react";


function Login({ authorization }) {

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
        authorization({ email, password })
    }

    return (
        <div className="start-page">
            <h2 className="start-page__title">Вход</h2>
            <form className="start-page__form" onSubmit={handleSubmit}>
                <input
                    className="start-page__input"
                    type="email"
                    value={valueEmail}
                    onChange={handleChangeEmail}
                    placeholder="Email" />
                <input
                    className="start-page__input"
                    type="password"
                    value={valuePassword}
                    onChange={handleChangePassword}
                    placeholder="Пароль" />
                <button className="start-page__button" type="submit">Войти</button>
            </form>
        </div>

    );
}

export default Login;