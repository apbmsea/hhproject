import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Login from './pages/Login';
import Resume from './pages/Resume';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './store';
import ResumeForm from './components/resumeForm/ResumeForm';
import ResumePage from './pages/ResumePage';
import ResumeDetails from './components/ResumeDetails';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<ResumePage />} />
                    <Route path="/resumes/:id" element={<ResumeDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/create-resume" element={<ResumeForm />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
