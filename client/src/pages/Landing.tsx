import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pagesStyle/Landing.scss';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const handleGoToMain = () => {
        navigate('/home');
    };

    return (
        <main>
            <h1>Сайт создан студентами<br/>Колледжа цифровых технологий</h1>
            <div className="names">
                <div className="name">
                    <h1>Frontend</h1>
                    <img src="/image/avatar1.svg" alt="avatar"/>
                    <h2>Смирнов Виталий</h2>
                </div>
                <div className="name">
                    <h1>Backend</h1>
                    <img src="/image/avatar2.svg" alt="avatar"/>
                    <h2>Ляпин Даниил</h2>
                </div>
                <div className="name">
                    <h1>Project Manager</h1>
                    <img src="/image/avatar3.svg" alt="avatar"/>
                    <h2>Шелаев Андрей</h2>
                </div>
            </div>
            <button onClick={handleGoToMain}>Перейти на сайт</button>
        </main>
    );
};

export default Landing;