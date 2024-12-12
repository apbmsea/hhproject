import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Landing from './pages/Landing';
//import Home from './pages/Home'; // Это пример страницы, которая будет главной
import './styles/index.scss';
import Login from "./pages/Login.tsx";
import Resume from "./pages/Resume.tsx";
import Header from "./components/Header";
import { Provider } from 'react-redux';
import store from './store';
import ResumeForm from "./components/resumeForm/ResumeForm.tsx";
import ResumePage from "./pages/ResumePage.tsx";
import ResumeDetails from "./components/ResumeDetails.tsx";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<ResumePage />} />
                    <Route path="/resume/:id" element={<ResumeDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/create-resume" element={<ResumeForm />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;