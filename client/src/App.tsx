import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Landing from './pages/Landing';
import Home from './pages/Home'; // Это пример страницы, которая будет главной
import './styles/index.scss';
import Login from "./pages/Login.tsx";
import Resume from "./pages/Resume.tsx";
import Header from "./components/Header";

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resume" element={<Resume />} />
            </Routes>
        </Router>
    );
};

export default App;