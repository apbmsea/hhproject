import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pagesStyle/Header.scss';

const Header: React.FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Авторизация
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Состояние бургер-меню
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        setIsAuthenticated(false); // Убираем авторизацию (прототип)
        setIsMenuOpen(false); // Закрываем меню
        navigate('/');
    }

    const handleResume = () => {
        navigate('/resume');
    }

    return (
        <header>
            <div className="logo" onClick={() => navigate('/')}>
                <h1>Logo</h1>
            </div>
            <div className="menu">
                {!isAuthenticated ? (
                    <button className="login-button" onClick={handleLogin}>
                        Войти
                    </button>
                ) : (
                    <div className="profile">
                        <div onClick={() => setIsMenuOpen((prev) => !prev)} className="profile-info">
                            <img src="/image/avatar1.svg" alt="Профиль" className="profile-img"/>
                            <span>Иван Иванов</span>
                        </div>
                        {isMenuOpen && (
                            <div className="drop-down-menu">
                                <button onClick={handleResume} className="item">
                                    Мое резюме
                                </button>
                                <button onClick={handleLogout} className="item">
                                    Выйти
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;