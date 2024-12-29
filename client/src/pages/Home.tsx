import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/componentsStyle/Home.scss'

const Home: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="homepage">
            <div className="container">
                <div className="first-block">
                    <h1>StudentHunter</h1>
                    <p>Самые высококлассные студенты <br/>Колледжа Цифровых Технологий </p>
                </div>
                <div className="blocks-info">
                    <div className="block-item">
                        <h1>Искать студентов <br/> для проекта</h1>
                        <img src="../../public/image/search-resumist.png" alt=""/>
                        <button onClick={() => { navigate('/resume-page')}}>Искать</button>
                    </div>
                    <div className="block-item">
                        <h1>Создать резюме</h1>
                        <img src="../../public/image/resume.png" alt=""/>
                        <button onClick={() => { navigate('/create-resume')}}>Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;