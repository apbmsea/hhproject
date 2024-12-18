// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/componentsStyle/Header.scss';
//
// const Header: React.FC = () => {
//
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Авторизация
//     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Состояние бургер-меню
//     const navigate = useNavigate();
//
//     const handleLogin = () => {
//         navigate('/login');
//     }
//
//     const handleLogout = () => {
//         setIsAuthenticated(false); // Убираем авторизацию (прототип)
//         setIsMenuOpen(false); // Закрываем меню
//         navigate('/');
//     }
//
//     const handleResume = () => {
//         navigate('/create-resume');
//     }
//
//     return (
//         <header>
//             <nav className="header-navbar">
//                 <div className="header-logo" onClick={() => navigate('/')}>
//                     <img src="/image/logostatic.svg" alt="avatar"/>
//                 </div>
//                 <div className="header-links">
//                     <div className="header-link">Работодателям</div>
//                     <div className="header-link">Соискателям</div>
//                 </div>
//             </nav>
//             <div className="header-menu">
//                 {!isAuthenticated ? (
//                     <button className="header-login-button" onClick={handleLogin}>
//                         Войти
//                     </button>
//                 ) : (
//                     <div className="header-profile">
//                         <div onClick={() => setIsMenuOpen((prev) => !prev)} className="header-profile-info">
//                             <span>i23s0045</span>
//                             <img src="/image/avatar1.svg" alt="Профиль" className="header-profile-img"/>
//                         </div>
//                         {isMenuOpen && (
//                             <div className="header-drop-down-menu">
//                                 <button onClick={handleResume} className="header-item">
//                                     Мое резюме
//                                 </button>
//                                 <button onClick={handleLogout} className="header-item header-logout-text">
//                                     Выйти
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </header>
//     )
// }
//
// export default Header;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/componentsStyle/Header.scss'

const Header: React.FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsMenuOpen(false);
        navigate('/');
    }

    return (
        <header className="header">
            <div className="header__container">
                <a className="header__container-link-logo" onClick={() => { navigate('/')}}>
                    <img className="header__container-link-logo-image" src="/image/logostatic.svg" alt="КЦТ"/>
                </a>
                <a className="header__container-link-search" onClick={() => { navigate('/resume-page')}}>
                    Поиск
                </a>
                <div className="header__container-buttons">
                    <button className="header__container-button" onClick={() => { navigate('/create-resume')}}>Создать резюме</button>
                    {!isAuthenticated ? (
                        <button className="header__container-button" onClick={() => { navigate('/login')}}>Войти</button>
                    ) : (
                        <div className="header__container-buttons-account">
                            <img className="header__container-buttons-account-image"
                                 src="/image/account.svg"
                                 alt="Account" onClick={() => setIsMenuOpen((prev) => !prev)}/>
                            {isMenuOpen && (
                                <div className="header__container-buttons-account-dropdown-menu">
                                    <h5 className="header-item">i23s0045</h5>
                                    <button onClick={() => { navigate('/my-resume')}} className="header-item">
                                        Мое резюме
                                    </button>
                                    <button onClick={handleLogout} className="header-item header-logout-text">
                                        Выйти
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header