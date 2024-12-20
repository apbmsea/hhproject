import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Resume from './pages/Resume';
import Header from './components/Header';
import './styles/index.scss'
import { Provider } from 'react-redux';
import store from './store';
import ResumeForm from './components/resumeForm/ResumeForm';
import ResumePage from './pages/ResumePage';
import ResumeDetails from './components/ResumeDetails';
import EditResume from './components/EditResume';
import Landing from "./pages/Landing.tsx";
import Home from './pages/Home';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/resume-page" element={<ResumePage />} />
                    <Route path="/resume/:id" element={<ResumeDetails />} />
                    <Route path="/resume/edit/:id" element={<EditResume />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/create-resume" element={<ResumeForm />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
