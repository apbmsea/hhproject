import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home'; // Это пример страницы, которая будет главной
import './styles/index.scss'; // Импорт всех стилей

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Презентационная страница */}
                <Route path="/" element={<Landing />} />

                {/* Главная страница */}
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;