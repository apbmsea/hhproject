import React from 'react';

const Login: React.FC = () => {

    return (
        <div className="main">
            <div className="login-container">
                <h1 className="login-h1">Вход в аккаунт</h1>
                <form className="login-form">

                    <div className="login-input-group">
                        <input type="text"
                               className="login-name-input login-input"
                               placeholder="Логин"
                        />
                    </div>

                    <div className="login-input-group">
                        <input type="password"
                               className="login-password-input login-input"
                               placeholder="Пароль"/>
                    </div>
                    <button type="submit" className="login-button">Войти</button>
                </form>
            </div>
        </div>
    )
}
export default Login;